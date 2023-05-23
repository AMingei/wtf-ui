<template>
	<div class="wtf-switch">
		<input class="wtf-switch-input"
		:id="props.id"
		:name="props.name"
		:form="props.form"
		:value="currentValue"
		tabindex="-1"
		readonly
		@focus="inputFocusIn" />

		<div ref="input"
		:class="classList"
		:style="styleList"
		:tabindex="isDisabled ? -1 : 0"
		@focusin="userFocusIn"
		@focusout="userFocusOut"
		@click="toggleValue"
		@keypress="keyPress">
			<div class="wtf-switch-bar">
				<div v-if="props.textOff || $slots.textoff"
				ref="textOff"
				:class="switchOffClass"
				:style="switchOffStyle">
					<slot name="textoff">{{ props.textOff }}</slot>
				</div>

				<div v-if="props.textOn || $slots.texton"
				ref="textOn"
				:class="switchOnClass"
				:style="switchOnStyle">
					<slot name="texton">{{ props.textOn }}</slot>
				</div>

				<div 
				:class="switchButtonClass"
				:style="switchButtonStyle">
					<slot name="button"></slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

import './switch.less'

import { toClassList, toStyleObject } from '../utils'
import { ref, computed, onMounted, CSSProperties } from 'vue'

/**
 * switch
 * - input
 * - switch-box
 *   - switch-bar
 *     - text-off #textoff
 *     - text-on  #texton
**/

defineOptions({
	name: 'WtfSwitch'
})

const props = withDefaults(defineProps<{
	id?: string,
	modelValue?: boolean | number | string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	name?: string,
	form?: string,
	valueOff?: boolean | number | string,
	valueOn?: boolean | number | string,
	textOff?: string,
	textOn?: string,
	colorOff?: string,
	colorOn?: string,
	readonly?: boolean,
	disabled?: boolean,
	contentClass?: string | string[],
	contentStyle?: string | object,
	switchOffClass?: string | string[],
	switchOffStyle?: string | object,
	switchOnClass?: string | string[],
	switchOnStyle?: string | object,
	switchButtonClass?: string | string[],
	switchButtonStyle?: string | object
}>(), {
	valueOff: false,
	valueOn: true
})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'change'])

// DOM

const input = ref<HTMLInputElement>()
const dom = computed(() => input.value)
const textOff = ref<HTMLDivElement>()
const textOn = ref<HTMLDivElement>()

// State

const currentValue = ref<boolean | number | string | undefined>()

const modelValue = computed({
	get: () => (props.modelValue || currentValue.value || props.valueOff) === props.valueOn ? props.valueOn : props.valueOff,
	set: (val: boolean | number | string | undefined) => {
		currentValue.value = val === props.valueOn ? props.valueOn : props.valueOff
		emit('update:modelValue', currentValue.value)
	}
})

const isSwitchOn = computed(() => modelValue.value === props.valueOn)
const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFocused = ref(false)

// Class

const classList = computed(() => [
	'wtf-switch-box',
	`wtf-switch-box--${isSwitchOn.value ? 'on' : 'off'}`,
	`${(props.size && props.size !== 'normal') ? 'wtf-switch-box--' + props.size : '' }`, // size
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // disable
	`${isFocused.value ? 'focus-visible' : ''}`, // focus-visible
	...customContentClass.value
])
const switchOffClass = computed(() => [
	'wtf-switch-text--off',
	...customSwitchOffClass.value
])
const switchOnClass = computed(() => [
	'wtf-switch-text--on',
	...customSwitchOnClass.value
])
const switchButtonClass = computed(() => [
	'wtf-switch-button',
	...customSwitchButtonClass.value
])

const customContentClass = computed(() => toClassList(props.contentClass))
const customSwitchOffClass = computed(() => toClassList(props.switchOffClass))
const customSwitchOnClass = computed(() => toClassList(props.switchOnClass))
const customSwitchButtonClass = computed(() => toClassList(props.switchButtonClass))

// Style

const styleList = computed((): CSSProperties => ({
	backgroundColor: isSwitchOn.value ? props.colorOn : props.colorOff,
	...customContentStyle.value
}))
const switchOffStyle = computed((): CSSProperties => ({ ...customSwitchOffStyle.value }))
const switchOnStyle = computed((): CSSProperties => ({ ...customSwitchOnStyle.value }))
const switchButtonStyle = computed((): CSSProperties => ({ ...customSwitchButtonStyle.value }))

const customContentStyle = computed(() => toStyleObject(props.contentStyle))
const customSwitchOffStyle = computed(() => toStyleObject(props.switchOffStyle))
const customSwitchOnStyle = computed(() => toStyleObject(props.switchOnStyle))
const customSwitchButtonStyle = computed(() => toStyleObject(props.switchButtonStyle))

// Function

function inputFocusIn(event: FocusEvent) {
	(event.target as unknown as HTMLInputElement).blur()
	dom.value?.focus()
}

function userFocusIn(event: FocusEvent) {
	isFocused.value = true
	emit('focus', event)
}
function userFocusOut(event: FocusEvent) {
	isFocused.value = false
	emit('focusout', event)
}
function keyPress(event: KeyboardEvent) {
	if(!isReadonly.value && event.key === ' ') {
		toggleValue()
	}
	if(event.key === ' ') {
		event.preventDefault()
	}
}
function toggleValue(event?: MouseEvent, value?: boolean | number | string) {
	let flag = false
	if(event && (isDisabled.value || isReadonly.value)) return
	if(value !== undefined) {
		if(modelValue.value !== value) flag = true
		modelValue.value = value
	} else {
		flag = true
		modelValue.value = isSwitchOn.value ? props.valueOff : props.valueOn
	}
	flag ? emit('change', currentValue.value) : null
}

onMounted(() => {
	currentValue.value = modelValue.value
	const inputDom = input.value
	const textOffDom = textOff.value
	const textOnDom = textOn.value
	if(inputDom && (textOffDom || textOnDom)) {
		const width = Math.max(textOffDom?.getBoundingClientRect().width || 0, textOnDom?.getBoundingClientRect().width || 0)
		const calculatedWidth = `calc(${width / .95}px + .15em)`
		textOffDom ? textOffDom.style.width = calculatedWidth : null
		textOnDom ? textOnDom.style.width = calculatedWidth : null
		inputDom.style.width = calculatedWidth
	}
})

// Expose

defineExpose({
	dom,
	focus: () => dom.value?.focus(),
	focusout: () => dom.value?.blur(),
	toggle: (value?: boolean | number | string) => toggleValue(undefined, value)
})
</script>