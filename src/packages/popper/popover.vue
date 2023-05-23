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
			<div class="wtf-popover-content">
				<slot name="content"></slot>
				<div v-if="xButton"
				class="wtf-popover-x-button"
				@click="popper!.contentVisibility = false">
					<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z" fill="currentColor"></path></svg>
				</div>
				<div v-if="confirmButton || cancelButton"
				class="wtf-popover-controller">
					<button v-if="confirmButton" @click="confirm">{{ confirmButton }}</button>
					<button v-if="cancelButton" @click="cancel">{{ cancelButton }}</button>
				</div>
			</div>
		</wtf-popper-content>
	</wtf-popper>
</template>

<script lang="ts" setup>

import './popover.less'

import WtfPopper from './popper.vue'
import WtfPopperTrigger from './popper-trigger.vue'
import WtfPopperContent from './popper-content.vue'
import { Placement } from '@popperjs/core'
import { computed, ref, watch } from 'vue'
import { TPopperTriggerMode } from './popper'

defineOptions({
	name: 'WtfPopover'
})

type TToolTipContentProps = {
	asRaw?: boolean,
	isShown?: boolean,
	xButton?: boolean,
	confirmButton?: string,
	cancelButton?: string,
	// TPopperTriggerProps
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
	placement: 'top',
	isShown: undefined,
	skidding: 0,
	distance: .5 * parseFloat(window.getComputedStyle(document.body).fontSize),
	triggerMode: 'click',
	showDelay: 0,
	hideDelay: 200,
	autoHideDelay: 0,
	teleported: true,
	enterable: true
})

const emit = defineEmits(['confirm', 'cancel'])

function confirm() {
	popper.value!.contentVisibility = false
	emit('confirm')
}

function cancel() {
	popper.value!.contentVisibility = false
	emit('cancel')
}

// 受控模式

const isControlled = computed(() => typeof props.isShown === 'boolean')

const computedTriggerMode = computed(() => 
	isControlled.value ? 'none' : props.triggerMode
)

const popper = ref<InstanceType<typeof WtfPopper>>()

watch(() => props.isShown, (val) => {
	if(isControlled.value) {
		popper.value!.contentVisibility = val
	}
})

</script>