<template>
	<slot></slot>
</template>

<script lang="ts" setup>

import { provide, ref, unref } from 'vue'
import { Instance } from '@popperjs/core'
import { POPPER_PROVIDE_KEY, TPopperContext, TPopperOption, TPopperTriggerMode } from './popper'

type TPopperTriggerProps = {
	triggerMode?: TPopperTriggerMode,
	showDelay?: number,
	hideDelay?: number,
	autoHideDelay?: number
}

const props = withDefaults(defineProps<TPopperTriggerProps>(), {
	triggerMode: 'none',
	showDelay: 0,
	hideDelay: 0,
	autoHideDelay: 0
})

// Dom & Dom State

const triggerRef = ref<Element>()
const contentRef = ref<HTMLElement>()
const contentVisibility = ref(false)
const popperInstanceRef = ref<Instance>()
const popperOptionsRef = ref<TPopperOption>()

const timer = ref<number>()
const timerAutoHide = ref<number>()

function triggerWithDelay(val: boolean) {
	clearTimeout(unref(timer))
	clearTimeout(unref(timerAutoHide))
	const delay = val ? props.showDelay : props.hideDelay
	timer.value = setTimeout(() => contentVisibility.value = val, delay)
	if(props.autoHideDelay > 0) {
		timerAutoHide.value = setTimeout(() => contentVisibility.value = false, props.autoHideDelay)
	}
}

if(!document.querySelector('.wtf-popper-container')) {
	const dom = document.createElement('div')
	dom.classList.add('wtf-popper-container')
	document.body.appendChild(dom)
}

const popperContext = {
	triggerRef,
	contentRef,
	contentVisibility,
	popperInstanceRef,
	popperOptionsRef,
	triggerMode: ref(props.triggerMode),
	triggerWithDelay,
	showDelay: ref(props.showDelay),
	hideDelay: ref(props.hideDelay),
	autoHideDelay: ref(props.autoHideDelay)
} as TPopperContext

provide(POPPER_PROVIDE_KEY, popperContext)

defineExpose(popperContext)

</script>