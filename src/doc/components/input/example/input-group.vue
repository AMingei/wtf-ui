<template>
	<wtf-space style="align-items: baseline;" width="50%">
		<label for="example-1">文本输入</label>
		<wtf-space style="flex: auto" vertical>
			<wtf-input-group>
				<wtf-input id="example-1" placeholder="Please input something..." v-model="val" />
				<wtf-input id="example-2" placeholder="Please input something..." v-model="val" />
				<wtf-input id="example-3" placeholder="Please input something..." v-model="val" />
			</wtf-input-group>
			<span style="height: 1.5em; padding-left: .5em;">{{ val }}</span>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const val = ref()
</script>