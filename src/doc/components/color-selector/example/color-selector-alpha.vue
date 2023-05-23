<template>
	<wtf-space width="290px">
		<wtf-color-selector v-model="value" alpha />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('FF00FF66')

</script>