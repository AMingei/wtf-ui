<template>
	<wtf-space width="290px" vertical>
		<wtf-date-selector mode="month" />
		<wtf-date-selector mode="month" :limination="limitFunc" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date = ref(new Date())

function limitFunc(year: number, month: number, date: number) {
	return month === 5
}

</script>