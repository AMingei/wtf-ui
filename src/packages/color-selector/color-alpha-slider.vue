<template>
	<div class="wtf-alpha-slider">
		<div ref="sliderTrackRef"
		class="wtf-slider-track"
		:style="trackStyle"
		@click="onTrackClick">
		</div>
		<wtf-tooltip :title="`${modelValue.a}%`"
		placement="right"
		:is-shown="isShown"
		as-raw>
			<div ref="sliderButtonRef"
			class="wtf-slider-button"
			:style="buttonStyle"
			tabindex="0"
			@mousedown="onMousedown"
			@mouseenter="isHovering = true"
			@mouseleave="isHovering = false"
			@keydown.left="onKeypressLeft"
			@keydown.right="onKeypressRight"
			@focus="isFocused = true"
			@blur="isFocused = false"></div>
		</wtf-tooltip>
	</div>
</template>

<script lang="ts" setup>

import './color-alpha-slider.less'
import WtfTooltip from '../popper/tooltip.vue'
import { computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { ColorHSV } from './color-selector'

defineOptions({
	name: 'WtfColorHueSlider'
})

const props = withDefaults(defineProps<{
	modelValue: ColorHSV
}>(), {})

// Dom

const sliderTrackRef = ref<HTMLDivElement>()
const sliderButtonRef = ref<HTMLDivElement>()

// State

const mouseStart = ref<number>(0)
const mouseEnd = ref<number>(0)
const mouseDelta = ref<number>(0)

const min = 0
const max = 100
const step = 1

const position = ref<number>(0)
const trackLength = ref<number>(0)
const trackStart = ref<number>(0)
const buttonHeight = ref<number>(0)

const isHovering = ref(false)
const isFocused = ref(false)
const isShown = computed(() => unref(isHovering) || unref(isFocused))

// Class & Style

const trackStyle = computed(() => ({
	backgroundImage: `linear-gradient(hsl(${props.modelValue.h}, 100%, 50%, 0), hsl(${props.modelValue.h}, 100%, 50%, 100%))`
}))

const buttonStyle = computed(() => ({
	top: unref(position) + 'px',
	backgroundColor: `hsl(${props.modelValue.h}, 100%, ${100 - props.modelValue.a * .5}%)`
}))

// Function

watch(() => props.modelValue, (val) => {
	const targetPosition = ((val.a - min) / (max - min)) * unref(trackLength)
	if(unref(position) !== targetPosition) {
		position.value = targetPosition
	}
}, { deep: true })

watch(position, (val) => {
	if(val < 0) {
		position.value = 0
	} else if(val > unref(trackLength)) {
		position.value = unref(trackLength)
	}
})

function onMousedown(event: MouseEvent) {	
	sliderDomUpdate()
	mouseStart.value = event.y
	document.addEventListener('mousemove', onMousemoveY)
	document.addEventListener('mouseup', onMouseupY)
}

function onMousemoveY(event: MouseEvent) {
	mouseEnd.value = event.y
	mouseDelta.value = unref(mouseEnd) - unref(mouseStart)
	mouseStart.value += unref(mouseDelta)

	position.value += unref(mouseDelta)

	props.modelValue.setSafeA(Math.round(
		(unref(position) / unref(trackLength)) * Math.floor((max - min) / step)
	) * step + min)

	nextTick(() => props.modelValue.hue.unlock())
}

function onMouseupY(event: MouseEvent) {
	position.value = ((props.modelValue.a - min) / (max - min)) * unref(trackLength)

	document.removeEventListener('mousemove', onMousemoveY)
	document.removeEventListener('mouseup', onMouseupY)
}

function onTrackClick(event: MouseEvent) {
	sliderDomUpdate()
	sliderButtonRef.value?.focus()

	const targetPosition = event.y - (.5 * unref(buttonHeight) + unref(trackStart))
	position.value = targetPosition < 0 ? 0 : targetPosition > unref(trackLength) ? unref(trackLength) : targetPosition

	props.modelValue.setSafeA(Math.round(
		(unref(position) / unref(trackLength)) * Math.floor((max - min) / step)
	) * step + min)

	nextTick(() => {
		position.value = ((props.modelValue.a - min) / (max - min)) * unref(trackLength)
		props.modelValue.hue.unlock()
	})
}

function onKeypressLeft() {
	const targetValue = props.modelValue.a - step

	props.modelValue.setSafeA(targetValue < min ? min : targetValue)

	nextTick(() => {
		position.value = ((props.modelValue.a - min) / (max - min)) * unref(trackLength)
		props.modelValue.hue.unlock()
	})
}

function onKeypressRight() {
	const targetValue = props.modelValue.a + step

	props.modelValue.setSafeA(targetValue > Math.floor(max / step) * step ?
		Math.floor(max / step) * step : targetValue)

	nextTick(() => {
		position.value = ((props.modelValue.a - min) / (max - min)) * unref(trackLength)
		props.modelValue.hue.unlock()
	})
}

function sliderDomUpdate() {
	buttonHeight.value = unref(sliderButtonRef)!.getBoundingClientRect().height
	trackStart.value = unref(sliderTrackRef)!.getBoundingClientRect().y
	trackLength.value = unref(sliderTrackRef)!.getBoundingClientRect().height - unref(buttonHeight)
}

onMounted(() => {
	sliderDomUpdate()
	position.value = ((props.modelValue.a - min) / (max - min)) * unref(trackLength)
})

// Export

</script>