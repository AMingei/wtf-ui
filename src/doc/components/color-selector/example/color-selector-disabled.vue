<template>
	<wtf-space width="290px" vertical>
		<wtf-color-selector v-model="value" disabled />
		<wtf-color-selector v-model="value" readonly />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref('FF00FF')

</script>