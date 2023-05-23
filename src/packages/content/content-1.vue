<template>
	<!-- <wtf-scrollbar v-if="props.scrollbar || props.scrollbarX || props.scrollbarY" -->
	<!-- :x="props.scrollbarX" -->
	<!-- :y="props.scrollbarY" -->
	<wtf-scrollbar y
	:class="[outerDisplay, ...outerClassList]"
	:style="outerStyleList">
		<component ref="content"
		:is="tagName"
		:class="[display, ...classList, 'wtf-scrolled-content']"
		:style="styleList">
			<slot></slot>
		</component>
	</wtf-scrollbar>
	<!-- <component v-else
	ref="content"
	:is="tagName"
	:class="[display, ...classList]"
	:style="styleList">
		<slot></slot>
	</component> -->
</template>

<style lang="less" scoped>
@wtf: .wtf-content;
@{wtf} {
	&,
	&-flex,
	&-space {
		box-sizing: border-box;
		position: relative;
		overflow: hidden;
	}
	&-flex {
		display: flex;
		flex-flow: row wrap;
		& > :is(.wtf-header, .wtf-footer) { width: 100% }
		&:not(.wtf-footer, .wtf-header, .wtf-left-side, .wtf-right-side) > :not(.wtf-footer, .wtf-header, .wtf-left-side, .wtf-right-side) { flex: auto }
		&@{wtf}-bordered {
			& > .wtf-header { border-bottom: 1px solid }
			& > .wtf-footer { border-top: 1px solid }
			& > .wtf-left-side { border-right: 1px solid }
			& > .wtf-right-side { border-left: 1px solid }
		}
	}
	&-space {
		max-width: 100%;
		display: inline-flex;
		flex-flow: row wrap;
		display: inline-flex;
		justify-content: flex-start;
		align-items: center;
		gap: .5em 1em;
	}
}
.wtf-scrolled-content {
	overflow: scroll;
	scrollbar-width: none;
	// min-width: 100% !important;
	// width: auto !important;
	// // min-height: 100% !important;
	// height: auto !important;
}

</style>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

defineOptions({
	name: 'WtfContent'
})

const props = withDefaults(defineProps<{
	tagName?: keyof HTMLElementTagNameMap,
	width?: string,
	height?: string,
	flex?: boolean,
	grid?: boolean,
	space?: boolean,
	gap?: string,
	gapRow?: string,
	gapColumn?: string,
	vertical?: boolean,
	reverse?: boolean,
	justify?: boolean,
	align?: boolean,
	unwrap?: boolean,
	scrollbar?: boolean,
	scrollbarX?: boolean,
	scrollbarY?: boolean,
	bordered?: boolean,
	borderStyle?: string,
	header?: boolean,
	footer?: boolean,
	left?: boolean,
	right?: boolean,
}>(), {
	tagName: 'section'
})

const content = ref(null)

const tagName = computed(() =>
	props.header ? 'header' : props.footer ? 'footer' : (props.left || props.right) ? 'aside' : props.tagName
)

const display = ref('')
const outerDisplay = ref('')
const classList = ref([
	props.bordered ? 'wtf-content-bordered' : '',
	props.header ? 'wtf-header' : props.footer ? 'wtf-footer' : props.left ? 'wtf-left-side' : props.right ? 'wtf-right-side' : '',
	(props.scrollbar || props.scrollbarX || props.scrollbarY) ? 'wtf-scrolled-content' : ''
])
const outerClassList = ref([
	props.header ? 'wtf-header' : props.footer ? 'wtf-footer' : props.left ? 'wtf-left-side' : props.right ? 'wtf-right-side' : '',
])

const styleList = ref([
	`width: ${props.width}`,
	`height: ${props.height}`,
	`gap: ${props.gap}`,
	`gap-row: ${props.gapRow}`,
	`gap-column: ${props.gapColumn}`,
	`flex-direction: ${props.vertical ? props.reverse ? 'column-reverse' : 'column' : props.reverse ? 'row-reverse' : ''}`,
	`flex-wrap: ${props.unwrap ? 'unwrap' : ''}`
])
const outerStyleList = ref([
	`width: ${props.width}`,
	`height: ${props.height}`,
])

// judge the style.display of content-container
function judgeContentDisplay(contentDom: HTMLElement) {
	// priority: explicit declare > inplicit declare > 'block'
	return `${props.flex ? '-flex' : props.grid ? '-grid' : props.space ? '-space' : (contentDom.querySelector(':scope > :is(.wtf-header, .wtf-footer, wtf-left-side, .wtf-right-side)') || contentDom.querySelector(':scope > .wtf-scrollbar > .wtf-scrollbar-item > :is(.wtf-header, .wtf-footer, wtf-left-side, .wtf-right-side)')) ? '-flex' : ''}`
}

// adjust the style of content-container
function adjustContentStyle(contentDom: HTMLElement) {
	// clear the style.width/height for inplicit-flex-container's inner content-containers
	const tempClassList = Array.from(contentDom.classList)
	if(tempClassList.includes('wtf-header') || tempClassList.includes('wtf-footer')) {
		styleList.value = styleList.value.filter((value) => !value.startsWith('width'))
		outerStyleList.value = styleList.value.filter((value) => !value.startsWith('width'))
	}
	if(tempClassList.includes('wtf-left-side') || tempClassList.includes('wtf-right-side')) {
		styleList.value = styleList.value.filter((value) => !value.startsWith('height'))
		outerStyleList.value = styleList.value.filter((value) => !value.startsWith('height'))
	}
	// for scrolled content, the relative-length while turn to '100%', the absolute-length needn't change
	if(tempClassList.includes('wtf-scrolled-content')) {
		// console.log(contentDom, contentDom.style.height, contentDom.clientHeight, contentDom.scrollHeight);
		if(contentDom.style.width && contentDom.style.width.endsWith('%')) {
			contentDom.style.width = 'auto'
		} 
		if(contentDom.style.width) {
			if(contentDom.clientWidth < contentDom.scrollWidth) {
				contentDom.style.width = contentDom.scrollWidth + 'px'
			}
		}
		if(contentDom.style.height && contentDom.style.height.endsWith('%')) {
			contentDom.style.height = 'auto'
		}
		if(contentDom.style.height) {
			if(contentDom.clientHeight < contentDom.scrollHeight) {
				contentDom.style.height = contentDom.scrollHeight + 'px'
			}
		}
	}
}

// adjust the style of inner content-containers
function adjustInnerContentStyle(contentDom: HTMLElement) {
	const innerContentDom: HTMLElement | null = contentDom.querySelector(':scope > .wtf-content:not(.wtf-header, .wtf-footer, .wtf-left-side, .wtf-right-side)') || contentDom.querySelector(':scope > .wtf-scrollbar:not(.wtf-header, .wtf-footer, .wtf-left-side, .wtf-right-side)')
	// adjust the style of inplicit-flex-container's inner content-containers
	// - inplicit-flex-container: which has one default content-container and at least one layout-content-container
	// - content-container: <wtf-content>
	// - layout-content-container: <wtf-header> | <wtf-footer> | <wtf-left-side> | <wtf-right-side>
	if(innerContentDom) {
		const headerDom: HTMLElement | null = contentDom.querySelector(':scope > .wtf-header') || contentDom.querySelector(':scope > .wtf-scrollbar > .wtf-header')
		const footerDom: HTMLElement | null = contentDom.querySelector(':scope > .wtf-footer') || contentDom.querySelector(':scope > .wtf-scrollbar > .wtf-footer')
		const leftSideDom: HTMLElement | null = contentDom.querySelector(':scope > .wtf-left-side') || contentDom.querySelector(':scope > .wtf-scrollbar > .wtf-left-side')
		const rightSideDom: HTMLElement | null = contentDom.querySelector(':scope > .wtf-right-side') || contentDom.querySelector(':scope > .wtf-scrollbar > .wtf-right-side')
		// adjust the style.height&maxWidth of inner defualt content-container
		if(headerDom || footerDom) {
			const rowGapTemplate = (props.gap || props.gapRow) ? ` - ${contentDom.style.rowGap}` : ''
			// beware! the HTMLElement.offsetxxx will return a integer with rounding
			innerContentDom.style.height = `calc(100%${
				headerDom ? ` - ${headerDom.getBoundingClientRect().height}px${rowGapTemplate}` : ''
			}${
				footerDom ? ` - ${footerDom.getBoundingClientRect().height}px${rowGapTemplate}` : ''
			})`
		} else if(leftSideDom || rightSideDom) {
			innerContentDom.style.height = '100%'
		}
		if(leftSideDom || rightSideDom) {
			const colGapTemplate = (props.gap || props.gapColumn) ? ` - ${contentDom.style.columnGap}` : ''
			innerContentDom.style.maxWidth = `calc(100%${
				leftSideDom ? ` - ${leftSideDom.getBoundingClientRect().width}px${colGapTemplate}` : ''
			}${
				rightSideDom ? ` - ${rightSideDom.getBoundingClientRect().width}px${colGapTemplate}` : ''
			})`
		} else if(headerDom || footerDom) {
			innerContentDom.style.maxWidth = '100%'
		}
		// adjust the style.border of inner content-containers
		const border = `${props.borderStyle ? props.borderStyle.trim().includes(' ') ? props.borderStyle : '1px solid ' + props.borderStyle : ''}`
		headerDom ? headerDom.style.borderBottom = border : null
		footerDom ? footerDom.style.borderTop = border : null
		leftSideDom ? leftSideDom.style.borderRight = border : null
		rightSideDom ? rightSideDom.style.borderLeft = border : null
	}
}

onMounted(() => {
	const contentDom = content.value as unknown as HTMLElement

	display.value = 'wtf-content' + judgeContentDisplay(contentDom)
	outerDisplay.value = 'wtf-scrollbar' + judgeContentDisplay(contentDom)

	// the class(wtf-header/footer/left-side/right-side) in inplicit-flex-container's inner content-containers' classList has been created on mounted
	adjustContentStyle(contentDom)
	adjustInnerContentStyle(contentDom)

	// create a MutationObserver to monitor the change of DOM in <view-router>
	const config = { attributes: true, childList: true, subtree: true }
	const callback = function(mutationsList: Array<MutationRecord>, observer: MutationObserver) {
		mutationsList.forEach((mutation) => {
			if (mutation.type === 'childList' || mutation.type === 'attributes') {
				adjustContentStyle(contentDom)
				adjustInnerContentStyle(contentDom)
			}
		})
	}
	const observer = new MutationObserver(callback)
	observer.observe(contentDom, config)
})

</script>