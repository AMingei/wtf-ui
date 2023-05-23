<template>
	<div :class="classList">
		<div
		:class="labelClass"
		:style="labelStyle">
			<component :is="tagName" :for="props.for">{{ props.label }}</component>
		</div>
		<div ref="content"
		:class="inputClass"
		:style="inputStyle"
		:path="props.path">
			<div v-if="isContainer"
			:class="`wtf-form-container--${props.inline ? 'inline' : 'block'}`">
				<slot></slot>
			</div>
			<template v-else>
				<slot></slot>
			</template>
			<div v-if="!isPassed"
			tabindex="-1"
			:class="inputMessageClass"
			@focus="userFocus">
				<!-- <template v-if="!props.feedback.isJudging && props.feedback.isPassed">
					<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" fill="currentColor"></path></svg>
				</template> -->
				<!-- <template v-if="!props.feedback.isJudging"> -->
					<svg width=".85em" height=".85em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46s46-20.595 46-46s-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" fill="currentColor"></path></svg>
				<!-- </template>
				<template v-else>
					<div class="spinner">
						<div v-for="item in new Array(2)" class="circle-container">
							<div v-for="item in new Array(4)" class="circle"></div>
						</div>
					</div>
				</template> -->
				<span class="wtf-form-message-text">{{ message }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>

import './form-item.less'

import { ref, computed, onMounted, inject, watch, CSSProperties, provide } from 'vue'
import { toClassList, toStyleObject } from '../utils'

/**
 * form
 * - form-label
 * - form-input
 *   - (inline?) #slot
 *   - #slot
 *   - form-message
**/

defineOptions({
	name: 'WtfFormItem'
})

const props = withDefaults(defineProps<{
	label?: string,
	for?: string,
	path?: string,
	inline?: boolean,
	labelAlign?: 'start' | 'center' | 'end',
	inputAlign?: 'start' | 'center' | 'end',
	labelClass?: string | string[],
	labelStyle?: string | object,
	inputClass?: string | string[],
	inputStyle?: string | object,
}>(), {
	labelAlign: 'end',
	inputAlign: 'start',
})

// const emit = defineEmits([])

// DOM

const content = ref<HTMLDivElement>()

// State

const tagName = computed(() => props.for ? 'label' : 'span')
const isContainer = ref(false)
const isPassed = ref(true)
const message = ref('')

// Class

const classList = computed(() => [
	'wtf-form-item',
])

const labelClass = computed(() => [
	'wtf-form-label',
	...customLabelClass.value
])

const inputClass = computed(() => [
	'wtf-form-input',
	...customInputClass.value
])

const inputMessageClass = computed(() => [
	'wtf-form-message',
	`${isPassed.value ? '' : 'wtf-form-message--fail'}`
])

const customLabelClass = computed(() => toClassList(props.labelClass))
const customInputClass = computed(() => toClassList(props.inputClass))

// Style

const labelStyle = computed((): CSSProperties  => ({
	width: inject('labelWidth', ref()).value,
	textAlign: inject('labelAlign', ref()).value || props.labelAlign,
	...customLabelStyle.value
}))

const inputStyle = computed((): CSSProperties => ({
	textAlign: inject('inputAlign', ref()).value || props.inputAlign,
	...customInputStyle.value
}))

const customLabelStyle = computed(() => toStyleObject(props.labelStyle))
const customInputStyle = computed(() => toStyleObject(props.inputStyle))

// Function

function userFocus() {
	content.value?.querySelector('input')?.focus()
}

onMounted(() => {
	const contentDom = content.value
	isContainer.value = !!contentDom?.querySelector('.wtf-form-item')
})

// Expose

provide('path', props.path)
provide('message', (value: string | Error) => {
	isPassed.value = false
	if(typeof value === 'string') {
		message.value = value
	} else {
		message.value = value.message
	}
})
provide('passage', () => {
	isPassed.value = true
})

defineExpose({})
</script>