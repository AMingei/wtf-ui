<template>
	<component :is="isReadonly ? 'div' : 'label'"
	:class="classList">
		<input ref="input"
		type="checkbox"
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

import './checkbox.less'

import { toClassList, toStyleObject } from '../utils'
import { ref, computed, onMounted, inject, watch, CSSProperties } from 'vue'

/**
 * checkbox
 * - checkbox-input
 * - checkbox-label
**/

defineOptions({
	name: 'WtfCheckbox'
})

const props = withDefaults(defineProps<{
	id?: string,
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	name?: string,
	form?: string,
	value?: any,
	readonly?: boolean,
	disabled?: boolean,
	indeterminate?: boolean,
	inputClass?: string | string[],
	inputStyle?: string | object,
	contentClass?: string | string[],
	contentStyle?: string | object
}>(), {})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'change'])

const value = ref(props.value)
const defaultValue = inject('default-value', ref([]))
const currentValue = inject('current-value', ref([]))
const change = inject('change', (value: any, state: boolean) => {})
const focus = inject('focus', () => {})
const foucsout = inject('focusout', () => {})

// DOM

const input = ref<HTMLInputElement>()
const dom = computed(() => input.value)

// State

const isChecked = ref(false)
const isDisabled = computed(() => !isChecked.value && isLimited.value || inject('disabled', false) || props.disabled)
const isReadonly = computed(() => inject('readonly', false) || props.readonly)
const isFocused = ref(false)
const isLimited = computed(() => inject('limited', ref(false)).value)

watch(
	() => isChecked.value,
	(state) => {
		change(value.value, state)
	}
)

watch(
	() => currentValue.value,
	(list: any[]) => {
		if(list.includes(value.value) && !isChecked.value) {
			isChecked.value = true
		} else if(!list.includes(value.value) && isChecked.value) {
			isChecked.value = false
		}
	}, {
		deep: true
	}
)

// Class

const classList = computed(() => [
	'wtf-checkbox',
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // readonly
])

const inputClass = computed(() => [
	'wtf-checkbox-input',
	`${isFocused.value ? 'focus-visible' : ''}`, // focus-visible
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // readonly
	`${props.indeterminate ? 'indeterminate' : ''}`,
	...customInputClass.value
])

const contentClass = computed(() => [
	'wtf-checkbox-label',
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
	} else {
		isChecked.value = (dom.value as HTMLInputElement).checked
	}
}

function userChange() {
		emit('change', isChecked.value)
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
	let tempValue: Array<any> = []
	if(Array.isArray(currentValue.value) && (currentValue.value as Array<any>).length) {
		tempValue = currentValue.value
	} else if(Array.isArray(defaultValue.value) && (defaultValue.value as Array<any>).length) {
		tempValue = defaultValue.value
	}
	if(value.value !== undefined && tempValue.length && tempValue.includes(value.value)) {
		if(isDisabled.value) {
			change(value.value, false)
		} else {
			isChecked.value = true
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