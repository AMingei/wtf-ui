<template>
	<wtf-space width="50%">
		事件触发
		<wtf-switch v-model="value"
		value-off="off"
		value-on="on"
		@focus="focus"
		@focusout="focusout"
		@change="change"/>
		{{ value }}
	</wtf-space>
	<span style="display: inline-block">{{ state }}</span>
</template>

<script lang="ts" setup>
import { ref, Ref } from 'vue'

const value = ref('off')
const state: Ref<string[]> = ref([])

function focus() {
	state.value.push('focus')
}
function focusout() {
	state.value.push('focusout')
}
function change(value: string | undefined) {
	state.value.push(`change ${value}`)
}
</script>