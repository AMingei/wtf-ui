<template>
	<wtf-content tag-name="header"
	class="wtf-content-header"
	:style="styleList">
		<slot></slot>
	</wtf-content>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
	name: 'WtfHeader'
})

const props = withDefaults(defineProps<{
	height?: string
}>(), {})

const styleList = ref({
	height: props.height,
	flex: props.height ? 'none' : undefined
})
</script>