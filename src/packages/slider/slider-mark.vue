<template>
	<div :class="classList"
	:style="styleList">
		<div class="wtf-slider-mark-label">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>

import { computed } from 'vue'
import './slider-mark.less'

defineOptions({
	name: 'WtfSliderMark'
})

const props = withDefaults(defineProps<{
	type: any,
	active: boolean,
	translate: number,
	vertical: boolean,
	disabled?: boolean,
	readonly?: boolean
}>(), {})

// Dom

// State

// Class & Style

const classList = computed(() => [
	'wtf-slider-mark',
	`wtf-slider-mark--type-${props.type}`,
	props.vertical ? 'wtf-slider-mark--vertical' : undefined,
	props.active ? 'wtf-slider-mark--is-active' : undefined,
	props.disabled ? 'wtf-slider-mark--is-disabled' : undefined,
	props.readonly ? 'wtf-slider-mark--is-readonly' : undefined
])

const styleList = computed(() => ({
	translate: props.vertical ? `0 ${props.translate}px` : `${props.translate}px 0`
}))

// Function

// Export

</script>