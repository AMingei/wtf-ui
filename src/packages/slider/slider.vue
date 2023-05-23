<template>
	<div :class="classList"
	:style="styleList">
		<div ref="sliderTrackRef"
		class="wtf-slider-track"
		@click="onTrackClick">
			<div ref="sliderBarRef"
			class="wtf-slider-bar"
			:style="barStyle"></div>
			<div class="wtf-slider-mark-container"
			@click="onMarkContainerClick">
				<wtf-slider-mark v-for="item in markList"
				:type="type"
				:active="item.value < modelValue"
				:translate="((item.value - unref(min)) / (unref(max) - unref(min))) * trackLength"
				:vertical="vertical"
				:disabled="disabled"
				:readonly="readonly"
				@click.stop="onMarkClick(item.value)">{{ item.label }}</wtf-slider-mark>
			</div>
		</div>
		<wtf-tooltip :title="titleFunction(modelValue)"
		:placement="vertical ? 'left' : 'top'"
		:is-shown="disabled ? false : showTitle || isShown"
		as-raw>
			<div ref="sliderButtonRef"
			class="wtf-slider-button"
			:style="buttonStyle"
			:tabindex="disabled ? undefined : 0"
			@mousedown="onMousedown"
			@mouseenter="onMouseenter"
			@mouseleave="onMouseleave"
			@keydown.left="onKeypressLeft"
			@keydown.right="onKeypressRight"></div>
		</wtf-tooltip>
	</div>
</template>

<script lang="ts" setup>

import './slider.less'
import WtfSliderMark from './slider-mark.vue'
import WtfTooltip from '../popper/tooltip.vue'
import { ComputedRef, computed, nextTick, onMounted, ref, unref, watch } from 'vue'
import { SliderMark } from './slider'

defineOptions({
	name: 'WtfSlider'
})

const props = withDefaults(defineProps<{
	modelValue?: number,
	min?: number | string,
	max?: number | string,
	step?: number | string,
	type?: 'normal' | 'primary' | 'success' | 'warning' | 'error',
	vertical?: boolean,
	marks?: 'step' | SliderMark[],
	strictMark?: boolean,
	titleFunction?: Function,
	disabled?: boolean,
	readonly?: boolean,
	showTitle?: boolean
}>(), {
	modelValue: 0,
	min: 0,
	max: 100,
	step: 1,
	type: 'normal',
	vertical: false,
	titleFunction: (val) => val.toString()
})

const emit = defineEmits(['update:modelValue'])

// Dom

const sliderTrackRef = ref<HTMLDivElement>()
const sliderButtonRef = ref<HTMLDivElement>()

// State

const mouseStart = ref<number>(0)
const mouseEnd = ref<number>(0)
const mouseDelta = ref<number>(0)

const modelValue = computed({
	get: () => props.modelValue,
	set: (val) => {
		emit('update:modelValue', val)
	}
})

const position = ref<number>(0)
const trackLength = ref<number>(0)
const trackStart = ref<number>(0)

const buttonWidth = ref<number>(0)
const buttonHeight = ref<number>(0)

const markList: ComputedRef<SliderMark[] | undefined> = computed(() => {
	if(props.marks === 'step') {
		const list = []
		for(let i = unref(min); i <= unref(max); i += unref(step)) {
			list.push({ value: i, label: i.toString() })
		}
		return list
	} else if(props.marks) {
		return props.marks.sort((a, b) => a.value - b.value)
	}
})

const min = ref(Number(props.min))
const max = ref(Number(props.max))
const step = ref(Number(props.step))

const isDraging = ref(false)
const isShown = ref(false)

// Class & Style

const classList = computed(() => [
	'wtf-slider',
	`wtf-slider--type-${props.type}`,
	props.vertical ? 'wtf-slider--vertical' : undefined,
	props.readonly ? 'wtf-slider--readonly' : undefined,
	props.disabled ? 'wtf-slider--disabled' : undefined
])

const styleList = computed(() => ({
	transform: props.vertical ? 'scaleY(-100%)' : undefined
}))

const buttonStyle = computed(() => ({
	top: props.vertical ? unref(position) + 'px' : undefined,
	left: props.vertical ? undefined : unref(position) + 'px',
}))

const barStyle = computed(() => ({
	width: props.vertical ? '100%' : unref(position) + .5 * unref(buttonWidth) + 'px',
	height: props.vertical ? unref(position) + .5 * unref(buttonHeight) + 'px' : '100%'
}))

// Function

watch(() => position.value, (val) => {
	if(val < 0) {
		position.value = 0
	} else if(val > unref(trackLength)) {
		position.value = unref(trackLength)
	}
})

function onMousedown(event: MouseEvent) {
	if(!props.disabled && !props.readonly) {
		isDraging.value = true
		if(!props.vertical) {
			mouseStart.value = event.x
			document.addEventListener('mousemove', onMousemoveX)
			document.addEventListener('mouseup', onMouseupX)
		} else {
			mouseStart.value = event.y
			document.addEventListener('mousemove', onMousemoveY)
			document.addEventListener('mouseup', onMouseupY)
		}
	}
}

function onMousemoveX(event: MouseEvent) {
	mouseEnd.value = event.x
	mouseDelta.value = unref(mouseEnd) - unref(mouseStart)
	mouseStart.value += unref(mouseDelta)

	position.value += unref(mouseDelta)

	const targetValue = Math.round(
		(unref(position) / unref(trackLength)) * Math.floor((unref(max) - unref(min)) / unref(step))
	) * unref(step) + unref(min)
	modelValue.value = props.strictMark ?
		markList.value?.reduce((acc, cur) => Math.abs(acc.value - targetValue) > Math.abs(cur.value - targetValue) ? cur : acc).value!
		: targetValue
}

function onMouseupX(event: MouseEvent) {
	isDraging.value = false
	if(!unref(sliderButtonRef)?.contains(event.target as Node)) {
		isShown.value = false
	}

	position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength)

	document.removeEventListener('mousemove', onMousemoveX)
	document.removeEventListener('mouseup', onMouseupX)
}

function onMousemoveY(event: MouseEvent) {
	mouseEnd.value = event.y
	mouseDelta.value = unref(mouseEnd) - unref(mouseStart)
	mouseStart.value += unref(mouseDelta)

	position.value -= unref(mouseDelta)

	const targetValue = Math.round(
		(unref(position) / unref(trackLength)) * Math.floor((unref(max) - unref(min)) / unref(step))
	) * unref(step) + unref(min)
	modelValue.value = props.strictMark ?
		markList.value?.reduce((acc: SliderMark, cur: SliderMark) => Math.abs(acc.value - targetValue) > Math.abs(cur.value - targetValue) ? cur : acc).value!
		: targetValue
}

function onMouseupY(event: MouseEvent) {
	isDraging.value = false
	if(!unref(sliderButtonRef)?.contains(event.target as Node)) {
		isShown.value = false
	}

	position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength)

	document.removeEventListener('mousemove', onMousemoveY)
	document.removeEventListener('mouseup', onMouseupY)
}

function onTrackClick(event: MouseEvent) {
	if(!props.disabled) {
		if(!props.readonly) {
			let targetPosition
			if(!props.vertical) {
				targetPosition = event.x - (.5 * unref(buttonWidth) + unref(trackStart))
			} else {
				targetPosition = (.5 * unref(buttonHeight) + unref(trackStart)) - event.y + unref(trackLength)
			}
			
			position.value = targetPosition < 0 ? 0 : targetPosition > unref(trackLength) ? unref(trackLength) : targetPosition

			const targetValue = Math.round(
				(unref(position) / unref(trackLength)) * Math.floor((unref(max) - unref(min)) / unref(step))
			) * unref(step) + unref(min)

			modelValue.value = props.strictMark ?
				markList.value?.reduce((acc: SliderMark, cur: SliderMark) => Math.abs(acc.value - targetValue) > Math.abs(cur.value - targetValue) ? cur : acc).value!
				: targetValue
		}
		nextTick(() => {
			position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength)
			sliderButtonRef.value?.focus()
		})
	}
}

function onMouseenter() {
	isShown.value = true
}

function onMouseleave() {
	if(!unref(isDraging)) {
		isShown.value = false
	}
}

function onMarkClick(val: number) {
	if(!props.disabled) {
		sliderButtonRef.value?.focus()
		if(!props.readonly) {
			modelValue.value = val
			nextTick(() => position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength))
		}
	}
}

function onKeypressLeft() {
	if(!props.readonly) {
		const targetValue = unref(modelValue) - unref(step)

		props.strictMark ? unref(markList)?.reverse() : undefined

		modelValue.value = props.strictMark ?
			unref(markList)?.find((item) => item.value < unref(modelValue))?.value || unref(modelValue)
			: targetValue < unref(min) ?
				unref(min)
				: targetValue
		
		props.strictMark ? unref(markList)?.reverse() : undefined

		nextTick(() => position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength))
	}
}

function onKeypressRight() {
	if(!props.readonly) {
		const targetValue = unref(modelValue) + unref(step)

		modelValue.value = props.strictMark ?
			unref(markList)?.find((item) => item.value > unref(modelValue))?.value || unref(modelValue)
			: targetValue > Math.floor(unref(max) / unref(step)) * unref(step) ?
				Math.floor(unref(max) / unref(step)) * unref(step)
				: targetValue

		nextTick(() => position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength))
	}
}

function onMarkContainerClick(event: MouseEvent) {
	if(props.disabled) {
		event.stopPropagation()
	}
}

onMounted(() => {
	buttonWidth.value = unref(sliderButtonRef)!.getBoundingClientRect().width
	buttonHeight.value = unref(sliderButtonRef)!.getBoundingClientRect().height
	if(!props.vertical) {
		trackStart.value = unref(sliderTrackRef)!.getBoundingClientRect().x
		trackLength.value = unref(sliderTrackRef)!.getBoundingClientRect().width - unref(buttonWidth)
	} else {
		trackStart.value = unref(sliderTrackRef)!.getBoundingClientRect().y
		trackLength.value = unref(sliderTrackRef)!.getBoundingClientRect().height - unref(buttonHeight)
	}

	position.value = ((unref(modelValue) - unref(min)) / (unref(max) - unref(min))) * unref(trackLength)
})

// Export

</script>