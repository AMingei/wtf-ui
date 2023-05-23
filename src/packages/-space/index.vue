<template>
	<div ref="space"
	class="wtf-space">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
@wtf: .wtf-space;
@{wtf} {
	max-width: 100%;
	font-size: 1rem;
	display: inline-flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	gap: .5em 1em;
}
</style>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

defineOptions({
	name: 'WtfSpace'
})

const props = withDefaults(defineProps<{
	direction?: string
}>(), {
	direction: 'row'
})

const space = ref(null)

onMounted(() => {
	const spaceDom = space.value as unknown as HTMLElement
	spaceDom.style.flexDirection = props.direction
})
</script>