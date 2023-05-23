<template>
	<div :class="classList">
		<div v-if="$slots.prefix || props.prefix"
		:class="prefixClass"
		:style="prefixStyle"
		@mousedown.prevent>
			<slot name="prefix">{{ props.prefix }}</slot>
		</div>

		<input v-if="tag === 'input'"
		v-model="modelValue"
		ref="input"
		:id="props.id"
		:class="contentClass"
		:style="contentStyle"
		:type="type"
		:form="props.form"
		:name="props.name"
		:placeholder="props.placeholder"
		:disabled="isDisabled"
		:readonly="isReadonly"
		@focusin="userFocusIn"
		@focusout="userFocusOut"
		@input="userInput(modelValue)"
		@change="userChange(modelValue)"
		@keydown.enter="userEnter" />

		<textarea v-else-if="tag === 'textarea'"
		v-model="modelValue"
		ref="input"
		:id="props.id"
		:class="contentClass"
		:style="contentStyle"
		:form="props.form"
		:name="props.name"
		:placeholder="props.placeholder"
		:required="!'isRequired'"
		:pattern="!'pattern?.source'"
		:disabled="isDisabled"
		:readonly="isReadonly"
		@focusin="userFocusIn"
		@focusout="userFocusOut"
		@input="userInput(modelValue)"
		@change="userChange(modelValue)"
		></textarea>

		<div v-if="!isDisabled && !isReadonly && props.resetable"
		class="wtf-input-reset"
		@mousedown.prevent>
			<svg width="1.35em" height="1.35em" @click="userReset(modelValue)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48zm86.63 272L320 342.63l-64-64l-64 64L169.37 320l64-64l-64-64L192 169.37l64 64l64-64L342.63 192l-64 64z" fill="currentColor"></path></svg>
		</div>

		<div v-if="!isDisabled && !isReadonly && props.maxLength"
		class="wtf-input-limitation"
		@mousedown.prevent>
			<span class="wtf-input-limitation-text">{{ limitationText }}</span>
		</div>

		<div v-if="$slots.suffix || props.suffix || props.type === 'password'"
		:class="suffixClass"
		:style="suffixStyle"
		@mousedown.prevent>
			<template v-if="props.type === 'password'">
				<svg v-show="!isVisible" width="1.15em" height="1.15em"
				@click="togglePassword(undefined)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><circle cx="256" cy="256" r="64" fill="currentColor"></circle><path d="M490.84 238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.66 96c-42.52 0-84.33 12.15-124.27 36.11c-40.73 24.43-77.63 60.12-109.68 106.07a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.4 76.14 98.28 100.65C162 402 207.9 416 255.66 416c46.71 0 93.81-14.43 136.2-41.72c38.46-24.77 72.72-59.66 99.08-100.92a32.2 32.2 0 0 0-.1-34.76zM256 352a96 96 0 1 1 96-96a96.11 96.11 0 0 1-96 96z" fill="currentColor"></path></svg>
				<svg v-show="isVisible" width="1.15em" height="1.15em"
				@click="togglePassword(undefined)" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M432 448a15.92 15.92 0 0 1-11.31-4.69l-352-352a16 16 0 0 1 22.62-22.62l352 352A16 16 0 0 1 432 448z" fill="currentColor"></path><path d="M248 315.85l-51.79-51.79a2 2 0 0 0-3.39 1.69a64.11 64.11 0 0 0 53.49 53.49a2 2 0 0 0 1.69-3.39z" fill="currentColor"></path><path d="M264 196.15L315.87 248a2 2 0 0 0 3.4-1.69a64.13 64.13 0 0 0-53.55-53.55a2 2 0 0 0-1.72 3.39z" fill="currentColor"></path><path d="M491 273.36a32.2 32.2 0 0 0-.1-34.76c-26.46-40.92-60.79-75.68-99.27-100.53C349 110.55 302 96 255.68 96a226.54 226.54 0 0 0-71.82 11.79a4 4 0 0 0-1.56 6.63l47.24 47.24a4 4 0 0 0 3.82 1.05a96 96 0 0 1 116 116a4 4 0 0 0 1.05 3.81l67.95 68a4 4 0 0 0 5.4.24a343.81 343.81 0 0 0 67.24-77.4z" fill="currentColor"></path><path d="M256 352a96 96 0 0 1-93.3-118.63a4 4 0 0 0-1.05-3.81l-66.84-66.87a4 4 0 0 0-5.41-.23c-24.39 20.81-47 46.13-67.67 75.72a31.92 31.92 0 0 0-.64 35.54c26.41 41.33 60.39 76.14 98.28 100.65C162.06 402 207.92 416 255.68 416a238.22 238.22 0 0 0 72.64-11.55a4 4 0 0 0 1.61-6.64l-47.47-47.46a4 4 0 0 0-3.81-1.05A96 96 0 0 1 256 352z" fill="currentColor"></path></svg>
			</template>
			<template v-else>
				<slot name="suffix">{{ props.suffix }}</slot>
			</template>
		</div>

		<div v-if="!isDisabled && tag === 'textarea'"
		ref="inputResizer"
		class="wtf-input-resizer">
			<svg width="1.25em" weight="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="m15.85,3.85l1.45,1.45l-2.18,2.16c-0.39,0.39 -0.39,1.03 0,1.42c0.39,0.39 1.03,0.39 1.42,0l2.16,-2.18l1.45,1.45a0.5,0.5 0 0 0 0.85,-0.36l0,-4.29c0,-0.28 -0.22,-0.5 -0.5,-0.5l-4.29,0a0.5,0.5 0 0 0 -0.36,0.85zm-7.7,16.3l-1.45,-1.45l2.18,-2.16c0.39,-0.39 0.39,-1.03 0,-1.42c-0.39,-0.39 -1.03,-0.39 -1.42,0l-2.16,2.18l-1.45,-1.45a0.5,0.5 0 0 0 -0.85,0.36l0,4.29c0,0.28 0.22,0.5 0.5,0.5l4.29,0a0.5,0.5 0 0 0 0.36,-0.85zm12,-4.3l-1.45,1.45l-2.16,-2.18c-0.39,-0.39 -1.03,-0.39 -1.42,0c-0.39,0.39 -0.39,1.03 0,1.42l2.18,2.16l-1.45,1.45a0.5,0.5 0 0 0 0.36,0.85l4.29,0c0.28,0 0.5,-0.22 0.5,-0.5l0,-4.29a0.5,0.5 0 0 0 -0.85,-0.36z" fill="currentColor"></path></svg>
		</div>
	</div>
</template>
<!-- <div v-if="isRequired || props.pattern"
		v-show="!isVertified"
		class="wtf-input-vertify"
		:title="vertifyText">
			<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M10 2a8 8 0 1 1-3.613 15.14l-.121-.065l-3.645.91a.5.5 0 0 1-.62-.441v-.082l.014-.083l.91-3.644l-.063-.12a7.95 7.95 0 0 1-.83-2.887l-.025-.382L2 10a8 8 0 0 1 8-8zm0 3.5a.5.5 0 0 0-.5.5v5.5a.5.5 0 0 0 1 0V6a.5.5 0 0 0-.5-.5zm0 9a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5z" fill="currentColor"></path></g></svg>
		</div>
		
		<div v-if="props.feedback"
		v-show="props.feedback.isShown"
		:class="feedbackClass">
			<template v-if="!props.feedback.isJudging && props.feedback.isPassed">
				<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" fill="currentColor"></path></svg>
			</template>
			<template v-else-if="!props.feedback.isJudging">
				<svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 0 1 0-96a48.01 48.01 0 0 1 0 96z" fill="currentColor"></path></svg>
			</template>
			<template v-else>
				<div class="spinner">
					<div v-for="item in new Array(2)" class="circle-container">
						<div v-for="item in new Array(4)" class="circle"></div>
					</div>
				</div>
			</template>
			<span class="wtf-input-feedback-text">{{ feedbackText }}</span>
		</div> -->
<script lang="ts" setup>

import './input.less'

import { toClassList, toStyleObject } from '../utils'
import { ref, computed, onMounted, CSSProperties, inject, watch } from 'vue'
import { VertifyInfo } from '../utils'

/**
 * input
 * - input-box
 *   - input-prefix #prefix
 *   - input-content
 *   - input-reset
 *   - input-limitation
 *   - input-suffix #suffix
 *   - input-resizer
//  * - input-feedback
//  *   - svg
//  *   - input-feedback-text
//  * - input-vertify
//  *   - svg
**/

defineOptions({
	name: 'WtfInput'
})

/*type TFeedback = {
	isShown: boolean,
	isPassed: boolean,
	isJudging?: boolean,
	content: {
		pass?: string,
		fail?: string,
		judge?: string
	}
}*/

const props = withDefaults(defineProps<{
	id?: string,
	value?: string,
	modelValue?: string,
	type?: 'text' | 'textarea' | 'password',
	size?: 'smallest' | 'smaller' | 'normal' | 'larger' | 'largest',
	placeholder?: string,
	name?: string,
	form?: string,
	// pattern?: 'tel' | 'email' | 'url' | string | RegExp,
	// vertifyText?: string,
	// required?: boolean,
	readonly?: boolean,
	disabled?: boolean,
	resetable?: boolean,
	// feedback?: TFeedback,
	maxLength?: number | string,
	spaceValid?: boolean,
	autocomplete?: string,
	autofocus?: boolean,
	prefix?: string,
	prefixClass?: string | string[],
	prefixStyle?: string | object,
	suffix?: string,
	suffixClass?: string | string[],
	suffixStyle?: string | object,
	contentClass?: string | string[],
	contentStyle?: string | object
}>(), {
	type: 'text',
	spaceValid: false
})

const emit = defineEmits(['update:modelValue', 'focus', 'focusout', 'input', 'change', 'before-reset', 'reset'])

// DOM

const input = ref<HTMLInputElement>()
const dom = computed(() => input.value)

const inputResizer = ref<HTMLElement>()

// State

const tag = computed(() => 
	props.type && props.type === 'textarea' ? 'textarea' : 'input'
)

const type = computed(() => 
	props.type !== 'password' ? props.type : 
		isVisible.value ? 'text' : props.type
)

// 暂时保存 modelValue 以防止用户没有设置 v-model
const tempModelValue = ref()

const modelValue = computed({
	get: () => props.modelValue || tempModelValue.value,
	set: (val: string | undefined) => {
		tempModelValue.value = val
		emit('update:modelValue', val)
	}
})

const maxLength = computed(() => 
	typeof props.maxLength === 'string' ? parseInt(props.maxLength) : 
		typeof props.maxLength === 'number' ? props.maxLength : undefined
)
// 组合字符（注音符号、组合emoji）将会被识别为若干字符组合
const currentLength = computed(() => {
	let tempList = []
	if(typeof tempModelValue.value === 'string') {
		for(let item of tempModelValue.value) {
			if(maxLength.value && tempList.length < maxLength.value) {
				tempList.push(item)
			}
		}
	}
	modelValue.value = tempList.join('')
	return tempList.length
})
const limitationText = computed(() => 
	`${currentLength.value} / ${maxLength.value}`
)

const isVisible = ref(false)
const isDisabled = ref(props.disabled)
const isReadonly = ref(props.readonly)
const isFocused = ref(false)
const isPassed = ref(true)

const path = inject('path', '')
const messageTrigger: Function = inject('message', () => {})
const passageTrigger: Function = inject('passage', () => {})
const vertifyInfo: VertifyInfo | undefined = inject('vertifyInfo', undefined)
const vertifyRules = computed(() => vertifyInfo !== undefined ? (vertifyInfo as VertifyInfo).find(item => item.path === path)?.rules : undefined)

watch(vertifyRules, (value) => {
	vertify()
}, {
	deep: true
})

// Class

const classList = computed(() => [
	'wtf-input',
	`${(props.size && props.size !== 'normal') ? 'wtf-input--' + props.size : '' }`, // size
	`${isDisabled.value ? 'disabled' : ''}`, // disable
	`${isReadonly.value ? 'readonly' : ''}`, // disable
	`${isFocused.value ? 'focus-visible' : ''}`, // focus-visible
	`${props.type !== 'text' ? 'wtf-input-box--' + props.type : ''}`
])

const prefixClass = computed(() => [
	'wtf-input-prefix',
	...customPrefixClass.value
])
const suffixClass = computed(() => [
	'wtf-input-suffix',
	`${props.type === 'password' ? 'wtf-input-password-box' : ''}`,
	...customSuffixClass.value
])
const contentClass = computed(() => [
	'wtf-input-content',
	...customContentClass.value
])

const customPrefixClass = computed(() => toClassList(props.prefixClass))
const customSuffixClass = computed(() => toClassList(props.suffixClass))
const customContentClass = computed(() => toClassList(props.contentClass))

// Style

const prefixStyle = computed((): CSSProperties => ({ ...customPrefixStyle.value }))
const suffixStyle = computed((): CSSProperties => ({ ...customSuffixStyle.value }))
const contentStyle = computed((): CSSProperties => ({ ...customContentStyle.value }))

const customPrefixStyle = computed(() => toStyleObject(props.prefixStyle))
const customSuffixStyle = computed(() => toStyleObject(props.suffixStyle))
const customContentStyle = computed(() => toStyleObject(props.contentStyle))

// Function

function vertify(listener?: string) {
	isPassed.value = true
	if(vertifyRules.value) {
		for(let rule of vertifyRules.value) {
			if(!listener || listener && rule.listener.includes(listener)) {
				if(rule.required && !props.modelValue) {
					messageTrigger(rule.message)
				} else if(rule.pattern && (new RegExp(rule.pattern)).test(props.modelValue || '')) {
					messageTrigger(rule.message)
				} else if(rule.custom) {
					try {
						if(!rule.custom(props.modelValue)) {
							messageTrigger(rule.message)
						} else {
							continue
						}
					} catch(error) {
						messageTrigger(error)
					}
				} else {
					continue
				}
				isPassed.value = false
				break
			}
		}
		if(isPassed.value) {
			passageTrigger()
		}
	}
}

function userFocusIn(event: FocusEvent) {
	isFocused.value = true
	emit('focus', event)
}
function userFocusOut(event: FocusEvent) {
	isFocused.value = false
	if(!props.spaceValid) {
		modelValue.value = modelValue.value?.trim()
	}
	emit('focusout', event)
	vertify('focusout')
}
function userInput(value: string | undefined) {
	emit('input', value)
	vertify('input')
}
function userReset(value: string | undefined) {
	if(value != props.value) {
		emit('before-reset', value)
		modelValue.value = props.value
		emit('reset', modelValue.value)
	}
}
function userChange(value: string | undefined ) {
	emit('change', value)
	vertify('change')
}

function select(from?: number, to?: number) {
	if(typeof from === 'number' && typeof to === 'number') {
		dom.value?.focus()
		dom.value?.setSelectionRange(from, to)
	} else {
		dom.value?.select()
	}
}

function togglePassword(state?: boolean) {
	if(typeof state === 'boolean') {
		isVisible.value = state
	} else {
		isVisible.value = !isVisible.value
	}
}

function userEnter() {
	input.value?.blur()
}

onMounted(() => {

	modelValue.value = props.value

	const inputDom = input.value as unknown as HTMLElement
	const inputResizerDom = inputResizer.value as unknown as HTMLElement
	if(inputResizerDom) {
		inputResizerDom.onmousedown = (event) => {
			let startLocation = event.y
			function mouseMove(event: MouseEvent) {
				const deltaLocation = event.y - startLocation
				startLocation = event.y
				inputDom.style.height = inputDom.clientHeight + deltaLocation + 'px'
			}
			function mouseUp() {
				document.removeEventListener('mousemove', mouseMove)
				document.removeEventListener('mouseup', mouseUp)
			}
			document.addEventListener('mousemove', mouseMove)
			document.addEventListener('mouseup', mouseUp)
			event.preventDefault()
		}
	}
})


// Expose

defineExpose({
	dom,
	focus: () => dom.value?.focus(),
	focusout: () => dom.value?.blur(),
	reset: () => userReset(modelValue.value),
	select,
	scrollTo: (posX: number, posY: number = 0) => dom.value?.scrollTo(posX, posY),
	scrollBy: (delX: number, delY: number = 0) => dom.value?.scrollBy(delX, delY),
	togglePassword
})
</script>