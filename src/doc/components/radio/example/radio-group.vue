<template>
	<wtf-radio-group name="example-group" v-model="currentValue" :value="defaultValue">
		<wtf-space>
			<wtf-radio value="魏国">魏国</wtf-radio>
			<wtf-radio value="蜀国">蜀国</wtf-radio>
			<wtf-radio value="吴国">吴国</wtf-radio>
			{{ currentValue }}
		</wtf-space>
	</wtf-radio-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultValue = '魏国'
const currentValue = ref(defaultValue)
</script>