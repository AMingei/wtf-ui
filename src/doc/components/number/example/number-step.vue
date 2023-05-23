<template>
	<wtf-space width="50%" style="align-items: baseline;">
		<label for="example-step-1">步长</label>
		<wtf-number id="example-step-1" v-model="step" style="width: 20%" />
		<wtf-space style="flex: auto" vertical>
			<wtf-number v-model="val_1" :step="step" controller :placeholder="`步长：${step}`" />
			<wtf-number v-model="val_2" :strict-step="step" controller :placeholder="`严格步长：${step}`" />
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val_1 = ref<number>()
const val_2 = ref<number>()
const step = ref<number>(2)
</script>