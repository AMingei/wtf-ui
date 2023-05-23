<template>
	<component :is="isReadonly ? 'div' : 'label'"
	:class="classList">
		<input ref="input"
		type="radio"
		:id="props.id"
		:class="inputClass"
		:style="inputStyle"
		:name="inject('name', props.name)"
		:form="inject('form', props.form)"
		:value="props.value"
		:checked="isChecked"
		:disabled="isDisabled"
		:tabindex="isReadonly ? -1 : 0"
		@click="userClick"
		@change="userChange"
		@focusin="userFocusIn"
		@focusout="userFocusOut" />
		<span :class="contentClass"
		:style="contentStyle">
			<slot></slot>
		</span>
	</component>
</template>

<script lang="ts" setup>

import './radio.less'

import { toClassList, toStyleObject } from '../utils'
import { ref, computed, onMounted, inject, watch, CSSProperties } from 'vue'

/**
 * radio
 * - radio-input
 * - radio-label
**/

defineOptions({
	name: 'WtfRadio'
})

const props = withDefaults(defineProps<{
	id?: string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	name?: string,
	form?: string,
	value?: boolean | number | string,
	readonly?: boolean,
	disabled?: boolean,
	inputClass?: string | string[],
	inputStyle?: string | object,
	contentClass?: string | string[],
	contentStyle?: string | object
}>(), {})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'change'])

const value = ref(props.value)
const defaultValue = inject('default-value', ref(null))
const currentValue = inject('current-value', ref(null))
const change = inject('change', (value?: boolean | number | string) => {})
const focus = inject('focus', () => {})
const foucsout = inject('focusout', () => {})
const readonlyChecked = inject('readonlyChecked', (flag: boolean) => {})

// DOM

const input = ref<HTMLInputElement>()
const dom = computed(() => input.value)

// State

const isChecked = ref(false)
const isDisabled = computed(() => inject('disabled', false) || props.disabled)
const isReadonly = computed(() => inject('readonly', ref(false)).value || props.readonly)
const isFocused = ref(false)

watch(
	() => isChecked.value,
	(value) => {
		emit('change', value)
		if(value === true) {
			change(props.value)
		}
	}
)

watch(
	() => currentValue.value,
	(value) => {
		if(value !== props.value) {
			isChecked.value = false
		} else {
			isChecked.value = true
			if(isReadonly.value) {
				readonlyChecked(true)
			}
		}
	}
)

// Class

const classList = computed(() => [
	'wtf-radio',
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // readonly
])

const inputClass = computed(() => [
	'wtf-radio-input',
	`${isFocused.value ? 'focus-visible' : ''}`, // focus-visible
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // readonly
	...customInputClass.value
])

const contentClass = computed(() => [
	'wtf-radio-label',
	...customContentClass.value
])

const customInputClass = computed(() => toClassList(props.inputClass))
const customContentClass = computed(() => toClassList(props.contentClass))

// Style

const inputStyle = computed((): CSSProperties => ({ ...toStyleObject(props.inputStyle) }))
const contentStyle = computed((): CSSProperties => ({ ...toStyleObject(props.contentStyle) }))

// Function

function userClick(event: MouseEvent) {
	if(isReadonly.value) {
		event.preventDefault()
	}
}

function userChange() {
	isChecked.value = true
}

function userFocusIn(event: FocusEvent) {
	isFocused.value = true
	emit('focus', event)
	focus()
}
function userFocusOut(event: FocusEvent) {
	isFocused.value = false
	emit('focusout', event)
	foucsout()
}

onMounted(() => {
	const tempValue = currentValue.value === undefined ? defaultValue.value : currentValue.value
	if(value.value !== undefined && tempValue !== undefined && value.value === tempValue) {
		if(isDisabled.value) {
			change(undefined)
		} else {
			isChecked.value = true
			if(isReadonly.value) {
				readonlyChecked(true)
			}
		}
	}
})

// Expose

defineExpose({
	dom,
	focus: () => dom.value?.focus(),
	focusout: () => dom.value?.blur(),
	check: () => isChecked.value = true,
	uncheck: () => isChecked.value = false
})
</script>