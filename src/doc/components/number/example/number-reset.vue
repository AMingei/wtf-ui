<template>
	<wtf-space width="50%" vertical>
		<wtf-number v-model="currentVal_1" placeholder="please input sth. and clear it!" resetable />
		<wtf-number :value="defaultVal" v-model="currentVal_2" placeholder="And this will reset to 123." resetable />
	</wtf-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const defaultVal = 123
const currentVal_1 = ref()
const currentVal_2 = ref()
</script>