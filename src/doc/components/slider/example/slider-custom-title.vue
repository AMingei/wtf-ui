<template>
	<wtf-space width="290px">
		<wtf-slider v-model="value" step="0.5" min="0" max="100" :marks="marks" :title-function="titleFunc" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(36.5)

const marks = [
	{ value: 0, label: '0°C' },
	{ value: 100, label: '100°C' }
]

const titleFunc = (val: number) => {
	return `${val.toFixed(2)} °C<br />= ${(val * 1.8 + 32).toFixed(2)} °F<br />= ${(val + 273.15).toFixed(2)} K`
}

</script>