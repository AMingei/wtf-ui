<template>
	<wtf-space width="50%" vertical>
		<wtf-input placeholder="input sth. and clear it!" resetable />
		<wtf-input :value="defaultVal" v-model="currentVal" resetable />
		<span style="height: 1.5em; padding-left: .5em;">{{ currentVal }}</span>
	</wtf-space>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const defaultVal = 'input sth. and reset it!'
const currentVal = ref(defaultVal)
</script>