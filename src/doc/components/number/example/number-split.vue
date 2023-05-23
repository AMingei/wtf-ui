<template>
	<wtf-space width="50%" vertical>
		<wtf-number style="flex: auto" v-model="val_1" precision="6" split="3 ," prefix="$" />
		<wtf-number style="flex: auto" v-model="val_2" precision="2" :split="[4,' ']" suffix="元" auto-fit />
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val_1 = ref(12000300.123)
const val_2 = ref(12000300.123)
</script>