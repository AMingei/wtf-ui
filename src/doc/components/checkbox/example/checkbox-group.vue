<template>
	<wtf-checkbox-group name="example-group" v-model="currentValue" :value="defaultValue">
		<wtf-space>
			<wtf-checkbox value="魏国">魏国</wtf-checkbox>
			<wtf-checkbox value="蜀国">蜀国</wtf-checkbox>
			<wtf-checkbox value="吴国">吴国</wtf-checkbox>
			{{ currentValue }}
		</wtf-space>
	</wtf-checkbox-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const defaultValue = ['魏国']
const currentValue = ref(defaultValue)
</script>