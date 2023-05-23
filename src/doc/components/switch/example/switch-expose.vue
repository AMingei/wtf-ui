<template>
	<wtf-space vertical>
		<wtf-space>
			外部触发
			<wtf-switch ref="input" v-model="value" value-off="off" value-on="on" />
			{{ value }}
		</wtf-space>
		<wtf-space>
			<button @click="input.focus">focus</button>
			<button tabindex="-1" @click="input.focusout" @mousedown.prevent @keydown.prevent>focusout</button>
			<button @click="input.toggle()">toggle</button>
			<button @click="input.toggle('on')">toggle to: on</button>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref()
const value = ref('off')
</script>