<template>
	<teleport	:to="teleportTo"
	:disabled="!teleported">
		<transition :name="transition">
			<div v-if="isMounted" 
			v-show="contentVisibility" 
			ref="content"
			tabindex="0"
			@mouseenter="onMouseenter"
			@mouseleave="onMouseleave"
			@click="onClick">
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>

<script lang="ts" setup>

import './popper-content.less'
import { computed, inject, nextTick, onMounted, onUpdated, ref, unref, watch } from 'vue'
import { POPPER_PROVIDE_KEY } from './popper'
import { Placement, createPopper } from '@popperjs/core'

type TPopperContentProps = {
	teleported?: boolean,
	teleportTo?: string,
	transition?: string,
	isMounted?: boolean,
	contentClass?: string,
	placement?: Placement,
	skidding?: number,
	distance?: number,
	enterable?: boolean,
}

const props = withDefaults(defineProps<TPopperContentProps>(), {
	teleported: true,
	teleportTo: '.wtf-popper-container',
	transition: 'popper-content',
	placement: 'top',
	skidding: 0,
	distance: 0,
})

const content = ref<HTMLElement>()

const isMounted = computed(() =>  props.isMounted ? true : unref(contentVisibility))

const popperOptions = computed(() => ({
	placement: props.placement,
	modifiers: [{
		name: 'offset',
		options: {
			offset: [props.skidding, props.distance]
		}
	}]
}))

const { triggerRef, contentRef, contentVisibility, popperInstanceRef, popperOptionsRef, triggerMode, triggerWithDelay } = inject(POPPER_PROVIDE_KEY)!

// 特殊触发

onMounted(() => {
	watch(() => triggerMode.value, (val) => {
		if(val === 'always') {
			contentVisibility.value = true
		} else if(val === 'none') {
			contentVisibility.value = false
		}
	}, { immediate: true })

	if(unref(triggerMode) !== 'always' && unref(triggerMode) !== 'none') {
		document.addEventListener('click', (event) => {
			if(!contentRef.value?.contains(event.target as Node) && !triggerRef.value?.contains(event.target as Node)) {
				triggerWithDelay(false)
			}
		})
	}
})

watch(() => contentVisibility.value, (val) => {
	if(val) {
		contentRef.value = unref(content)!
		popperInstanceRef.value?.destroy()
		popperInstanceRef.value = createPopper(unref(triggerRef), unref(contentRef), unref(popperOptionsRef))
	}
}, { flush: 'post', immediate: true })

watch(() => popperOptions.value, (val) => {
	if(val !== undefined) {
		popperOptionsRef.value = val
		popperInstanceRef.value?.setOptions(unref(popperOptionsRef)!)
	}
}, { flush: 'post', immediate: true })

function onMouseenter() {
	if(props.enterable && unref(triggerMode) === 'hover') {
		triggerWithDelay(true)
	}
}

function onMouseleave() {
	if(unref(triggerMode) === 'hover') {
		triggerWithDelay(false)
	}
}

function onClick() {
	if(unref(triggerMode) === 'focus') {
		(triggerRef.value as HTMLElement).focus()
	}
}
</script>