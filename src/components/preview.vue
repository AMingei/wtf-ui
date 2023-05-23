<script lang="ts" setup>
import { WidthProperty } from 'csstype';
import { ref, shallowRef } from 'vue'

const { src } = defineProps<{
	src: string
}>()

const srcArr = src.split('.')

const example = shallowRef('')
const sourceCode = shallowRef('')

const isCodeportShown = ref(false)

;(async (src: string[]) => {
		example.value = (await import(`../doc/${src[0]}/${src[1]}/example/${src[2]}.vue`)).default
		sourceCode.value = (await import(`../doc/${src[0]}/${src[1]}/example/${src[2]}.vue?raw`)).default
})(srcArr)

function copySourceCode() {

}

function toggleCodeport() {
	isCodeportShown.value = !isCodeportShown.value
}

</script>

<template>
	<wtf-card class="container" content-class="inner-container" :bordered="false">
		<wtf-content class="viewport" scrollbar>
			<component v-if="example" :is="example" />
		</wtf-content>
		<wtf-content v-show="isCodeportShown" class="codeport">
			<highlightjs :code="sourceCode" />
		</wtf-content>
		<wtf-space class="viewport-option" gap=".25em">
			<div class="icon" @click="copySourceCode">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M15 20H5V7c0-.55-.45-1-1-1s-1 .45-1 1v13c0 1.1.9 2 2 2h10c.55 0 1-.45 1-1s-.45-1-1-1zm5-4V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h9c1.1 0 2-.9 2-2zm-2 0H9V4h9v12z" fill="currentColor"></path></svg>
			</div>
			<div :class="['icon', isCodeportShown ? 'active' : '']" @click="toggleCodeport">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M12.937 4.052a.75.75 0 0 0-1.373-.604l-5.5 12.5a.75.75 0 1 0 1.372.604l5.5-12.5zm1.356 9.793a.75.75 0 0 1-.137-1.052L16.303 10l-2.148-2.793a.75.75 0 0 1 1.188-.914l2.5 3.25a.75.75 0 0 1 0 .915l-2.5 3.25a.75.75 0 0 1-1.051.137zm-8.586-7.69a.75.75 0 0 1 .137 1.053L3.696 10l2.148 2.793a.75.75 0 1 1-1.188.915l-2.5-3.25a.75.75 0 0 1 0-.915l2.5-3.25a.75.75 0 0 1 1.051-.137z" fill="currentColor"></path></g></svg>
			</div>
		</wtf-space>
	</wtf-card>
</template>

<style lang="less" scoped>
.container {
	border-radius: .5em;
	box-shadow: 0 0 1em 0 #0000000F;
	& > :deep(.inner-container) {
		position: relative;
		padding: 1em 2em;
		.viewport,
		.codeport {
			box-sizing: inherit;
			box-shadow: inset 0 0 .25em 0 fade(lightgray, 50%);
			padding: .5em;
			background-color: #FCFCFC;
			pre {
				margin: 0;
				tab-size: 2;
				code { padding: .4em 1em }
			}
			&,
			& > pre > code { font-family: consolas, '宋体' }
		}
		.viewport-option {
			box-shadow: inset -.5em .5em .25em -.5em fade(lightgray, 50%);
			position: absolute;
			inset: 1em 2em auto auto;
			padding: .5em .5em .25em .25em;
			border-bottom-left-radius: .5em;
			background-color: #FCFCFC;
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 24px;
				height: 24px;
				border-radius: 4px;
				color: darkgray;
				transition: color .4s, background-color .4s;
				cursor: pointer;
				svg {
					width: 18px;
					height: 18px;
				}
				&.active {
					color: gray;
					background-color: lightgray;
				}
				&:hover { .active }
			}
		}
		.codeport {
			margin-top: .5em;
			font-size: 14px;
			line-height: 1.2;
		}
	}
}
</style>