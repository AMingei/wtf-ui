<template>
	<div :class="classList"
	:style="styleList">
		<div v-if="$slots.banner"
		:class="['wtf-card-banner', ...customBannerClassList]"
		:style="{ ...customBannerStyle }">
			<slot name="banner"></slot>
		</div>
		<header v-if="$slots.header"
		:class="['wtf-card-header', ...customHeaderClassList]"
		:style="{ ...customHeaderStyle }">
			<span><slot name="header"></slot></span>
			<span><slot name="option"></slot></span>
		</header>
		<div :class="['wtf-card-inner', ...customContentClassList]"
		:style="{ ...customContentStyle }">
			<slot name="default"></slot>
		</div>
		<footer v-if="$slots.footer"
		:class="['wtf-card-footer', ...customFooterClassList]"
		:style="{ ...customFooterStyle }">
			<slot name="footer"></slot>
		</footer>
	</div>
</template>

<style lang="less" scoped>
@layer wtf-ui {
	@wtf: .wtf-card;
	@{wtf} {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		border-radius: .25em;
		background-color: @color[background];
		line-height: 1.6;
		overflow: hidden;
		& > &-banner {
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1;
			& > :deep(img) { width: 100% }
		}
		& > &-header {
			box-sizing: border-box;
			display: flex;
			justify-content: space-between;
			column-gap: .5em;
			padding: .8em 1.5em;
			border-bottom: 1px solid @color[border];
			font-family: '微软雅黑';
			& > span:first-child {
				font-weight: bold;
				overflow: hidden;
				text-overflow: ellipsis;
				text-overflow: '……';
				white-space: nowrap;
			}
			& > span:last-child { flex-shrink: 0 }
		}
		& > &-inner {
			flex: auto;
			box-sizing: border-box;
			display: flow-root;
			padding: .6em 1.5em;
		}
		& > &-footer {
			box-sizing: border-box;
			display: flow-root;
			padding: 0 1.5em .8em 1.5em;
			font-family: '微软雅黑';
		}
		&.wtf-card-bordered { border: 1px solid @color[border] }
		&.wtf-card-shadowed { box-shadow: 0 0 .5em 0 @color[shadow] }
		&.wtf-card-hovered {
			transition: box-shadow .4s;
			&:hover { .wtf-card-shadowed }
		}
	}
}
</style>

<script lang="ts" setup>
import { ref, computed } from 'vue'

defineOptions({
	name: 'WtfCard'
})

const props = withDefaults(defineProps<{
	width?: string,
	height?: string,
	ratio?: string,
	shadow?: 'always' | 'hover' | 'none',
	bordered?: boolean,
	borderStyle?: string,
	bannerClass?: string | string[],
	bannerStyle?: string | object,
	headerClass?: string | string[],
	headerStyle?: string | object,
	contentClass?: string | string[],
	contentStyle?: string | object,
	footerClass?: string | string[],
	footerStyle?: string | object,
}>(), {
	bordered: true
})

const classList = ref([
	'wtf-card',
	`${props.bordered ? 'wtf-card-bordered' : ''}`,
	`${props.shadow === 'always' ? 'wtf-card-shadowed' : props.shadow === 'hover' ? 'wtf-card-hovered' : ''}`
])

const customBannerClassList = computed(() => convertCustomClass(props.bannerClass))
const customHeaderClassList = computed(() => convertCustomClass(props.headerClass))
const customContentClassList = computed(() => convertCustomClass(props.contentClass))
const customFooterClassList = computed(() => convertCustomClass(props.footerClass))

function convertCustomClass(prop: string | Array<string> | undefined) {
	return (typeof prop === 'string' ? prop.split(' ') : prop) || []
}

const styleList = ref({
	width: props.width,
	height: props.height,
	aspectRatio: props.ratio,
	border: props.borderStyle
})

const customBannerStyle = computed(() => convertCustomStyle(props.bannerStyle))
const customHeaderStyle = computed(() => convertCustomStyle(props.headerStyle))
const customContentStyle = computed(() => convertCustomStyle(props.contentStyle))
const customFooterStyle = computed(() => convertCustomStyle(props.footerStyle))

function convertCustomStyle(prop: string | object | undefined) {
	return (typeof prop === 'string' ? 
		prop.split(';').reduce((acc, current) => {
			const keyValue = current.split(':')
			acc[keyValue[0].trim() as keyof typeof acc] = keyValue[1].trim()
			return acc
		}, { '': '' }) : prop) || {}
}
</script>