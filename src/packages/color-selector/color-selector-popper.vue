<template>
	<div ref="selectorPopperRef"
	class="wtf-color-selector-popper"
	:style="styleList">
		<div class="wtf-color-row-1">
			<wtf-color-pallete v-model="modelValue" />
			<wtf-color-hue-slider v-model="modelValue" />
			<wtf-color-alpha-slider v-if="props.alpha" v-model="modelValue" />
		</div>
		<div class="wtf-color-row-2">
			<wtf-input-group>
				<template v-if="mode === 'rgb'">
					<wtf-number prefix="R" v-model="modelRGB.r" @change="onRGBChange" />
					<wtf-number prefix="G" v-model="modelRGB.g" @change="onRGBChange" />
					<wtf-number prefix="B" v-model="modelRGB.b" @change="onRGBChange" />
					<wtf-number v-if="props.alpha" prefix="A" v-model="modelRGB.a" @change="onRGBChange" />
				</template>
				<template v-else-if="mode === 'hsv' || mode === 'hsb'">
					<wtf-number prefix="H" v-model="modelHSV.h" @change="onHSVChange" />
					<wtf-number prefix="S" v-model="modelHSV.s" @change="onHSVChange" />
					<wtf-number prefix="V" v-model="modelHSV.v" @change="onHSVChange" />
					<wtf-number v-if="props.alpha" prefix="A" v-model="modelHSV.a" @change="onHSVChange" />
				</template>
				<!-- <template v-else-if="mode === 'hsl'">
					<wtf-number prefix="H" v-model="modelHSL.h" @change="onHSLChange" />
					<wtf-number prefix="S" v-model="modelHSL.s" @change="onHSLChange" />
					<wtf-number prefix="L" v-model="modelHSL.l" @change="onHSLChange" />
				</template> -->
			</wtf-input-group>
		</div>
		<div v-if="prePallete || editable" class="wtf-color-row-3">
			<wtf-color-block v-for="color in prePallete" :color="color" @click="onColorBlockClick(color)" />
			<wtf-color-block v-if="editable" editable @click="onColorBlockEdit" />
		</div>
	</div>
</template>

<script lang="ts" setup>

import './color-selector-popper.less'
import WtfColorPallete from './color-pallete.vue'
import WtfColorHueSlider from './color-hue-slider.vue'
import WtfColorAlphaSlider from './color-alpha-slider.vue'
import WtfColorBlock from './color-block.vue'
import { computed, ref, shallowReactive, watch } from 'vue'
import { ColorHSV, ColorRGB } from './color-selector'

defineOptions({
	name: 'WtfColorSelectorPopper'
})

const props = withDefaults(defineProps<{
	modelValue: ColorRGB,
	mode?: 'hex' | 'rgb' | 'hsl' | 'hsv' | 'hsb',
	alpha?: boolean,
	prePallete?: string[],
	editable?: boolean
}>(), {
	mode: 'rgb'
})

const emit = defineEmits(['update:modelValue'])

// Dom

const selectorPopperRef = ref<HTMLDivElement>()

// State

const modelValue = shallowReactive(props.modelValue.toHSV())

watch(() => props.modelValue, (val) => {
	if(!val.toHSV().equals(modelValue)) {
		modelValue.update(val.toHSV())
	}
	modelRGB.update(val)
	modelHSV.update(val.toHSV())
	// modelHSL.update(val.toHSL())
})

watch(modelValue, (val) => {
	emit('update:modelValue', val.toRGB())
})

const modelRGB = shallowReactive(new ColorRGB(0, 0, 0, 100))
const modelHSV = shallowReactive(new ColorHSV(0, 0, 0, 100))
modelRGB.update(props.modelValue)
modelHSV.update(props.modelValue.toHSV())
// const modelHEX = shallowReactive(props.modelValue)
// const modelHSL = shallowReactive(new ColorHSL(0, 0, 0))

// Class & Style

const styleList = computed(() => ({
	width: props.alpha ? '240px' : '220px'
}))

// Function

function onRGBChange() {
	if(!modelValue.equals(modelRGB.toHSV())) {
		modelValue.update(modelRGB.toHSV())
	}
}

function onHSVChange() {
	if(!modelValue.equals(modelHSV)) {
		modelValue.update(modelHSV)
	}
}

// function onHSLChange() {
// 	if(!modelValue.equals(modelHSL.toHSV())) {
// 		console.log(modelHSL.toHSV(), modelValue);
// 		modelValue.update(modelHSL.toHSV())
// 	}
// }

function onColorBlockClick(color: string) {
	modelValue.update((new ColorRGB(color.slice(1))).toHSV())
}

function onColorBlockEdit() {
	props.prePallete?.push('#' + modelValue.toRGB().toString())
}

// Export

defineExpose({
	ref: selectorPopperRef
})

</script>