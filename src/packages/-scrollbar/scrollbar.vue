<template>
	<div ref="scrollbar"
	class="wtf-scrollbar">
		<div ref="scrollbarItem"
		class="wtf-scrollbar-item">
			<slot></slot>
		</div>
		<div ref="scrollbarTrackX"
		class="wtf-scrollbar-track wtf-scrollbar-track--x">
			<div ref="scrollbarThumbX"
			class="wtf-scrollbar-thumb"></div>
		</div>
		<div ref="scrollbarTrackY"
		class="wtf-scrollbar-track wtf-scrollbar-track--y">
			<div  ref="scrollbarThumbY"
			class="wtf-scrollbar-thumb"></div>
		</div>
	</div>
</template>

<style lang="less" scoped>
@wtf: .wtf-scrollbar;
@{wtf} {
	box-sizing: border-box;
	display: block;
	overflow: hidden;
	@{wtf}-item {
		height: 100%;
		overflow: scroll;
		scrollbar-width: none;
	}
	@{wtf}-track {
		width: 7px;
		display: none;
		position: absolute;
		inset: 4px 3px 4px auto;
		border-radius: 3px;
		background-color: #0001;
		box-shadow: inset 0 0 2.5px 0 #0001;
		overflow: hidden;
		opacity: 0;
		transition: opacity .4s;
		@{wtf}-thumb {
			width: 7px;
			min-height: 40px;
			height: 25%;
			max-height: 100%;
			position: absolute;
			border-radius: 3px;
			background-color: #0006;
			box-shadow: 0 0 2.5px 0 #0001;
			cursor: pointer;
		}
	}
	&:hover > @{wtf}-track { opacity: .5 }
}
</style>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from 'vue';

defineOptions({
	name: 'WtfScrollbar'
})

const props = defineProps({
	height: String,
	x: Boolean,
	y: Boolean,
	all: Boolean,
	auto: Boolean
})

const scrollbar = ref(null)
const scrollbarItem = ref(null)
const scrollbarTrackX = ref(null)
const scrollbarThumbX = ref(null)
const scrollbarTrackY = ref(null)
const scrollbarThumbY = ref(null)

function adjustScrollItemStyle(scrollbarDom: HTMLElement, scrollbarItemDom: HTMLElement) {
	scrollbarItemDom.style.height = scrollbarDom.getBoundingClientRect().height + 'px'
}

function adjustScrollTrackStyle(scrollbarDom: HTMLElement, scrollbarItemDom: HTMLElement, scrollbarTrackXDom: HTMLElement, scrollbarThumbXDom: HTMLElement, scrollbarTrackYDom: HTMLElement, scrollbarThumbYDom: HTMLElement) {
	const viewWidth = scrollbarDom.getBoundingClientRect().width
	const viewHeight = scrollbarDom.getBoundingClientRect().height
	const scrollWidth = scrollbarItemDom.scrollWidth
	const scrollHeight = scrollbarItemDom.scrollHeight
	if(Math.round(viewWidth) >= scrollWidth) {
		scrollbarTrackXDom.style.display = 'none'
	} else {
		scrollbarTrackXDom.style.display = 'block'
		adjustScrollThumbXStyle(viewWidth, scrollWidth, scrollbarThumbXDom)
	}
	if(Math.round(viewHeight) >= scrollHeight) {
		scrollbarTrackYDom.style.display = 'none'
	} else {
		scrollbarTrackYDom.style.display = 'block'
		adjustScrollThumbYStyle(viewHeight, scrollHeight, scrollbarThumbYDom)
	}
}

function adjustScrollThumbXStyle(viewWidth: number, scrollWidth: number, scrollbarThumbXDom: HTMLElement) {
	scrollbarThumbXDom.style.width = (viewWidth / scrollWidth * (viewWidth - 8)) + 'px'
}

function adjustScrollThumbYStyle(viewHeight: number, scrollHeight: number, scrollbarThumbYDom: HTMLElement) {
	scrollbarThumbYDom.style.height = (viewHeight / scrollHeight * (viewHeight - 8)) + 'px'
}

onMounted(() => {
	// adjust
	const scrollbarDom = scrollbar.value as unknown as HTMLElement
	const scrollbarItemDom = scrollbarItem.value as unknown as HTMLElement
	const scrollbarTrackXDom = scrollbarTrackX.value as unknown as HTMLElement
	const scrollbarThumbXDom = scrollbarThumbX.value as unknown as HTMLElement
	const scrollbarTrackYDom = scrollbarTrackY.value as unknown as HTMLElement
	const scrollbarThumbYDom = scrollbarThumbY.value as unknown as HTMLElement
	// adjustScrollItemStyle(scrollbarDom, scrollbarItemDom)
	adjustScrollTrackStyle(scrollbarDom, scrollbarItemDom, scrollbarTrackXDom, scrollbarThumbXDom, scrollbarTrackYDom, scrollbarThumbYDom)

	const config = { attributes: true, childList: true, subtree: false }
	const callback = function(mutationsList: Array<MutationRecord>, observer: MutationObserver) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList' || mutation.type === 'attributes') {
				adjustScrollTrackStyle(scrollbarDom, scrollbarItemDom, scrollbarTrackXDom, scrollbarThumbXDom, scrollbarTrackYDom, scrollbarThumbYDom)
			}
		})
	}
	const observer = new MutationObserver(callback)
	observer.observe(scrollbarDom, config)
})

// onUpdated(() => {
// 	// adjust
// 	const scrollbarDom = scrollbar.value as unknown as HTMLElement
// 	const scrollbarItemDom = scrollbarItem.value as unknown as HTMLElement
// 	const scrollbarTrackXDom = scrollbarTrackX.value as unknown as HTMLElement
// 	const scrollbarThumbXDom = scrollbarThumbX.value as unknown as HTMLElement
// 	const scrollbarTrackYDom = scrollbarTrackY.value as unknown as HTMLElement
// 	const scrollbarThumbYDom = scrollbarThumbY.value as unknown as HTMLElement
// 	adjustScrollTrackStyle(scrollbarDom, scrollbarItemDom, scrollbarTrackXDom, scrollbarThumbXDom, scrollbarTrackYDom, scrollbarThumbYDom)
// })
</script>