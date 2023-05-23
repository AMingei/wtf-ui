<template>
	<wtf-space width="290px">
		<wtf-color-selector v-model="value" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('FF00FF')

</script>