<template>
	<wtf-scrollbar v-if="props.scrollbar"
	:height="props.height">
		<div ref="gridContainer"
		:class="classList"
		:style="`grid-template-areas: ${gridTemplateAreasComputed};grid-template-rows: ${gridTemplateRowsComputed};grid-template-columns: ${gridTemplateColsComputed}; gap: ${props.gap}; min-height: ${props.height};`">
			<slot></slot>
		</div>
	</wtf-scrollbar>
	<div v-else
	ref="gridContainer"
	:class="classList"
	:style="`grid-template-areas: ${gridTemplateAreasComputed};grid-template-rows: ${gridTemplateRowsComputed};grid-template-columns: ${gridTemplateColsComputed}; gap: ${props.gap}; height: ${props.height};`">
		<slot></slot>
	</div>
</template>

<style lang="less" scoped>
@wtf: .wtf-grid;
@{wtf} {
	box-sizing: border-box;
	min-height: 100px;
	overflow: hidden;
	display: grid;
	&-bordered {
		:deep(@{wtf}-header) { border-bottom: 1px solid black }
		:deep(@{wtf}-left) { border-right: 1px solid black }
		:deep(@{wtf}-right) { border-left: 1px solid black }
		:deep(@{wtf}-footer) { border-top: 1px solid black }
	}
}
</style>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue'

defineOptions({
	name: 'WtfGrid'
})

const props = defineProps({
	gap: String,
	bordered: Boolean,
	height: String,
	scrollbar: Boolean
})

const classList = computed(() => [
	'wtf-grid',
	props.bordered ? 'wtf-grid-bordered' : ''
])

const gridContainer = ref(null)

const gridTemplateAreas = ref([['t', 't', 't'], ['l', 'c', 'r'], ['b', 'b', 'b']])
const gridTemplateAreasComputed = computed(() => gridTemplateAreas.value
	.reduce((acc, current) => acc + ' \'' + current.join(' ') + '\''
, ''))
const gridTemplateRows = ref(['auto', '1fr', 'auto'])
const gridTemplateRowsComputed = computed(() => gridTemplateRows.value.join(' '))
const gridTemplateCols = ref(['auto', '1fr', 'auto'])
const gridTemplateColsComputed = computed(() => gridTemplateCols.value.join(' '))

function fitGridItem(elementList: Array<HTMLElement>) {
	elementList.forEach((element) => {
		if (Array.from(element.classList).includes('wtf-grid-header')) {
			adjustSpan(element, true, 0, 0, 0, 2, 't', 'r', 'l')
		} else if (Array.from(element.classList).includes('wtf-grid-footer')) {
			adjustSpan(element, true, 2, 0, 2, 2, 'b', 'r', 'l')
		} else if (Array.from(element.classList).includes('wtf-grid-left')) {
			adjustSpan(element, true, 0, 0, 2, 0, 'l', 'b', 't')
		} else if (Array.from(element.classList).includes('wtf-grid-right')) {
			adjustSpan(element, true, 0, 2, 2, 2, 'r', 'b', 't')
		}
	})
}

function adjustSpan(element: HTMLElement, isAll: boolean, ...rest: any[]) {
	switch(element.getAttribute('span')) {
		case 'start':
			gridTemplateAreas.value[rest[0]][rest[1]] = rest[4]
			gridTemplateAreas.value[rest[2]][rest[3]] = rest[5]
			break
		case 'end':
			gridTemplateAreas.value[rest[0]][rest[1]] = rest[6]
			gridTemplateAreas.value[rest[2]][rest[3]] = rest[4]
			break
		case 'center':
			if(isAll) {
				gridTemplateAreas.value[rest[0]][rest[1]] = rest[4]
				gridTemplateAreas.value[rest[2]][rest[3]] = rest[4]
			}
			break
		case 'center':
			if(!isAll) {
				gridTemplateAreas.value[rest[0]][rest[1]] = rest[4]
				gridTemplateAreas.value[rest[2]][rest[3]] = rest[4]
			}
			break
	}
}

onMounted(() => {
	const gridContainerDom = gridContainer.value as unknown as HTMLElement

	fitGridItem(Array.from(gridContainerDom.children) as Array<HTMLElement>)

	const config = { attributes: false, childList: true, subtree: false }

	const callback = function(mutationsList: Array<MutationRecord>, observer: MutationObserver) {
		mutationsList.forEach((mutation) => {
			if(mutation.type === 'childList' && 
			mutation.target === gridContainerDom && 
			// vue 每次只修改一个 Node
			// 排除节点删除
			!mutation.removedNodes.length && 
			// 排除文本节点添加
			Array.from(mutation.addedNodes).every((element) => element.nodeName !== '#text')) {
				fitGridItem(Array.from(mutation.addedNodes as unknown as Array<HTMLElement>))
			}
		})
	}

	const observer = new MutationObserver(callback)
	observer.observe(gridContainerDom, config)
	// observer.disconnect()
})

</script>