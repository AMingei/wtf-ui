<template>
	<div ref="radioGroup"
	class="wtf-radio-group">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import './checkbox-group.less'

import { computed, provide, ref } from 'vue'

defineOptions({
	name: 'WtfCheckboxGroup'
})

const props = withDefaults(defineProps<{
	name?: string,
	form?: string,
	value?: any[],
	modelValue?: any[],
	disabled?: boolean | undefined,
	readonly?: boolean | undefined,
	limit?: number | string
}>(), {})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'change'])

// Dom

const radioGroup = ref<HTMLDivElement>()

// State

const isFocused = ref(false)

provide('name', props.name)
provide('form', props.form)
provide('disabled', props.disabled)
provide('readonly', props.readonly)
provide('limited', computed(() => (props.modelValue || []).length >= parseInt((props.limit || Infinity).toString())))
provide('default-value', computed(() => props.value))
provide('current-value', computed(() => props.modelValue))
provide('change', userChange)
provide('focus', userFocusIn)
provide('focusout', userFocusOut)

// Function

function userChange(value: any, state: boolean) {
	if(state && !props.modelValue?.includes(value)) {
		let tempValue = (props.modelValue || []).concat([value])
		emit('update:modelValue', tempValue)
		emit('change', tempValue)
	} else if(!state && props.modelValue?.includes(value)) {
		let tempValue = (props.modelValue || []).concat().filter(item => item !== value)
		emit('update:modelValue', tempValue)
		emit('change', tempValue)
	}
}

function userFocusIn() {
	if(!isFocused.value) {
		isFocused.value = true
		emit('focus')
	}
}

function userFocusOut() {
	if(isFocused.value) {
		isFocused.value = false
		emit('focusout')
	}
}
</script>