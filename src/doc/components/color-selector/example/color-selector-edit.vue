<template>
	<wtf-space width="290px">
		<wtf-color-selector v-model="value" alpha :pre-pallete="list" editable />
	</wtf-space>
</template>

<script lang="ts" setup>

import { reactive, ref } from 'vue'

const value = ref('FF00FFFF')
const list = reactive(['#FFFFFF', '#FF0000', '#00FF00', '#0000FF', '#00000066'])

</script>