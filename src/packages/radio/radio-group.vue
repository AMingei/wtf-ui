<template>
	<div ref="radioGroup"
	class="wtf-radio-group">
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>
import './radio-group.less'

import { computed, provide, ref } from 'vue'

defineOptions({
	name: 'WtfRadioGroup'
})

const props = withDefaults(defineProps<{
	name?: string,
	form?: string,
	value?:  boolean | number | string,
	modelValue?: boolean | number | string,
	disabled?: boolean | undefined,
	readonly?: boolean | undefined
}>(), {})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'change'])

// Dom

const radioGroup = ref<HTMLDivElement>()

// State

const isFocused = ref(false)

const isReadonly = computed(() => props.readonly || offspringReadonly.value)
const offspringReadonly = ref(false)

provide('name', props.name)
provide('form', props.form)
provide('disabled', props.disabled)
provide('readonly', isReadonly)
provide('default-value', computed(() => props.value))
provide('current-value', computed(() => props.modelValue))
provide('change', userChange)
provide('focus', userFocusIn)
provide('focusout', userFocusOut)
provide('readonlyChecked', offspringReadonlyChecked)

// Function

function userChange(value?: boolean | number | string) {
	if(props.modelValue !== value) {
		emit('update:modelValue', value)
		emit('change', value)
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

function offspringReadonlyChecked(flag: boolean) {
	if(offspringReadonly.value) {
		offspringReadonly.value = false
	} else {
		offspringReadonly.value = true
	}
}
</script>