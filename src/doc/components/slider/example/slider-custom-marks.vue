<template>
	<wtf-space width="290px">
		<wtf-slider v-model="value" max="10" step="2" :marks="marks" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(2)
const marks = [
	{ value: 2, label: '20%' },
	{ value: 8, label: '80%' },
	{ value: 10, label: '100%' }
]

</script>