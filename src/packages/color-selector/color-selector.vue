<template>
	<wtf-popper ref="popperRef">
		<wtf-popper-trigger>
			<div ref="selectorRef"
			:class="classList"
			@click="onClick">
				<div ref="selectorContentRef"
				class="wtf-color-selector-content"
				:tabindex="isDisabled ? undefined : 0"
				@focus="onContentFocus"
				@blur="onContentBlur"
				@keydown.tab="onKeypressTab">
					<div class="wtf-color-selector-color-background">
						<div class="wtf-color-selector-color-block"
						:style="colorBlockStyle">#{{ props.modelValue }}</div>
					</div>
				</div>
			</div>
		</wtf-popper-trigger>
		<wtf-popper-content
		placement="top-start"
		enterable
		:distance="computedDistance"
		:is-mounted="false">
			<wtf-color-selector-popper 
			ref="selectorPopperRef" 
			v-model="modelValue"
			:mode="mode"
			:alpha="alpha"
			:pre-pallete="prePallete"
			:editable="editable" />
		</wtf-popper-content>
	</wtf-popper>
</template>

<script lang="ts" setup>

import './color-selector.less'
import WtfColorSelectorPopper from './color-selector-popper.vue'
import WtfPopper from '../popper/popper.vue'
import WtfPopperTrigger from '../popper/popper-trigger.vue'
import WtfPopperContent from '../popper/popper-content.vue'
import { computed, nextTick, ref, shallowRef, unref, watch } from 'vue'
import { onClickOutside } from '../utils'
import { ColorRGB } from './color-selector'

defineOptions({
	name: 'WtfColorSelector'
})

const computedDistance = computed(() => .5 * parseFloat(window.getComputedStyle(document.body).fontSize))

const props = withDefaults(defineProps<{
	modelValue?: string,
	id?: string,
	form?: string,
	name?: string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	style?: string | object,
	disabled?: boolean,
	readonly?: boolean,
	mode?: /*'hex' | */'rgb' /*| 'hsl' */| 'hsv' | 'hsb',
	alpha?: boolean,
	prePallete?: string[],
	editable?: boolean
}>(), {
	modelValue: '000000',
	mode: 'rgb'
})

const emit = defineEmits(['update:modelValue'])

// Dom

const popperRef = ref<InstanceType<typeof WtfPopper>>()
const selectorRef = ref<HTMLDivElement>()
const selectorInputRef = ref<HTMLInputElement>()
const selectorContentRef = ref<HTMLDivElement>()
const selectorPopperRef = ref<InstanceType<typeof WtfColorSelectorPopper>>()

// State

const modelValue = shallowRef(new ColorRGB(props.modelValue))

watch(modelValue, (val) => {
	emit('update:modelValue', val.toString())
}, { deep: true })


const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFocused = ref(false)

// Class & Style

const classList = computed(() => [
	'wtf-color-selector',
	(props.size && props.size !== 'normal') ? 'wtf-color-selector--' + props.size : '',
	unref(isDisabled) ? 'wtf-color-selector--is-disabled' : '',
	unref(isReadonly) ? 'wtf-color-selector--is-readonly' : '',
	unref(isFocused) ? 'wtf-color-selector--is-focused' : ''
])

const colorBlockStyle = computed(() => ({
	color: `${modelValue.value.toHSL().l > 50 ? 'black' : 'white'}`,
	backgroundColor: `#${modelValue.value}`
}))

// Function

function showOptions() {
	if(!unref(popperRef)!.contentVisibility) {
		popperRef.value!.contentVisibility = true
		nextTick(() => onClickOutside([unref(selectorRef)!, unref(selectorPopperRef)!.ref!], hideOptions))
	}
}

function hideOptions() {
	popperRef.value ? popperRef.value!.contentVisibility = false : null
	selectorInputRef.value?.blur()
}

function toggleOptions() {
	// popperRef.value!.contentVisibility = !unref(popperRef)!.contentVisibility
}

function onClick() {
	if(unref(isDisabled)) {
		return
	}
	selectorContentRef.value?.focus()
}

function onInputFocus() {
	isFocused.value = true
	showOptions()
}

function onInputBlur() {
	isFocused.value = false
	hideOptions()
}

function onContentFocus() {
	isFocused.value = true
	if(unref(isReadonly)) {
		return
	}
	showOptions()
}

function onContentBlur() {
	isFocused.value = false
}

function onMousedowm(event: FocusEvent) {
	event.preventDefault()
}

function onKeypressTab() {
	hideOptions()
}

// Export

</script>