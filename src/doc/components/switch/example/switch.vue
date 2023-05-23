<template>
	<wtf-space>
		开关
		<wtf-switch v-model="cur" />
		{{ cur }}
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const cur = ref(false)
</script>