<template>
	<component ref="gridItem"
	:is="tagName"
	:class="classList"
	:span="span"
	:style="`width: ${hasWidth ? props.width : ''}; height: ${hasHeight ? props.height : ''};`">
		<div class="absolute-box">
			<slot></slot>
		</div>
	</component>
</template>
<style lang="less" scoped>
@wtf: .wtf-grid-item;
@{wtf} {
	box-sizing: border-box;
	position: relative;
	.absolute-box {
		position: relative;
		inset: 0;
		overflow: hidden;
	}
	&.wtf-grid-content { grid-area: c }
	&.wtf-grid-header { grid-area: t }
	&.wtf-grid-left { grid-area: l }
	&.wtf-grid-right { grid-area: r }
	&.wtf-grid-footer { grid-area: b }
}
</style>

<script lang="ts" setup>
import { computed } from 'vue'

defineOptions({
	name: 'WtfGridItem'
})

type GridItemSpan = 'start' | 'center' | 'end' | 'all'

const props = withDefaults(defineProps<{
	header?: boolean,
	left?: boolean,
	right?: boolean,
	footer?: boolean,
	content?: boolean,
	span?: GridItemSpan,
	width?: string,
	height?: string
}>(), {})

const location = computed(() => props.header ? 'header' : props.left ? 'left' : props.right ? 'right' : props.footer ? 'footer' : 'content')
const hasWidth = computed(() => location.value === 'left' || location.value === 'right')
const hasHeight = computed(() => location.value === 'header' || location.value === 'footer')
const tagName = computed(() => {
	return location.value == 'content' ? 'section' : location.value === 'left' || location.value === 'right' ? 'aside' : location.value
})

const classList = computed(() => [
	'wtf-grid-item',
	location.value ? `wtf-grid-${location.value}` : ''
])
</script>