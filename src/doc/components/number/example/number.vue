<template>
	<wtf-space style="align-items: baseline;" width="50%">
		<label for="example-1">数字输入</label>
		<wtf-space style="flex: auto" vertical>
			<wtf-number id="example-1" placeholder="Please input number..." v-model="val" />
			<span style="height: 1.5em; padding-left: .5em;">{{ val }}</span>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref<number>()
</script>