<template>
	<wtf-space width="290px" vertical>
		<wtf-slider v-model="value_1" disabled />
		<wtf-slider v-model="value_2" readonly />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value_1 = ref(20)
const value_2 = ref(20)

</script>