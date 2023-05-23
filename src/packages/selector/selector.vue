<template>
	<wtf-popper ref="popperRef">
		<wtf-popper-trigger>
			<div ref="selectorRef"
			:class="classList"
			:style="styleList"
			@click="onClick">

				<input ref="selectorInputRef"
				v-show="isEditing"
				v-model="keyword"
				:placeholder="(optionList.find(item => item.checked) || { label: undefined }).label"
				:id="props.id"
				class="wtf-selector-input"
				:form="props.form"
				:name="props.name"
				:disabled="isDisabled"
				:readonly="!isFilterable"
				@focus="onInputFocus"
				@blur="onInputBlur" />

				<div ref="selectorContentRef"
				v-show="!isEditing"
				class="wtf-selector-content"
				:tabindex="isDisabled ? undefined : 0"
				@focus="onContentFocus"
				@blur="onContentBlur">
					<template v-if="!isMultiple">{{ (optionList.find(item => item.checked) || { label: undefined }).label }}</template>
					<template v-else>
						<wtf-tag v-for="item in optionList.filter(item => item.checked)"
						type="primary"
						closable
						@close="onSelectorTagClose(item.value)">{{ item.label }}</wtf-tag>
					</template>
				</div>
				
				<div class="wtf-selector-mark">
					<svg width="1.75em" height="1.75em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17L7.41 8.59L6 10l6 6l6-6l-1.41-1.41z" fill="currentColor"></path></svg>
				</div>
				
			</div>
		</wtf-popper-trigger>
		<wtf-popper-content
		placement="bottom-start"
		:distance="computedDistance"
		enterable
		is-mounted>
			<div ref="optionsRef"
			class="wtf-selector-popper-content"
			:style="popperStyle"
			@mousedown="onMousedowm">
				<slot></slot>
			</div>
		</wtf-popper-content>
	</wtf-popper>
</template>

<script lang="ts" setup>

import './selector.less'
import WtfPopper from '../popper/popper.vue'
import WtfPopperTrigger from '../popper/popper-trigger.vue'
import WtfPopperContent from '../popper/popper-content.vue'
import WtfTag from '../tag/tag.vue'
import { CSSProperties, Ref, computed, nextTick, onMounted, provide, ref, unref, watch } from 'vue'
import { onClickOutside, toStyleObject } from '../utils'
import { OptionValue, SELECTOR_PROVIDE_KEY } from './selector'

defineOptions({
	name: 'WtfSelector'
})

const computedDistance = computed(() => .5 * parseFloat(window.getComputedStyle(document.body).fontSize))

const props = withDefaults(defineProps<{
	modelValue?: any,
	id?: string,
	form?: string,
	name?: string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	style?: string | object,
	disabled?: boolean,
	readonly?: boolean,
	filterable?: boolean,
	autoTitle?: boolean,
	multiple?: boolean
}>(), {})

const emit = defineEmits(['update:modelValue'])

// Dom

const popperRef = ref<InstanceType<typeof WtfPopper>>()
const selectorRef = ref<HTMLDivElement>()
const selectorInputRef = ref<HTMLInputElement>()
const selectorContentRef = ref<HTMLDivElement>()
const optionsRef = ref<HTMLDivElement>()

// State

const optionList = ref<OptionValue[]>([])

const keyword = ref()
const modelValue = computed({
	get: () => props.modelValue,
	set: (val) => {
		if(!unref(isMultiple)) {
			selectorInputRef.value?.blur()
			selectorContentRef.value?.blur()
		}
		emit('update:modelValue', val)
	}
})

const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFilterable = ref(props.filterable && !props.multiple)
const isFocused = ref(false)
const isEditing = ref(false)
const isMultiple = ref(props.multiple)
const hasTitle = ref(props.autoTitle)

// Class & Style

const classList = computed(() => [
	'wtf-selector',
	(props.size && props.size !== 'normal') ? 'wtf-selector--' + props.size : '',
	unref(isDisabled) ? 'wtf-selector--is-disabled' : '',
	unref(isReadonly) ? 'wtf-selector--is-readonly' : '',
	unref(isFocused) ? 'wtf-selector--is-focused' : '',
	unref(isMultiple) ? 'wtf-selector--is-multiple' : ''
])

const styleList = computed((): CSSProperties => ({ ...customStyleList.value }))

const customStyleList = computed(() => toStyleObject(props.style))

const popperStyle = computed((): CSSProperties => ({
	width: selectorRef.value?.clientWidth + 'px'
}))

// Function

function showOptions() {
	popperRef.value!.contentVisibility = true
}

function hideOptions() {
	popperRef.value ? popperRef.value!.contentVisibility = false : null
	selectorInputRef.value?.blur()
}

function toggleOptions() {
	popperRef.value!.contentVisibility = !unref(popperRef)!.contentVisibility
}

function onClick() {
	if(unref(isDisabled)) {
		return
	}
	if(unref(isFilterable)) {
		selectorInputRef.value?.focus()
	} else {
		selectorContentRef.value?.focus()
	}
}

function onInputFocus() {
	isFocused.value = true
	showOptions()
	if(unref(isFilterable)) {
		keyword.value = undefined
	}
}

function onInputBlur() {
	isFocused.value = false
	hideOptions()
	if(unref(isFilterable)) {
		keyword.value = (unref(optionList).find(item => item.checked) || { label: undefined }).label
	}
	isEditing.value = false
}

function onContentFocus() {
	isFocused.value = true
	if(unref(isReadonly)) {
		return
	}
	if(unref(isFilterable)) {
		isEditing.value = true
		nextTick(() => unref(selectorInputRef)?.focus())
	} else {
		showOptions()
	}
}

function onContentBlur() {
	isFocused.value = false
	hideOptions()
}

function onMousedowm(event: FocusEvent) {
	event.preventDefault()
}

function onSelectorTagClose(value: any) {
	modelValue.value = unref(modelValue).filter((item: any) => item !== value)
}

onMounted(() => {
	onClickOutside([unref(selectorRef)!, unref(optionsRef)!], hideOptions)
})

// Export

provide(SELECTOR_PROVIDE_KEY, {
	modelValue,
	optionList: optionList as unknown as Ref<OptionValue[]>,
	keyword,
	isFilterable,
	isMultiple,
	hasTitle,
	showOptions,
	hideOptions,
	toggleOptions
})

</script>