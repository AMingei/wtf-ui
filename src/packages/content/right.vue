<template>
	<wtf-content tag-name="aside"
	class="wtf-content-right"
	:style="styleList">
		<slot></slot>
	</wtf-content>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
	name: 'WtfRight'
})

const props = withDefaults(defineProps<{
	width?: string
}>(), {})

const styleList = ref({
	width: props.width,
	flex: props.width ? 'none' : undefined
})
</script>