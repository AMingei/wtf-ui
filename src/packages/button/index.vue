<template>
	<button ref="button"
	:class="classList"
	:disabled="disabled || loading">
		<div class="wtf-button-container">

			<span class="wtf-button-inner">
				<template v-if="hasIcon">
					<div class="wtf-button-icon"><slot name="icon"></slot></div>
					<span class="wtf-button-text"><slot name="default"></slot></span>
				</template>
				<div v-else-if="icon" class="wtf-button-char"><slot></slot></div>
				<span v-else class="wtf-button-text"><slot></slot></span>
			</span>

			<div v-if="!(disabled || loading)"
			ref="visualEffectClick"
			class="visual-effect-click"
			@click="visualEffect($event)"></div>
			
			<div v-if="loading"
			class="visual-effect-load">
				<div v-for="item in new Array(8)"
				class="visual-effect-item"></div>
			</div>
			
			<div v-if="breathing"
			class="visual-effect-breath"></div>

		</div>
		<template v-if="hasOption">
			<div class="wtf-button-container"
			@click.stop="visualEffect($event, { option: true })">
				<span class="wtf-button-inner">
					<div class="wtf-button-option"><slot name="option"></slot></div>
					<div v-if="!(disabled || loading)"
					ref="optionVisualEffectClick"
					class="visual-effect-click"></div>
				</span>
			</div>
		</template>
	</button>
</template>

<style lang="less" scoped>

</style>

<style lang="less">
@import "./button.less";
</style>

<script lang="ts" setup>
import { ref, computed, onMounted, onUpdated } from 'vue'

defineOptions({
	name: 'WtfButton'
})

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'error'
type ButtonPriority = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

let props = withDefaults(defineProps<{
	type?: ButtonType,
	priority?: ButtonPriority,
	disabled?: boolean,
	loading?: boolean,
	breathing?: boolean,
	round?: boolean,
	hasIcon?: boolean,
	icon?: boolean,
	hasOption?: boolean,
	color?: string
}>(), {
	type: 'default',
	priority: 'primary'
})

const emit = defineEmits(['optionClick'])

const classList = computed(() => [
	'wtf-button',
	`wtf-button--type-${props.type}`,
	`wtf-button--priority-${props.priority}`,
	props.disabled ? 'wtf-button-is-disabled' : '',
	props.loading ? 'wtf-button-is-loading' : '',
	props.breathing ? 'wtf-button-is-breathing' : '',
	props.round ? 'wtf-button-is-round' : '',
	props.icon ? 'wtf-button-is-icon' : '',
	props.hasOption ? 'wtf-button-has-option' : '',
])

const button = ref(null)
const visualEffectClick = ref(null)
const optionVisualEffectClick = ref(null)

onUpdated(() => {
	if(props.color) {
		// console.log('update', props.color)
		;(button.value as unknown as HTMLElement).style.backgroundColor = props.color
	}
})

onMounted(() => {
	if(props.color) {
		// console.log('update', props.color)
		;(button.value as unknown as HTMLElement).style.backgroundColor = props.color
	}
})

// the visual effect of click
function visualEffect(event: MouseEvent, option?: any) {
	if(option?.option) {
		emit('optionClick')
	}
	// Non-standard but widely compatibility properties
	interface MouseEventPlus extends MouseEvent {
		layerX: number,
		layerY: number
	}
	const buttonDom = button.value as null | HTMLElement
	const visualEffectClickDom = (option?.option ? optionVisualEffectClick : visualEffectClick).value as null | HTMLElement
	const visualEffectItemDom = document.createElement('div')
	visualEffectItemDom.classList.add('visual-effect-item')
	visualEffectItemDom.style.left = (event as MouseEventPlus).layerX + 'px'
	visualEffectItemDom.style.top = (event as MouseEventPlus).layerY + 'px'
	visualEffectClickDom?.appendChild(visualEffectItemDom)
	setTimeout(() => {
		visualEffectItemDom.style.opacity = '0'
		visualEffectItemDom.style.width = 2.5 * Math.max(buttonDom?.offsetWidth || 0, buttonDom?.offsetHeight || 0) + 'px'
		visualEffectItemDom.style.height = 2.5 * Math.max(buttonDom?.offsetWidth || 0, buttonDom?.offsetHeight || 0) + 'px'
	}, 25)
	setTimeout(() => {
		visualEffectItemDom.remove()
	}, 1500)
}
</script>