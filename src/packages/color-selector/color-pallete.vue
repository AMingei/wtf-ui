<template>
	<div class="wtf-color-pallete">
		<div ref="colorTrackRef"
		class="wtf-color-track"
		:style="colorSaturationStyle"
		@click="onTrackClick"></div> 
		<div ref="colorPickerRef"
		class="wtf-color-picker"
		:style="colorPickerStyle"
		tabindex="0"
		@mousedown="onMousedown"
		@keydown.up="onKeypressUp"
		@keydown.right="onKeypressRight"
		@keydown.down="onKeypressDown"
		@keydown.left="onKeypressLeft"></div>
	</div>
</template>

<script lang="ts" setup>

import './color-pallete.less'
import { computed, nextTick, onMounted, reactive, ref, unref, watch } from 'vue'
import { ColorHSV } from './color-selector'

defineOptions({
	name: 'WtfColorPallete'
})

const props = withDefaults(defineProps<{
	modelValue: ColorHSV
}>(), {})

// Dom

const colorTrackRef = ref<HTMLDivElement>()
const colorPickerRef = ref<HTMLDivElement>()

// State

const mouseStart = reactive({ x: 0, y: 0 })
const mouseEnd = reactive({ x: 0, y: 0 })
const mouseDelta = reactive({ x: 0, y: 0 })

const min = { x: 0, y: 0 }
const max = { x: 100, y: 100 }
const step = { x: 1, y: 1 }

const position = reactive({ x: 0, y: 0 })
const trackLength = reactive({ x: 0, y: 0 })
const trackStart = reactive({ x: 0, y: 0 })
const buttonLength = reactive({ x: 0, y: 0 })

watch(() => props.modelValue, (val) => {
	const targetPosition = {
		x: ((val.s - min.x) / (max.x - min.x)) * trackLength.x,
		y: ((val.v - min.y) / (max.y - min.y)) * trackLength.y
	}
	if(position.x !== targetPosition.x || position.y !== targetPosition.y) {
		position.x = targetPosition.x
		position.y = targetPosition.y
	}
}, { deep: true })

watch(() => position.x, (val) => {
	if(val < 0) {
		position.x = 0
	} else if(val > trackLength.x) {
		position.x = trackLength.x
	}
})

watch(() => position.y, (val) => {
	if(val < 0) {
		position.y = 0
	} else if(val > trackLength.y) {
		position.y = trackLength.y
	}
})

// Class & Style

const colorPickerStyle = computed(() => ({
	top: position.y + 'px',
	left: position.x + 'px',
	backgroundColor: `#${props.modelValue.toRGB().toString()}`
}))

const colorSaturationStyle = computed(() => ({
	backgroundImage: `linear-gradient(to right, white, hsl(${props.modelValue.h}, 100%, 50%))`
}))

// Function

function onMousedown(event: MouseEvent) {
	sliderDomUpdate()

	mouseStart.x = event.x
	mouseStart.y = event.y
	document.addEventListener('mousemove', onMousemove)
	document.addEventListener('mouseup', onMouseup)
}

function onMousemove(event: MouseEvent) {
	mouseEnd.x = event.x
	mouseEnd.y = event.y
	mouseDelta.x = mouseEnd.x - mouseStart.x
	mouseDelta.y = mouseEnd.y - mouseStart.y
	mouseStart.x += mouseDelta.x
	mouseStart.y += mouseDelta.y

	position.x += mouseDelta.x
	position.y -= mouseDelta.y

	props.modelValue.setSafeS(Math.round(
		(position.x / trackLength.x) * Math.floor((max.x - min.x) / step.x)
	) * step.x + min.x)
	props.modelValue.setSafeV(Math.round(
		(position.y / trackLength.y) * Math.floor((max.y - min.y) / step.y)
	) * step.y + min.y)
}

function onMouseup(event: MouseEvent) {
	position.x = ((props.modelValue.s - min.x) / (max.x - min.x)) * trackLength.x
	position.y = ((props.modelValue.v - min.y) / (max.y - min.y)) * trackLength.y

	nextTick(() => props.modelValue.hue.unlock())

	document.removeEventListener('mousemove', onMousemove)
	document.removeEventListener('mouseup', onMouseup)
}

function onTrackClick(event: MouseEvent) {
	sliderDomUpdate()
	colorPickerRef.value?.focus()

	const targetPosition =  {
		x: event.x - (.5 * buttonLength.x + trackStart.x),
		y: (.5 * buttonLength.y + trackStart.y) - event.y + trackLength.y
	}
	position.x = targetPosition.x < 0 ? 0 : targetPosition.x > trackLength.x ? trackLength.x : targetPosition.x
	position.y = targetPosition.y < 0 ? 0 : targetPosition.y > trackLength.y ? trackLength.y : targetPosition.y

	props.modelValue.setSafeS(Math.round(
		(position.x / trackLength.x) * Math.floor((max.x - min.x) / step.x)
	) * step.x + min.x)
	props.modelValue.setSafeV(Math.round(
		(position.y / trackLength.y) * Math.floor((max.y - min.y) / step.y)
	) * step.y + min.y)

	nextTick(() => {
		position.x = ((props.modelValue.s - min.x) / (max.x - min.x)) * trackLength.x
		position.y = ((props.modelValue.v - min.y) / (max.y - min.y)) * trackLength.y

		props.modelValue.hue.unlock()
	})
}

function onKeypressUp() {
	const targetValue = props.modelValue.v + step.y

	props.modelValue.setSafeV(targetValue < min.y ? min.y : targetValue)

	nextTick(() => {
		position.y = ((props.modelValue.v - min.y) / (max.y - min.y)) * trackLength.y
		props.modelValue.hue.unlock()
	})
}

function onKeypressDown() {
	const targetValue = props.modelValue.v - step.y

	props.modelValue.setSafeV(targetValue < min.y ? min.y : targetValue)

	nextTick(() => {
		position.y = ((props.modelValue.v - min.y) / (max.y - min.y)) * trackLength.y
		props.modelValue.hue.unlock()
	})
}

function onKeypressRight() {
	const targetValue = props.modelValue.s + step.x

	props.modelValue.setSafeS(targetValue > Math.floor(max.x / step.x) * step.x ?
		Math.floor(max.x / step.x) * step.x : targetValue)

	nextTick(() => {
		position.x = ((props.modelValue.s - min.x) / (max.x - min.x)) * trackLength.x
		props.modelValue.hue.unlock()
	})
}

function onKeypressLeft() {
	const targetValue = props.modelValue.s - step.x

	props.modelValue.setSafeS(targetValue > Math.floor(max.x / step.x) * step.x ?
		Math.floor(max.x / step.x) * step.x : targetValue)

	nextTick(() => {
		position.x = ((props.modelValue.s - min.x) / (max.x - min.x)) * trackLength.x
		props.modelValue.hue.unlock()
	})
}


function sliderDomUpdate() {
	buttonLength.x = unref(colorPickerRef)!.getBoundingClientRect().width
	buttonLength.y = unref(colorPickerRef)!.getBoundingClientRect().height
	trackStart.x = unref(colorTrackRef)!.getBoundingClientRect().x
	trackStart.y = unref(colorTrackRef)!.getBoundingClientRect().y
	trackLength.x = unref(colorTrackRef)!.getBoundingClientRect().width - buttonLength.x
	trackLength.y = unref(colorTrackRef)!.getBoundingClientRect().height - buttonLength.y
}

onMounted(() => {
	sliderDomUpdate()
	position.x = ((props.modelValue.s - min.x) / (max.x - min.x)) * trackLength.x
	position.y = ((props.modelValue.v - min.y) / (max.y - min.y)) * trackLength.y
})

// Export

</script>