<template>
	<wtf-space width="290px">
		<wtf-color-selector v-model="value" alpha :pre-pallete="['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#00000066']" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('FF00FFFF')

</script>