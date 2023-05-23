<template>
	<wtf-popper ref="popper"
	:trigger-mode="computedTriggerMode"
	:show-delay="showDelay"
	:hide-delay="hideDelay"
	:auto-hide-delay="autoHideDelay">
		<wtf-popper-trigger>
			<slot></slot>
		</wtf-popper-trigger>
		<wtf-popper-content
		:placement="placement"
		:skidding="skidding"
		:distance="distance"
		:teleported="teleported"
		:teleport-to="teleportTo"
		:transition="transition"
		:enterable="enterable">
			<div class="wtf-tooltip-content">
				<span v-if="asRaw" v-html="title"></span>
				<span v-else>{{ title }}</span>
			</div>
		</wtf-popper-content>
	</wtf-popper>
</template>

<script lang="ts" setup>

import './tooltip.less'

import WtfPopper from './popper.vue'
import WtfPopperTrigger from './popper-trigger.vue'
import WtfPopperContent from './popper-content.vue'
import { Placement } from '@popperjs/core'
import { computed, onMounted, ref, watch } from 'vue'
import { TPopperTriggerMode } from './popper'

defineOptions({
	name: 'WtfTooltip'
})

type TToolTipContentProps = {
	title: string,
	asRaw?: boolean,
	isShown?: boolean,
	// TPopperProps
	triggerMode?: TPopperTriggerMode,
	showDelay?: number,
	hideDelay?: number,
	autoHideDelay?: number,
	// TPopperContentProps
	placement?: Placement,
	skidding?: number,
	distance?: number,
	teleported?: boolean,
	teleportTo?: string,
	transition?: string,
	enterable?: boolean,
	// contentClass?: string,
}

const props = withDefaults(defineProps<TToolTipContentProps>(), {
	isShown: undefined,
	triggerMode: 'hover',
	showDelay: 0,
	hideDelay: 200,
	autoHideDelay: 0,
	placement: 'top',
	skidding: 0,
	distance: .5 * parseFloat(window.getComputedStyle(document.body).fontSize),
	teleported: true
})

// 受控模式

const isControlled = computed(() => typeof props.isShown === 'boolean')

const computedTriggerMode = computed(() => 
	isControlled.value ? 'none' : props.triggerMode
)

const popper = ref<InstanceType<typeof WtfPopper> | null>()

onMounted(() => {
	watch(() => props.isShown, (val) => {
		if(isControlled.value && popper.value) {
			popper.value.contentVisibility = val
		}
	}, { immediate: true })
})
</script>