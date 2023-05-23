<template>
	<wtf-space width="290px">
		<wtf-date-selector />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const date = ref(new Date())

</script>