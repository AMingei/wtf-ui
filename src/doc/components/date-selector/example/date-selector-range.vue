<template>
	<wtf-space width="290px">
		<wtf-date-selector v-model="date" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date = ref([new Date(2020, 0, 1), new Date(2020, 0, 10)])

</script>