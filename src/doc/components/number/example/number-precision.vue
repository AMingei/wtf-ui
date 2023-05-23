<template>
	<wtf-space width="50%">		
		<label for="example-precision-1">精度</label>
		<wtf-number id="example-step-1" v-model="precision" style="width: 20%" />
		<wtf-number v-model="val" :precision="precision" controller style="flex: auto"  />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref<number>()
const precision = ref<number>(2)
</script>