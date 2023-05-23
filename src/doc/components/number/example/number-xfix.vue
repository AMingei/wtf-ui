<template>
	<wtf-space width="50%" vertical>
		<wtf-number style="flex: auto" v-model="val_1" precision="2" prefix="$" />
		<wtf-number style="flex: auto" v-model="val_2" precision="2" suffix="yuan" />
		<wtf-number style="flex: auto" v-model="val_3" precision="2" suffix="%" auto-fit />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val_1 = ref(2.05)
const val_2 = ref(2.05 * 6.8883)
const val_3 = ref(50)
</script>