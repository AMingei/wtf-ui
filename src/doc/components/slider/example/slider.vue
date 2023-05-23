<template>
	<wtf-space width="290px" vertical>
		<wtf-slider v-model="value_1" />
		<wtf-slider v-model="value_2" type="primary" />
		<wtf-slider v-model="value_3" type="success" />
		<wtf-slider v-model="value_4" type="warning" />
		<wtf-slider v-model="value_5" type="error" />
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value_1 = ref(20)
const value_2 = ref(35)
const value_3 = ref(50)
const value_4 = ref(65)
const value_5 = ref(80)

</script>