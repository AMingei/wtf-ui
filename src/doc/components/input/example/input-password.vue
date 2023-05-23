<template>
	<wtf-space width="50%" vertical>
		<wtf-input type="password" placeholder="PASSWORD" v-model="val" />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref()
</script>