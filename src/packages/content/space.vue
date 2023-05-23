<template>
	<wtf-content space
	:vertical="props.vertical"
	:style="props.vertical ? { justifyContent: 'center' } : { alignItems: 'center' }">
		<slot></slot>
	</wtf-content>
</template>

<style lang="less" scoped>
</style>

<script lang="ts" setup>
defineOptions({
	name: 'WtfSpace'
})

const props = withDefaults(defineProps<{
	vertical?: boolean
}>(), {})
</script>