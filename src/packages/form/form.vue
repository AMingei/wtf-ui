<template>
	<form ref="form"
	class="wtf-form"
	@submit.prevent="submit($event, props.value, props.vertify)">
		<slot></slot>
	</form>
</template>

<script lang="ts" setup>

import './form.less'

import { ref, computed, provide, reactive, nextTick } from 'vue'
import { FormRules, VertifyInfo } from '../utils'

/**
 * form
**/

defineOptions({
	name: 'WtfForm'
})

const props = withDefaults(defineProps<{
	value?: Record<string, any>,
	vertify?: FormRules,
	labelWidth?: string,
	labelAlign?: 'start' | 'center' | 'end',
	inputAlign?: 'start' | 'center' | 'end',
}>(), {})

const emit = defineEmits(['submit'])

// DOM

const form = ref<HTMLInputElement>()
const dom = computed(() => form.value)

// State

const vertifyInfo = reactive<VertifyInfo>([])

// Class

const classList = computed(() => [
	'wtf-radio-input',
	// `${(props.size && props.size !== 'normal') ? 'wtf-switch-box--' + props.size : '' }`, // size
	//...customContentClass.value
])

// Style

const styleList = computed(() => {
	return {
		//...(customContentStyle.value as unknown as object)
	}
})

// Function

function vertify(ruleObj: FormRules, path: string) {
	Object.keys(ruleObj).forEach(key => {
		const currentRuleObj = ruleObj[key]
		const currentPath = path ? path + '.' + key : key
		if(Array.isArray(currentRuleObj)) {
			vertifyInfo.push({
				path: currentPath,
				rules: currentRuleObj
			})
		} else {
			vertify(currentRuleObj, currentPath)
		}
	})
}

function submit(event: Event, value?: Record<string, any>, rules?: FormRules): void {
	if(rules) {
		vertifyInfo.length = 0
		vertify(rules, '')
		nextTick(() => (dom.value?.querySelector('.wtf-form-message') as HTMLInputElement).focus())
	}
	// emit('submit', !vertifyInfo.value)
}

// Expose

provide('labelWidth', computed(() => props.labelWidth))
provide('labelAlign', computed(() => props.labelAlign))
provide('inputAlign', computed(() => props.inputAlign))
provide('vertifyInfo', vertifyInfo)

defineExpose({
	// reset:
})
</script>