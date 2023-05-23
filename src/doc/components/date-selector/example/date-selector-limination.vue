<template>
	<wtf-space width="290px">
		<wtf-date-selector v-model="date" :limination="limitFunc" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date = ref(new Date())

function limitFunc(year: number, month: number, date: number) {
	return date < 15
}
</script>