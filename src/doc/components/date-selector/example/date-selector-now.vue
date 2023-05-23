<template>
	<wtf-space width="290px" vertical>
		<wtf-date-selector v-model="date_1" turn-now />
		<wtf-date-selector v-model="date_2" turn-now :limination="limitFunc"  />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date_1 = ref(new Date())

const now = new Date()
now.setDate(now.getDate() + 1)
const date_2 = ref(now)

function limitFunc(year: number, month: number, date: number) {
	const now = new Date()
	return year === now.getFullYear() && month === now.getMonth() + 1 && date === now.getDate()
}

</script>