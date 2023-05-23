<template>
	<wtf-space width="290px" vertical>
		<wtf-slider v-model="value" max="100" step="20" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(40)

</script>