<template>
	<div :class="['wtf-divider', styleClass]">
		<div class="wtf-divided-rule"
		:style="styleList"></div>
		<div ref="dividerText"
		class="wtf-divider-text">
			<slot></slot>
		</div>
		<div class="wtf-divided-rule"
		:style="styleList"></div>
	</div>
</template>

<script lang="ts" setup>
import { BorderColorProperty, BorderStyleProperty } from 'csstype'
import { ref, computed, onMounted } from 'vue'

defineOptions({
	name: 'WtfD'
})

const props = withDefaults(defineProps<{
	textFloat?: 'left' | 'center' | 'right',
	lineColor?: BorderColorProperty,
	lineStyle?: BorderStyleProperty
}>(), {
	textFloat: 'center'
})

const dividerText = ref()

const styleClass = computed(() => props.textFloat ? `wtf-divider--${props.textFloat}` : '')
const styleList = ref({
	borderTop: `${(props.lineStyle === 'dotted' || props.lineStyle === 'double') ? 3 : 1}px ${props.lineStyle || 'solid'} ${props.lineColor || 'currentColor'}`
})

onMounted(() => {
	const dividerTextDom = dividerText.value as unknown as HTMLElement
	if(dividerTextDom.innerHTML) {
		dividerTextDom.style.padding = '0 .6em'
	}
})
</script>

<style lang="less" scoped>
@wtf: .wtf-divider;
@{wtf} {
	box-sizing: border-box;
	width: 100%;
	height: 1.5em;
	display: flex;
	align-items: center;
	.wtf-divider-text {
		box-sizing: border-box;
		flex-shrink: 0;
		user-select: none;
	}
	.wtf-divided-rule {
		box-sizing: border-box;
		width: 100%;
		border-top: 1px solid currentColor;
		display: inline-block;
	}
	&--left .wtf-divided-rule:first-child {
		width: .8em;
		flex-shrink: 0;
	}
	&--right .wtf-divided-rule:last-child {
		width: .8em;
		flex-shrink: 0;
	}
}
</style>