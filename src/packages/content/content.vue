<template>
	<component :is="tagName"
	ref="content"
	:class="isScrolled ? 'wtf-content-scroll' : [displayStyleClass, ...(customStyleClassList as unknown as Array<string>)]"
	:style="isScrolled ? styleList : { ...styleList, ...currentContentStyleList, ...customStyleList }">
		<template v-if="isScrolled">
			<div ref="mediateContent"
			class="wtf-mediate-content"
			:style="styleList">
				<div ref="scrolledContent"
				:class="['wtf-scroll-content', displayStyleClass, ...(customStyleClassList as unknown as Array<string>)]"
				:style="{ ...currentContentStyleList, ...customStyleList }">
					<slot></slot>
				</div>
			</div>
			<div ref="scrollbar"
			class="wtf-scrollbar">
				<div ref="trackX"
				class="wtf-scrollbar-track wtf-scrollbar-track--x">
					<div ref="thumbX"
					class="wtf-scrollbar-thumb wtf-scrollbar-thumb--x"
					style="transform: translateX(0px)"></div>
				</div>
				<div ref="trackY"
				class="wtf-scrollbar-track wtf-scrollbar-track--y">
					<div ref="thumbY"
					class="wtf-scrollbar-thumb wtf-scrollbar-thumb--y"
					style="transform: translateY(0px)"></div>
				</div>
			</div>
		</template>
		<template v-else>
			<slot></slot>
		</template>
	</component>
</template>

<script lang="ts" setup>
import { BorderColorProperty, BorderStyleProperty, Color } from 'csstype';
import { ref, computed, onMounted, onUpdated } from 'vue'

defineOptions({
	name: 'WtfContent'
})

type Place = 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
type PlaceList = [Place, Place, Place]

const props = withDefaults(defineProps<{
	tagName?: keyof HTMLElementTagNameMap, // √

	class?: string, // √
	style?: string | object, // √

	width?: string, // √
	height?: string, // √

	flex?: boolean, // √
	header?: boolean, // √
	footer?: boolean, // √
	left?: boolean, // √
	right?: boolean, // √
	grid?: boolean,
	space?: boolean,

	gap?: string | [string, string], // flex √
	gapRow?: string, // flex √
	gapColumn?: string, // flex √

	vertical?: boolean, // flex √
	reverse?: boolean, // flex √
	justify?: Place | PlaceList, // flex √
	align?: Place | PlaceList, // flex √
	nowrap?: boolean, // flex √

	scrollbar?: boolean, // flex √
	scrollbarX?: boolean, // flex √
	scrollbarY?: boolean, // flex √

	bordered?: boolean, // √
	borderStyle?: BorderColorProperty | BorderStyleProperty, // √

	color?: Color,
	bgColor?: Color,
}>(), {})

// COMPONENT STRUCTURE

/*
content (current content)
+ <slot>
*/

// COMPONENT STRUCTURE when isScrolled

/*
content
+ mediate content
  + scroll content (current content)
    + <slot>
+ scrollbar
  + track x
    + thumb x
  + track y
    + thumb y
*/

// DOM

const content = ref()
const mediateContent = ref()
const scrolledContent = ref()
const trackX = ref()
const thumbX = ref()
const trackY = ref()
const thumbY = ref()

// State

const isPresetComponent = computed(() => props.header || props.footer || props.left || props.right)
const tagName = computed(() => 
	props.header ? 'wtf-header' : 
	props.footer ? 'wtf-footer' : 
	props.left ? 'wtf-left' : 
	props.right ? 'wtf-right' : 
	props.tagName ? props.tagName : 'section')
const isScrolled = computed(() => props.scrollbar || props.scrollbarX || props.scrollbarY)

// Class

const displayStyleClass = ref('')

const customStyleClassList = computed(() => props.class ? props.class.split(' ') : [])

// Style

const styleList = ref({
	width: props.width,
	height: props.height,
	color: props.color,
	backgroundColor: props.bgColor
})
const flexStyleList = ref({
	flexDirection: props.vertical ? props.reverse ? 'column-reverse' : 'column' : props.reverse ? 'row-reverse' : undefined,
	flexWrap: props.nowrap ? 'nowrap' : undefined,
	justifyContent: props.justify ? typeof props.justify === 'object' ? props.justify[0] : props.justify : undefined,
	justifyself: props.justify && typeof props.justify === 'object' ? props.justify[2] : undefined,
	alignContent: props.align ? typeof props.align === 'object' ? props.align[0] : props.align : undefined,
	alignItems: props.align && typeof props.align === 'object' ? props.align[1] : undefined,
	alignSelf: props.align && typeof props.align === 'object' ? props.align[2] : undefined,
	rowGap: props.gapRow || props.gap ? typeof props.gap === 'object' ? props.gap[0] : props.gap : undefined,
	columnGap: props.gapColumn || props.gap ? typeof props.gap === 'object' ? props.gap[1] : props.gap : undefined
})
const currentContentStyleList = computed(() => 
	(displayStyleClass.value.endsWith('-space') || displayStyleClass.value.endsWith('-flex')) ? flexStyleList.value : {}
)

const customStyleList = computed(() => 
	typeof props.style === 'string' ? 
		props.style.split(';').reduce((acc, current) => {
			const keyValue = current.split(':')
			acc[keyValue[0].trim() as keyof typeof acc] = keyValue[1].trim()
			return acc
		}, { 'test': 'test' }) : props.style
)

// Function

// judge the displayStyleClass of current content
function judgeContentDisplay(currentContentDom: HTMLElement) {
	// priority: explicit declare > inplicit declare > 'block'
	return `wtf-content${
		props.flex ? '-flex' : 
		props.grid ? '-grid' : 
		props.space ? '-space' : 
		currentContentDom.querySelector(':scope > :is(.wtf-content-header, .wtf-content-footer, .wtf-content-left, .wtf-content-right)') ? '-inplicit-flex' : ''
	}`
}

function adjustContentScroll(clientDom: HTMLElement, scrollDom: HTMLElement, triggerDom: HTMLElement, trackXDom: HTMLElement, thumbXDom: HTMLElement, trackYDom: HTMLElement, thumbYDom: HTMLElement) {
	const onscrollX = (props.scrollbar || props.scrollbarX) ? adjustContentScrollX(clientDom, scrollDom, triggerDom, trackXDom, thumbXDom) : null
	const onscrollY = (props.scrollbar || props.scrollbarY) ? adjustContentScrollY(clientDom, scrollDom, triggerDom, trackYDom, thumbYDom) : null
	triggerDom.onscroll = (event) => {
		onscrollX ? onscrollX(event) : null
		onscrollY ? onscrollY(event) : null
	}
}

function adjustContentScrollX(clientDom: HTMLElement, scrollDom: HTMLElement, triggerDom: HTMLElement, trackDom: HTMLElement, thumbDom: HTMLElement): Function | void {

	scrollDom.style.width = 'fit-content'
	triggerDom.style.overflowX = 'scroll'

	const clientWidth = clientDom.clientWidth
	const scrollWidth = scrollDom.scrollWidth

	if(clientWidth < scrollWidth) {
		trackDom.style.display = 'block'
		const trackLength = trackDom.getBoundingClientRect().width
		thumbDom.style.width = clientWidth / scrollWidth * trackLength + 'px'

		thumbDom.onmousedown = (event) => {
			let startLocation = event.x
			const thumbLength = thumbDom.getBoundingClientRect().width
			function mouseMove(event: MouseEvent) {
				const deltaLocation = event.x - startLocation
				startLocation = event.x
				triggerDom.scrollBy(deltaLocation / (trackLength - thumbLength) * (scrollWidth - clientWidth), 0)
			}
			function mouseUp() {
				document.removeEventListener('mousemove', mouseMove)
				document.removeEventListener('mouseup', mouseUp)
			}
			document.addEventListener('mousemove', mouseMove)
			document.addEventListener('mouseup', mouseUp)
			event.preventDefault()
		}
		return (event: MouseEvent) => {
			const thumbLength = thumbDom.getBoundingClientRect().width
			const scroll = (event.target as unknown as HTMLElement).scrollLeft
			thumbDom.style.transform = `translateX(${scroll / (scrollWidth - clientWidth) * (trackLength - thumbLength)}px)`
		}
	} else {
		trackDom.style.display = 'none'
	}
}

function adjustContentScrollY(clientDom: HTMLElement, scrollDom: HTMLElement, triggerDom: HTMLElement, trackDom: HTMLElement, thumbDom: HTMLElement): Function | void {
	
	scrollDom.style.height = 'fit-content'
	triggerDom.style.overflowY = 'scroll'

	const clientHeight = clientDom.clientHeight
	const scrollHeight = scrollDom.scrollHeight
	
	if(clientHeight < scrollHeight) {
		trackDom.style.display = 'block'
		const trackLength = trackDom.getBoundingClientRect().height
		thumbDom.style.height = clientHeight / scrollHeight * trackLength + 'px'

		thumbDom.onmousedown = (event) => {
			let startLocation = event.y
			const thumbLength = thumbDom.getBoundingClientRect().height
			function mouseMove(event: MouseEvent) {
				const deltaLocation = event.y - startLocation
				startLocation = event.y
				triggerDom.scrollBy(0, deltaLocation / (trackLength - thumbLength) * (scrollHeight - clientHeight))
			}
			function mouseUp() {
				document.removeEventListener('mousemove', mouseMove)
				document.removeEventListener('mouseup', mouseUp)
			}
			document.addEventListener('mousemove', mouseMove)
			document.addEventListener('mouseup', mouseUp)
			event.preventDefault()
		}

		return (event: MouseEvent) => {
			const thumbLength = thumbDom.getBoundingClientRect().height
			const scroll = (event.target as unknown as HTMLElement).scrollTop
			thumbDom.style.transform = `translateY(${scroll / (scrollHeight - clientHeight) * (trackLength - thumbLength)}px)`
		}
	} else {
		trackDom.style.display = 'none'
	}
}

onMounted(() => {
	// preset component will wait for the next mount
	if(isPresetComponent.value) return

	const contentDom = content.value as unknown as HTMLElement
	const mediateContentDom = mediateContent.value as unknown as HTMLElement
	const scrolledContentDom = scrolledContent.value as unknown as HTMLElement

	const currentContentDom = isScrolled.value ? scrolledContentDom : contentDom

	displayStyleClass.value = judgeContentDisplay(currentContentDom)

	// inplicit-flex component
	if(displayStyleClass.value.endsWith('-flex')) {
		if(currentContentDom.querySelector(':scope > :is(.wtf-content-header, .wtf-content-footer)')) {
			flexStyleList.value.flexDirection = props.reverse ? 'column-reverse' : 'column'
			const innerContentDom = currentContentDom.querySelector(':scope > :not(.wtf-content-header, .wtf-content-footer)')
			;(innerContentDom as HTMLElement).style.flex = 'auto'
		} else if(currentContentDom.querySelector(':scope > :is(.wtf-content-left, .wtf-content-right)')) {
			flexStyleList.value.flexDirection = props.reverse ? 'row-reverse' : ''
			const innerContentDom = currentContentDom.querySelector(':scope > :not(.wtf-content-left, .wtf-content-right)')
			;(innerContentDom as HTMLElement).style.flex = 'auto'
		}
		currentContentDom.style.maxWidth = !currentContentDom.style.width ? '100%' : 'auto'
		currentContentDom.style.maxHeight = !currentContentDom.style.height ? '100%' : 'auto'
	}


	const headerDom: HTMLElement | null = currentContentDom.querySelector(':scope > .wtf-content-header')
	const footerDom: HTMLElement | null = currentContentDom.querySelector(':scope > .wtf-content-footer')
	const leftDom: HTMLElement | null = currentContentDom.querySelector(':scope > .wtf-content-left')
	const rightDom: HTMLElement | null = currentContentDom.querySelector(':scope > .wtf-content-right')
	const border = `${props.borderStyle ? props.borderStyle.trim().includes(' ') ? props.borderStyle : '1px solid ' + props.borderStyle : props.bordered ? '1px solid' : ''}`
	headerDom ? headerDom.style.borderBottom = border : null
	footerDom ? footerDom.style.borderTop = border : null
	leftDom ? leftDom.style.borderRight = border : null
	rightDom ? rightDom.style.borderLeft = border : null

	// scrolled component
	if(!isScrolled.value) return
	
	const trackXDom = trackX.value as unknown as HTMLElement
	const thumbXDom = thumbX.value as unknown as HTMLElement
	const trackYDom = trackY.value as unknown as HTMLElement
	const thumbYDom = thumbY.value as unknown as HTMLElement
	const config = { attributes: true, childList: true, subtree: true }
	const callback = () => adjustContentScroll(contentDom, scrolledContentDom, mediateContentDom, trackXDom, thumbXDom, trackYDom, thumbYDom)
	const observer = new MutationObserver(callback)
	observer.observe(currentContentDom, config)
})

onUpdated(() => {
	const contentDom = content.value as unknown as HTMLElement
	const mediateContentDom = mediateContent.value as unknown as HTMLElement
	const scrolledContentDom = scrolledContent.value as unknown as HTMLElement

	const currentContentDom = isScrolled.value ? scrolledContentDom : contentDom

	displayStyleClass.value = judgeContentDisplay(currentContentDom)

	// inplicit-flex component
	if(displayStyleClass.value.endsWith('-flex')) {
		if(currentContentDom.querySelector(':scope > :is(.wtf-content-header, .wtf-content-footer)')) {
			flexStyleList.value.flexDirection = props.reverse ? 'column-reverse' : 'column'
			const innerContentDom = currentContentDom.querySelector(':scope > :not(.wtf-content-header, .wtf-content-footer)')
			if(innerContentDom) {
				(innerContentDom as HTMLElement).style.flex = 'auto'
			}
		} else if(currentContentDom.querySelector(':scope > :is(.wtf-content-left, .wtf-content-right)')) {
			flexStyleList.value.flexDirection = props.reverse ? 'row-reverse' : ''
			const innerContentDom = currentContentDom.querySelector(':scope > :not(.wtf-content-left, .wtf-content-right)')
			if(innerContentDom) {
				(innerContentDom as HTMLElement).style.flex = 'auto'
			}
		}
	}
})
</script>

<style lang="less" scoped>
@layer wtf-ui {
	@wtf: .wtf-content;
	@{wtf} {
		&,
		&-flex,
		&-grid,
		&-space,
		&-flex,
		&-scroll {
			box-sizing: border-box;
			overflow: hidden;
			background-color: @color[background];
		}
		&-flex,
		&-inplicit-flex {
			display: flex;
		}
		&-space {
			overflow: visible;
			display: flex;
			gap: .4em 1.2em;
			background-color: transparent;
			& > :deep(*) { flex: none }
		}
		&-scroll {
			position: relative;
			&:hover > .wtf-scrollbar { opacity: .5 }
			.wtf-mediate-content {
				box-sizing: border-box;
				overflow: hidden;
				scrollbar-width: none;
				max-width: 100%;
				max-height: 100%;
				.wtf-scroll-content {
					box-sizing: border-box;
					min-width: 100%;
					min-height: 100%;
					width: 100%;
					height: 100%;
				}
				&::-webkit-scrollbar { display: none }
			}
			.wtf-scrollbar {
				opacity: 0;
				transition: opacity .4s;
				.wtf-scrollbar-track {
					border-radius: 3px;
					display: none;
					position: absolute;
					background-color: #0001;
					.wtf-scrollbar-thumb {
						border-radius: inherit;
						background-color: #0003;
						transition: background-color .4s;
						cursor: pointer;
						&:hover { background-color: #000C }
					}
					&--x {
						height: 16px;
						inset: auto 4px 4px 4px;
						.wtf-scrollbar-thumb {
							height: 16px;
							min-width: 40px;
							width: 25%;
						}
					}
					&--y {
						width: 16px;
						inset: 4px 4px 4px auto;
						.wtf-scrollbar-thumb {
							width: 16px;
							min-height: 40px;
							height: 25%;
						}
					}
				}
			}
		}
	}
}
</style>