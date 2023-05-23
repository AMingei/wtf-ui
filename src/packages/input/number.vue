<template>
	<div :class="classList">
		<template v-if="!isDisabled && !isReadonly && hasController">
			<div v-if="props.controllerJustify === 'between' || props.controllerJustify === 'start'"
			:class="decreaseClass"
			:style="decreaseStyle"
			@mousedown.prevent>
				<slot name="decrease">
					<svg width="1.2em" height="1.2em" @click="userDecrease" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z" fill="currentColor"></path></svg>
				</slot>
			</div>
			<div v-if="props.controllerJustify === 'start'"
			:class="increaseClass"
			:style="increaseStyle"
			@mousedown.prevent>
				<slot name="increase">
					<svg width="1.2em" height="1.2em" @click="userIncrease" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" fill="currentColor"></path></svg>
				</slot>
			</div>
		</template>

		<div v-if="$slots.prefix || props.prefix"
		:class="prefixClass"
		:style="prefixStyle"
		@mousedown.prevent>
			<slot name="prefix">{{ props.prefix }}</slot>
		</div>

		<input v-model="modelValue"
		ref="input"
		:id="props.id"
		:class="contentClass"
		:style="contentStyle"
		:form="props.form"
		:name="props.name"
		:placeholder="props.placeholder"
		:required="isRequired"
		:disabled="isDisabled"
		:readonly="isReadonly"
		@focusin="userFocusIn"
		@focusout="userFocusOut"
		@input="userInput(currentValue)"
		@change="userChange(modelValue)"
		@keydown.enter="userEnter" />

		<div v-if="props.autoFit"
		ref="fakeInput"
		class="wtf-input-fake">{{ modelValue || ' ' }}</div>

		<div v-if="!isDisabled && !isReadonly && props.resetable"
		class="wtf-input-reset"
		@mousedown.prevent>
			<svg width="1.35em" height="1.35em" @click="userReset(modelValue)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64l-64 64L169.37 320l64-64l-64-64L192 169.37l64 64l64-64L342.63 192l-64 64z" fill="currentColor"></path></svg>
		</div>

		<div v-if="$slots.suffix || props.suffix"
		:class="suffixClass"
		:style="suffixStyle"
		@mousedown.prevent>
			<slot name="suffix">{{ props.suffix }}</slot>
		</div>

		<template v-if="!isDisabled && !isReadonly && hasController">
			<div v-if="props.controllerJustify === 'end'"
			:class="decreaseClass"
			:style="decreaseStyle"
			@mousedown.prevent>
				<slot name="decrease">
					<svg width="1.2em" height="1.2em" @click="userDecrease" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z" fill="currentColor"></path></svg>
				</slot>
			</div>
			<div v-if="props.controllerJustify === 'end' || props.controllerJustify === 'between'"
			:class="increaseClass"
			:style="increaseStyle"
			@mousedown.prevent>
				<slot name="increase">
					<svg width="1.2em" height="1.2em" @click="userIncrease" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z" fill="currentColor"></path></svg>
			</slot>
			</div>
		</template>
	</div>
</template>

		<!-- <div v-if="isRequired"
		v-show="!isVertified"
		class="wtf-input-vertify"
		:title="vertifyText">
			<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2a8 8 0 1 1-3.613 15.14l-.121-.065l-3.645.91a.5.5 0 0 1-.62-.441v-.082l.014-.083l.91-3.644l-.063-.12a7.95 7.95 0 0 1-.83-2.887l-.025-.382L2 10a8 8 0 0 1 8-8zm0 3.5a.5.5 0 0 0-.5.5v5.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5zm0 9a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5z" fill="currentColor"></path></g></svg>
		</div> -->
<script lang="ts" setup>

import './input.less'
import './number.less'

import { toClassList, toStyleObject } from '../utils'
import { ref, computed, onMounted, useSlots, watch, onUpdated, CSSProperties } from 'vue'

/**
 * input
 * - input-box
 *   - input-decrease (increase)
 *   - input-prefix #prefix
 *   - input-content
 *   - input-reset
 *   - input-suffix #suffix
 *   - input-increase (decrease)
 * - input-vertify
 *   - svg
**/

defineOptions({
	name: 'WtfNumber'
})

const props = withDefaults(defineProps<{
	id?: string,
	modelValue?: number,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	placeholder?: string,
	name?: string,
	form?: string,
	value?: number,
	controller?: boolean,
	controllerJustify?: 'between' | 'start' | 'end',
	precision?: number | string,
	step?: number | string,
	strictStep?: number | string,
	range?: [number, number] | string,
	autoFit?: boolean,
	split?: [number, string] | string,
	required?: boolean,
	readonly?: boolean,
	disabled?: boolean,
	resetable?: boolean,
	autocomplete?: string,
	autofocus?: boolean,
	decreaseClass?: string | string[],
	decreaseStyle?: string | object,
	increaseClass?: string | string[],
	increaseStyle?: string | object,
	prefix?: string,
	prefixClass?: string | string[],
	prefixStyle?: string | object,
	suffix?: string,
	suffixClass?: string | string[],
	suffixStyle?: string | object,
	contentClass?: string | string[],
	contentStyle?: string | object
}>(), {
	step: 1,
	controllerJustify: 'end'
})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'input', 'change', 'before-reset', 'reset'])

const slot = useSlots()

// DOM

const input = ref<HTMLInputElement>()
const dom = computed(() => input.value)
const fakeInput = ref<HTMLDivElement>()

// State

const DEFAULT_STRICT_STEP = 1
const MAX_PRECISION = 12

const currentValue = ref<number | undefined>();
const computedCurrentValue = computed(() => {
	if(currentValue.value) {
		const temp = parseFloat(parseFloat(toUnsplit(currentValue.value).toString()).toFixed(precision.value))
		if(isNaN(temp)) return undefined
		else return props.strictStep ? parseInt((temp / strictStep.value).toString()) * strictStep.value : temp
	} else {
		return toUnsplit(currentValue.value)
	}
})

const modelValue = computed({
	get: () => computedCurrentValue.value === props.modelValue ? currentValue.value : props.modelValue,
	set: (val: number | undefined) => {
		currentValue.value = typeof val === 'number' && props.precision ? val.toFixed(precision.value) as unknown as number : val
		currentValue.value = toInranged(currentValue.value)
		emit('update:modelValue', typeof computedCurrentValue.value === 'number' && !isNaN(computedCurrentValue.value) ? computedCurrentValue.value : undefined)
	}
})

watch(() => props.modelValue, (val) => {
	if(val !== computedCurrentValue.value) {
		modelValue.value = val
	}
})

const hasController = computed(() => props.controller || slot.decrease || slot.increase)

const step = computed(() => 
	parseFloat((props.strictStep || props.step).toString())
)
const strictStep = computed(() => parseFloat((props.strictStep || DEFAULT_STRICT_STEP).toString()))
const precision = computed(() => 
	Math.min(parseInt((props.precision || MAX_PRECISION).toString()), MAX_PRECISION)
)
const splitStep = computed(() =>
	typeof props.split === 'string' ?  parseInt(props.split.split(' ')[0]) : 
		props.split instanceof Array && typeof props.split[0] === 'number' ? props.split[0] : undefined
)
const splitSign = computed(() =>
	typeof props.split === 'string' ? props.split.split(' ')[1] : 
		props.split instanceof Array && typeof props.split[1] === 'string' ? props.split[1] : undefined
)
const range = computed(() => 
	props.range instanceof Array ? { min: props.range[0], max: props.range[1] } : 
		typeof props.range === 'string' ? { min: parseFloat(props.range.split(' ')[0]), max: parseFloat(props.range.split(' ')[1]) } : undefined
)

const vertifyText = '该项为必填项'

const isRequired = ref(props.required)
const isVertified = ref(true)
const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFocused = ref(false)

// Class

const classList = computed(() => [
	'wtf-input',
	`${(props.size && props.size !== 'normal') ? 'wtf-input--' + props.size : '' }`, // size
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // disable
	`${isFocused.value ? 'focus-visible' : ''}`, // focus-visible
])

const decreaseClass = computed(() => [
	'wtf-input-decrease',
	...customDecreaseClass.value
])
const increaseClass = computed(() => [
	'wtf-input-increase',
	...customIncreaseClass.value
])
const prefixClass = computed(() => [
	'wtf-input-prefix',
	...customPrefixClass.value
])
const suffixClass = computed(() => [
	'wtf-input-suffix',
	...customSuffixClass.value
])
const contentClass = computed(() => [
	'wtf-input-content',
	...customContentClass.value
])

const customDecreaseClass = computed(() => toClassList(props.decreaseClass))
const customIncreaseClass = computed(() => toClassList(props.increaseClass))
const customPrefixClass = computed(() => toClassList(props.prefixClass))
const customSuffixClass = computed(() => toClassList(props.suffixClass))
const customContentClass = computed(() => toClassList(props.contentClass))

// Style

const decreaseStyle = computed((): CSSProperties => ({ ...customDecreaseStyle.value }))
const increaseStyle = computed((): CSSProperties => ({ ...customIncreaseStyle.value }))
const prefixStyle = computed((): CSSProperties => ({ ...customPrefixStyle.value }))
const suffixStyle = computed((): CSSProperties => ({
	flex: props.autoFit ? 'auto' : '',
	...customSuffixStyle.value
}))
const contentStyle = computed((): CSSProperties => ({ ...customContentStyle.value }))

const customDecreaseStyle = computed(() => toStyleObject(props.decreaseStyle))
const customIncreaseStyle = computed(() => toStyleObject(props.increaseStyle))
const customPrefixStyle = computed(() => toStyleObject(props.prefixStyle))
const customSuffixStyle = computed(() => toStyleObject(props.suffixStyle))
const customContentStyle = computed(() => toStyleObject(props.contentStyle))

// Function
function toInranged(val: number | string | undefined) {
	if(val && range.value) {
		if(parseFloat(val.toString()) > range.value.max) return range.value.max
		else if(parseFloat(val.toString()) < range.value.min) return range.value.min
	}
	return val as unknown as number
}
function toPrecision(val: number | string | undefined) {
	if(val && props.precision) {
		return parseFloat(val.toString()).toFixed(precision.value)
	} else {
		return val ? parseFloat(parseFloat(val.toString()).toFixed(precision.value)) : val
	}
}
function toSplit(val: number | string | undefined) {
	if(val && splitStep.value && splitSign.value) {
		const temp = val.toString().split('.')
		const integerPart = temp[0].split('').reverse().reduce(
			(acc, cur, index) => acc + ((index && splitStep.value && index % splitStep.value === 0) ? splitSign.value : '') + cur,
			''
		).split('').reverse().join('')
		const decimalPart = temp[1] ? '.' + temp[1].split('').reduce(
			(acc, cur, index) => acc + ((index && splitStep.value && index % splitStep.value === 0) ? splitSign.value : '') + cur,
			''
		).split('').join('') : ''
		return integerPart + decimalPart as unknown as number
	}
	return val as unknown as number
}
function toUnsplit(val: number | string | undefined) {
	if(val && splitStep.value && splitSign.value) {
		return parseFloat(val.toString().split(splitSign.value).join('')) as unknown as number
	}
	return val as unknown as number
}

function userFocusIn(event: FocusEvent) {
	isFocused.value = true
	currentValue.value = toUnsplit(currentValue.value)
	emit('focus', event)
}
function userFocusOut(event: FocusEvent) {
	isFocused.value = false
	if(isRequired.value && !modelValue.value) {
		isVertified.value = false
	} else {
		isVertified.value= true
	}
	modelValue.value = computedCurrentValue.value
	currentValue.value = toSplit(currentValue.value)
	emit('focusout', event)
}
function userInput(value: number | undefined) {
	emit('input', value)
}
function userReset(value: number | undefined) {
	if(value != props.value) {
		emit('before-reset', value)
		modelValue.value = props.value
		emit('reset', modelValue.value)
	}
}
function userChange(value: number | undefined ) {
	emit('change', value)
}
function userDecrease() {
	modelValue.value = parseFloat(((computedCurrentValue.value || 0) - step.value).toFixed(precision.value))
}
function userIncrease() {
	modelValue.value = parseFloat(((computedCurrentValue.value || 0) + step.value).toFixed(precision.value))
}

function select() {
	dom.value?.select()
}

function userEnter() {
	input.value?.blur()
}

onMounted(() => {
	const inputDom = input.value
	const fakeInputDom = fakeInput.value
	
	modelValue.value = toSplit(toPrecision(props.modelValue))

	if(props.autoFit && inputDom && fakeInputDom) {
		inputDom.style.width = fakeInputDom.clientWidth + 'px'
		inputDom.style.minWidth = '1.5em'
	}
})

onUpdated(() => {
	const inputDom = input.value
	const fakeInputDom = fakeInput.value

	if(props.autoFit && inputDom && fakeInputDom) {
		inputDom.style.width = fakeInputDom.clientWidth + 'px'
	}
})

// Expose

defineExpose({
	dom,
	focus: () => dom.value?.focus(),
	focusout: () => dom.value?.blur(),
	decrease: () => userDecrease(),
	increase: () => userIncrease(),
	reset: () => userReset(modelValue.value),
	select
})
</script>