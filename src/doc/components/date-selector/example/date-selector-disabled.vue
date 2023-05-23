<template>
	<wtf-space width="290px" vertical>
		<wtf-date-selector v-model="date" disabled />
		<wtf-date-selector v-model="date" readonly />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date = ref(new Date())

</script>