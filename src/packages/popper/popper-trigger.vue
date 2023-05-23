<template>
	<virtaul-slot :vnode="vtrigger"
	@mouseenter="onMouseenter"
	@mouseleave="onMouseleave"
	@click="onClick"
	@contextmenu="onContextmenu"
	@focus="onFocus"
	@blur="onBlur"></virtaul-slot>
</template>

<script lang="ts" setup>

import { computed, defineComponent, h, inject, unref, useSlots } from 'vue'
import { POPPER_PROVIDE_KEY, TPopperTriggerMode } from './popper'

const { triggerRef, contentVisibility, triggerMode, triggerWithDelay, popperInstanceRef } = inject(POPPER_PROVIDE_KEY)!

const slots = useSlots()

const vtrigger = computed(() => {
	let vnode: any = (slots.default && slots.default()[0])!
	while(vnode && typeof vnode.type === 'symbol' && typeof vnode.children !== 'string') {
		vnode = vnode.children[0]
	}
	if(typeof vnode.type === 'symbol' && typeof vnode.children === 'string') {
		vnode = h('span', vnode)
	}
	return vnode
})

const VirtaulSlot = defineComponent({
	props: {
		vnode: null
	},
	mounted() {
		triggerRef.value = this.$el
	},
	updated() {
		popperInstanceRef.value?.update()
	},
	render(props: any) {
		return props.vnode
	}
})

function triggerJudgement(triggerMode: TPopperTriggerMode, event: Event) {
	enum eventMapping {
		mouseenter = 'hover',
		mouseleave = 'hover',
		click = 'click',
		contextmenu = 'contextmenu',
		focus = 'focus',
		blur = 'focus'
	}
	return triggerMode === eventMapping[event.type as keyof typeof eventMapping]
}

function trigger(event: Event, value: boolean) {
	if(triggerJudgement(unref(triggerMode), event)) {
		triggerWithDelay(value)
	}
}

function onMouseenter(event: MouseEvent) {
	trigger(event, true)
}

function onMouseleave(event: MouseEvent) {
	trigger(event, false)
}

function onClick(event: MouseEvent) {
	trigger(event, !unref(contentVisibility))
	if(unref(triggerMode) === 'contextmenu') {
		triggerWithDelay(false)
	}
}

function onContextmenu(event: MouseEvent) {
	if(triggerJudgement(unref(triggerMode), event)) {
		event.preventDefault()
	}
	trigger(event, !unref(contentVisibility))
}

function onFocus(event: FocusEvent) {
	trigger(event, true)
}

function onBlur(event: FocusEvent) {
	trigger(event, false)
}

</script>