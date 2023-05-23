<template>
	<wtf-space width="50%">
		<wtf-number v-model="minVal" style="width: 20%" />
		≤
		<wtf-number style="flex: auto" v-model="val" :range="[minVal, maxVal]" controller />
		≤
		<wtf-number v-model="maxVal" style="width: 20%" />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const minVal = ref<number>(-Infinity)
const maxVal = ref<number>(Infinity)
const val = ref<number>()
</script>