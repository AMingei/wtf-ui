<template>
	<wtf-space width="290px" vertical>
		<wtf-slider v-model="value" max="10" step="2" marks="step" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(4)

</script>