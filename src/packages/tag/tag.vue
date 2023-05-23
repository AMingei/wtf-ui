<template>
	<div :class="classList"
	@click="onClick">
		<template v-if="isEditing">
			<input ref="tagInputRef"
			v-model="inputValue"
			class="wtf-tag-input"
			@blur="onBlur"
			@keydown.enter="onBlur" />
			<div ref="tagInputFakeRef"
			class="wtf-tag-input-fake">{{ inputValue }}</div>
		</template>
		<template v-else>
			<div v-if="$slots.icon || editable"
			class="wtf-tag-icon">
				<slot name="icon">
					<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>
				</slot>
			</div>
			<div v-if="$slots.default"
			class="wtf-tag-label">
				<slot></slot>
			</div>
			<div v-if="closable && !editable"
			class="wtf-tag-x"
			@click="$emit('close')">
				<svg width="1.35em" height="1.35em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
			</div>
		</template>
	</div>
</template>

<script lang="ts" setup>

import './tag.less'
import { computed, nextTick, ref, unref, watch } from 'vue'

defineOptions({
	name: 'WtfTag'
})

const props = withDefaults(defineProps<{
	type?: 'normal' | 'primary' | 'success' | 'warning' | 'error',
	border?: 'none' | 'hover' | 'always',
	closable?: boolean,
	round?: boolean,
	editable?: boolean
}>(), {
	type: 'normal',
	border: 'always'
})

const emit = defineEmits(['insert', 'close'])

// Dom

const tagInputRef = ref<HTMLInputElement>()
const tagInputFakeRef = ref<HTMLDivElement>()

// State

const isEditing = ref<boolean>(false)
const inputValue = ref<string>()

watch(() => inputValue.value, () => {
	if(unref(tagInputRef)) {
		tagInputRef.value!.style.width = unref(tagInputFakeRef)!.getBoundingClientRect().width + 'px'
	}
}, { flush: 'post' })

// Class & Style

const classList = computed(() => [
	'wtf-tag',
	`wtf-tag--type-${props.type}`,
	`wtf-tag--border-${props.border}`,
	props.round ? 'wtf-tag--is-round' : '',
	props.editable ? unref(isEditing) ? 'wtf-tag--is-editing' : 'wtf-tag--is-editable' : ''
])

// Function

function onClick() {
	if(props.editable && !unref(isEditing)) {
		isEditing.value = true
		nextTick(() => unref(tagInputRef)!.focus())
	}
}

function onBlur() {
	isEditing.value = false
	if(unref(inputValue)?.trim()) {
		emit('insert', unref(inputValue))
	}
	inputValue.value = undefined
}

// Export

</script>