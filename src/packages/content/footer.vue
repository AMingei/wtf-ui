<template>
	<wtf-content tag-name="footer"
	class="wtf-content-footer"
	:style="styleList">
		<slot></slot>
	</wtf-content>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
	name: 'WtfFooter'
})

const props = withDefaults(defineProps<{
	height?: string
}>(), {})

const styleList = ref({
	height: props.height,
	flex: props.height ? 'none' : undefined
})
</script>