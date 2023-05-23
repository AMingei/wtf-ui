<template>
	<wtf-space width="50%" vertical>
		<wtf-number v-model="val" controller controller-justify="start" />
		<wtf-number v-model="val" controller controller-justify="between" />
		<wtf-number v-model="val" controller controller-justify="end" />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref<number>(12)
</script>