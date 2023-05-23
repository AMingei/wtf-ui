<template>
	<wtf-popper ref="popperRef">
		<wtf-popper-trigger>
			<div ref="selectorRef"
			:class="classList"
			@click="onClick">
				<div ref="selectorContentRef"
				class="wtf-date-selector-content"
				:class="{ 'wtf-date-selector-content--is-limited': isLimited }"
				:tabindex="isDisabled ? undefined : 0"
				@focus="onContentFocus"
				@blur="onContentBlur"
				@keydown.tab="onKeypressTab">
					{{ modelValueString }}
				</div>
				<template v-if="isDateRange">
					-
					<div ref="selectorContentRef"
					class="wtf-date-selector-content"
					:class="{ 'wtf-date-selector-content--is-limited': isLimited }"
					:tabindex="isDisabled ? undefined : 0"
					@focus="onContentFocus"
					@blur="onContentBlur"
					@keydown.tab="onKeypressTab">
						{{ modelValueString?.end }}
					</div>
				</template>
			</div>
		</wtf-popper-trigger>
		<wtf-popper-content
		placement="top-start"
		enterable
		:distance="computedDistance"
		:is-mounted="false">
			<wtf-date-selector-popper 
			ref="selectorPopperRef" 
			v-model="modelValue"
			:limination="limination"
			:turn-now="turnNow"
			:mode="mode" />
		</wtf-popper-content>
	</wtf-popper>
</template>

<script lang="ts" setup>

import './date-selector.less'
import WtfDateSelectorPopper from './date-selector-popper.vue'
import WtfPopper from '../popper/popper.vue'
import WtfPopperTrigger from '../popper/popper-trigger.vue'
import WtfPopperContent from '../popper/popper-content.vue'
import { computed, nextTick, reactive, ref, shallowRef, unref, watch } from 'vue'
import { onClickOutside } from '../utils'
import { WtfDate, WtfDateRage } from './date-selector'

defineOptions({
	name: 'WtfDateSelector'
})

const computedDistance = computed(() => .5 * parseFloat(window.getComputedStyle(document.body).fontSize))

const props = withDefaults(defineProps<{
	modelValue?: Date,// | [Date?, Date?],
	id?: string,
	form?: string,
	name?: string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	disabled?: boolean,
	readonly?: boolean,
	limination?: Function,
	turnNow?: boolean,
	mode?: 'month' | 'date'
}>(), {
	mode: 'date'
})

const emit = defineEmits(['update:modelValue'])

// Dom

const popperRef = ref<InstanceType<typeof WtfPopper>>()
const selectorRef = ref<HTMLDivElement>()
const selectorInputRef = ref<HTMLInputElement>()
const selectorContentRef = ref<HTMLDivElement>()
const selectorPopperRef = ref<InstanceType<typeof WtfDateSelectorPopper>>()

// State

const isDateRange = computed(() => props.modelValue && Array.isArray(props.modelValue))

// const modelValue = shallowRef<WtfDate | WtfDateRage>()
	const modelValue = shallowRef<WtfDate>()
// if(props.modelValue && Array.isArray(props.modelValue)) {
	// modelValue.value = new WtfDateRage(new WtfDate(props.modelValue[0]), new WtfDate(props.modelValue[1]))
// } else if(props.modelValue) {
	modelValue.value = new WtfDate(props.modelValue)
// }

watch(modelValue, (val) => {
	if(val instanceof WtfDate) {
		emit('update:modelValue', val.now)
	}/* else if(val instanceof WtfDateRage) {*/
		// emit('update:modelValue', [val.start, val.end])
	// }
})

const modelValueString = computed(() => {
	if(modelValue.value instanceof WtfDate) {
		switch(props.mode) {
			case 'date':
				return modelValue.value.toString()
			case 'month':
				return modelValue.value.toYMString()
		}
	} /*else if(modelValue.value instanceof WtfDateRage) {
		switch(props.mode) {
			case 'date':
				return {
					start: modelValue.value.start?.toString(),
					end: modelValue.value.end?.toString()
				}
			case 'month':
				return {
					start: modelValue.value.start?.toYMString(),
					end: modelValue.value.end?.toYMString()
				}
		}
	}*/
})

const modelValueRangeString = computed(() => {
	if(modelValue.value instanceof WtfDateRage) {
		switch(props.mode) {
			case 'date':
				return {
					start: modelValue.value.start?.toString(),
					end: modelValue.value.start?.toString()
				}
			case 'month':
				return {
					start: modelValue.value.start?.toYMString(),
					end: modelValue.value.start?.toYMString()
				}
		}
	}
})

const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFocused = ref(false)
const isLimited = computed(() => modelValue.value && modelValue.value instanceof WtfDate ? props.limination && props.limination(modelValue.value.year, modelValue.value.month, modelValue.value.date) : false)

// Class & Style

const classList = computed(() => [
	'wtf-date-selector',
	(props.size && props.size !== 'normal') ? 'wtf-date-selector--' + props.size : '',
	unref(isDisabled) ? 'wtf-date-selector--is-disabled' : '',
	unref(isReadonly) ? 'wtf-date-selector--is-readonly' : '',
	unref(isFocused) ? 'wtf-date-selector--is-focused' : ''
])

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

function onClick() {
	if(unref(isDisabled)) {
		return
	}
	selectorContentRef.value?.focus()
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

function onKeypressTab() {
	hideOptions()
}

// Export

</script>