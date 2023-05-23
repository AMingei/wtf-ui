<template>
	<wtf-space width="50%" vertical>
		<wtf-number ref="input" v-model="currentValue" :value="defaultValue" />
		<wtf-space>
			<button @click="input.focus">focus</button>
			<button tabindex="-1" @click="input.focusout" @mousedown.prevent @keydown.prevent>focusout</button>
			<button @click="input.decrease">decrease</button>
			<button @click="input.increase">increase</button>
			<button @click="input.reset">reset</button>
			<button @click="input.select">select</button>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref()
const defaultValue = 1250
const currentValue = ref(defaultValue)
</script>