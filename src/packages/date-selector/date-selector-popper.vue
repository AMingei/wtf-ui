<template>
	<div ref="selectorPopperRef"
	class="wtf-date-selector-popper">
		<div class="wtf-date-row-1">
			<div class="wtf-date-controller" @click="modelValue.year--">
				<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M17.59 18L19 16.59L14.42 12L19 7.41L17.59 6l-6 6z" fill="currentColor"></path><path d="M11 18l1.41-1.41L7.83 12l4.58-4.59L11 6l-6 6z" fill="currentColor"></path></svg>
			</div>
			<div class="wtf-date-controller"
			:class="{ 'wtf-date-controller--is-invisible': isMonthShown }"
			@click="modelValue.month--">
				<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6l1.41-1.41z" fill="currentColor"></path></svg>
			</div>
			<div class="wtf-date-screen"
			:class="{ 'wtf-date-screen--is-editable': mode === 'date' }"
			@click="onModeToggleClick">{{ modelValue.toYMString() }}</div>
			<div class="wtf-date-controller"
			:class="{ 'wtf-date-controller--is-invisible': isMonthShown }"
			@click="modelValue.month++">
				<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M8.59 16.59L13.17 12L8.59 7.41L10 6l6 6l-6 6l-1.41-1.41z" fill="currentColor"></path></svg>
			</div>
			<div class="wtf-date-controller" @click="modelValue.year++">
				<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M6.41 6L5 7.41L9.58 12L5 16.59L6.41 18l6-6z" fill="currentColor"></path><path d="M13 6l-1.41 1.41L16.17 12l-4.58 4.59L13 18l6-6z" fill="currentColor"></path></svg>
			</div>
		</div>

		<transition name="wtf-date-selector">
			<div v-if="isMonthShown" class="wtf-date-row-2">
				<template v-for="(quarter, index) in quarters">
					<wtf-d style="height: auto; font-size: .85em;" line-color="lightgray" text-float="left">{{ quarter }}</wtf-d>
					<div class="wtf-date-row-2-1">
						<div v-for="jndex in 3" :key="jndex"
						class="wtf-date-block"
						:class="{ 'wtf-date-block--is-active': isActiveMonth(jndex + 3 * index),
						'wtf-date-block--is-limited': mode === 'month' && isDisabled(modelValue.year, jndex + 3 * index, modelValue.date)}"
						@mousedown="onMonthBlockClick(jndex + 3 * index)">{{ months[jndex - 1 + 3 * index] }}</div>
					</div>
				</template>
			</div>
			
			<div v-else class="wtf-date-row-3">
				<div class="wtf-date-row-3-1">
					<div v-for="day in week" :key="day">{{ day }}</div>
				</div>
				<wtf-d line-color="lightgray" style="height: auto" />
				<div class="wtf-date-row-3-2">

					<div v-for="day in countInLastMonth" :key="day"
					class="wtf-date-block wtf-date-block--is-disabled"
					:class="{ 'wtf-date-block--is-active': isActiveInLastMonth(countInMonth[(new WtfDate(modelValue.year, modelValue.month - 1, 1)).month - 1] - countInLastMonth + day) }">{{ countInMonth[(new WtfDate(modelValue.year, modelValue.month - 1, 1)).month - 1] - countInLastMonth + day }}</div>

					<div v-for="day in countInCurrentMonth" :key="day"
					class="wtf-date-block"
					:class="{ 'wtf-date-block--is-active': isActive(day),
					'wtf-date-block--is-limited': isDisabled(modelValue.year, modelValue.month, day) }"
					@click="onDateBlockClick(day)">{{ day }}</div>

					<div v-for="day in countInNextMonth - (turnNow ? 1 : 0)" :key="day"
					class="wtf-date-block wtf-date-block--is-disabled"
					:class="{ 'wtf-date-block--is-active': isActiveInNextMonth(day) }">{{ day }}</div>

					<wtf-tooltip v-if="turnNow"
					:trigger-mode="isDisabled() ? 'hover' : 'none'"
					title="current date is disabled">
						<div class="wtf-date-turn-now"
						:class="{ 'wtf-date-turn-now--is-disabled': isDisabled() }"
						@click="onTurnNowClick">Now</div>
					</wtf-tooltip>
				</div>
			</div>
		</transition>
	</div>
</template>

<script lang="ts" setup>

import './date-selector-popper.less'
import WtfTooltip from '../popper/tooltip.vue'
import { WtfDate, WtfDateRage } from './date-selector'
import { computed, ref, unref } from 'vue'

defineOptions({
	name: 'WtfDateSelectorPopper'
})

const props = withDefaults(defineProps<{
	modelValue?: WtfDate | WtfDateRage,
	limination?: Function,
	turnNow?: boolean,
	mode: 'date' | 'month'
}>(), {})

const emit = defineEmits(['update:modelValue'])

// Dom

const selectorPopperRef = ref<HTMLDivElement>()

// State

// 
// 
const modelValue = ref(new WtfDate((props.modelValue as any) as any))
// 
// 

const week = ['一', '二', '三', '四', '五', '六', '日']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const quarters = ['Quarter 1st', 'Quarter 2nd', 'Quarter 3rd', 'Quarter 4th']
const countInMonth = computed(() => [31, unref(modelValue).year % 400 === 0 || unref(modelValue).year % 4 === 0 && unref(modelValue).year % 100 !== 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31])

const countInCurrentMonth = computed(() => unref(countInMonth)[unref(modelValue).month - 1])
const countInLastMonth = computed(() => ((new WtfDate(unref(modelValue).year, unref(modelValue).month, 1)).day + 7 - 1) % 7)
const countInNextMonth = computed(() => 7 * 6 - unref(countInLastMonth) - unref(countInCurrentMonth))

const isMonthShown = ref(props.mode === 'month')

// Class & Style

// Function

function onDateBlockClick(date: number) {
	const targetDate = new WtfDate(unref(modelValue).year, unref(modelValue).month, date)
	if(!isDisabled(targetDate)) {
		// modelValue.value = targetDate
		if(!((props.modelValue as any) && targetDate.equals((props.modelValue as any)))) {
			emit('update:modelValue', targetDate)
		}
	}
}

function onMonthBlockClick(month: number) {
	if(props.mode === 'month') {
		const targetDate = new WtfDate(unref(modelValue).year, month, (props.modelValue as any)?.date || 1)
		if(!isDisabled(targetDate)) {
			if(!((props.modelValue as any) && targetDate.equals((props.modelValue as any)))) {
				emit('update:modelValue', targetDate)
			}
		}
	} else {
		modelValue.value.month = month
		onModeToggleClick()
	}
}

function onTurnNowClick() {
	if(!isDisabled()) {
		const targetDate = new WtfDate()
		modelValue.value = targetDate
		if(!((props.modelValue as any) && targetDate.equals((props.modelValue as any)))) {
			emit('update:modelValue', targetDate)
		}
	}
}

function onModeToggleClick() {
	if(props.mode === 'date') {
		isMonthShown.value = !unref(isMonthShown)
	}
}

function isActive(date: number) {
	return (props.modelValue as any) && new WtfDate(unref(modelValue).year, unref(modelValue).month, date).equals((props.modelValue as any))
}
function isActiveInLastMonth(date: number) {
	return (props.modelValue as any) && new WtfDate(unref(modelValue).year, unref(modelValue).month - 1, date).equals((props.modelValue as any))
}
function isActiveInNextMonth(date: number) {
	return (props.modelValue as any) && new WtfDate(unref(modelValue).year, unref(modelValue).month + 1, date).equals((props.modelValue as any))
}

function isDisabled(year?: number | WtfDate, month?: number, date?: number) {
	if(year === undefined && month === undefined && date === undefined) {
		const date = new WtfDate(new Date())
		return props.limination && props.limination(date.year, date.month, date.date)
	} else if(year instanceof WtfDate) {
		return props.limination && props.limination(year.year, year.month, year.date)
	} else {
		return props.limination && props.limination(year, month, date)
	}
}

function isActiveMonth(month: number) {
	return (props.modelValue as any) && new WtfDate(unref(modelValue).year, month, (props.modelValue as any).date).equals((props.modelValue as any))
}

// Export

defineExpose({
	ref: selectorPopperRef
})

</script>