<template>
	<div :class="classList"
	:style="styleList"
	v-title:top-start="title"
	@click="onClick">
		<div ref="optionLabelRef"
		class="wtf-option-label">
			<slot>{{ props.label }}</slot>
		</div>
		<transition name="wtf-option-mark">
			<div v-if="isActive" class="wtf-option-mark">
				<svg width="1.5em" height="1.5em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 16 16"><g fill="none"><path d="M8 2a6 6 0 1 1 0 12A6 6 0 0 1 8 2zm2.12 4.164L7.25 9.042L5.854 7.646a.5.5 0 1 0-.708.708l1.75 1.75a.5.5 0 0 0 .708 0l3.224-3.234a.5.5 0 0 0-.708-.706z" fill="currentColor"></path></g></svg>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>

import './option.less'
import { computed, inject, ref, unref } from 'vue'
import { SELECTOR_PROVIDE_KEY } from './selector'
import { vTitle } from '../popper'
import { OPTIONGROUP_PROVIDE_KEY } from './option-group'

defineOptions({
	name: 'WtfOption'
})

const props = withDefaults(defineProps<{
	value: boolean | number | string | object,
	label: string,
	disabled?: boolean
}>(), {})

// Dom

const optionLabelRef = ref<HTMLDivElement>()

// State

const { modelValue, optionList, isMultiple, isFilterable, keyword, hasTitle } = inject(SELECTOR_PROVIDE_KEY)!


const title = computed(() => unref(hasTitle) ? props.label : '')

const { isDisabled: isGroupDisabled } = inject(OPTIONGROUP_PROVIDE_KEY, { isDisabled: ref(false) })

const isActive = computed(() => {
	if(!unref(isMultiple)) {
		return unref(modelValue) === props.value
	} else if(unref(modelValue)) {
		return (unref(modelValue) as any[]).includes(props.value)
	}
	return false
})

const isDisabled = ref(unref(isGroupDisabled) || props.disabled)

optionList.value.push({ value: ref(props.value), label: ref(props.label), checked: isActive })

// Class & Style

const classList = computed(() => [
	'wtf-option',
	isActive.value ? 'wtf-option--is-active' : '',
	isDisabled.value ? 'wtf-option--is-disabled' : ''
])

const styleList = computed(() => ({
	display: unref(isFilterable) && unref(keyword) !== undefined && !props.label?.includes(unref(keyword)) ? 'none' : ''
}))

// Function

function onClick() {
	if(!unref(isDisabled)) {
		if(!unref(isMultiple)) {
			modelValue.value = props.value
		} else if(Array.isArray(modelValue.value)) {
			if(modelValue.value.includes(props.value)) {
				modelValue.value = modelValue.value.filter(item => item !== props.value)
			} else {
				modelValue.value.push(props.value)
			}
		}
	}
}

</script>