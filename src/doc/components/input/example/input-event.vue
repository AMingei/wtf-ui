<template>
	<wtf-space width="50%">
		<label for="example-6">事件触发</label>
		<wtf-input id="example-6"
		style="flex: auto"
		resetable
		@focus="focus"
		@focusout="focusout"
		@input="input"
		@change="change"
		@before-reset="beforeReset"
		@reset="reset" />
	</wtf-space>
	<span style="display: inline-block">{{ state }}</span>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'

const state: Ref<string[]> = ref([])

function focus() {
	state.value.push('focus')
}
function focusout() {
	state.value.push('focusout')
}
function input(value: string | undefined) {
	state.value.push(`input ${value}`)
}
function change(value: string | undefined) {
	state.value.push(`change ${value}`)
}
function beforeReset(value: string | undefined) {
	state.value.push(`before-clear ${value}`)
}
function reset() {
	state.value.push('clear')
}
</script>