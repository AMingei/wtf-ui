<template>
	<wtf-space>
		<transition-group name="example-tag">
			<wtf-tag v-for="item in list"
			:key="item.index"
			type="primary"
			closable
			@close="onClose(item.index)">
				{{ item.label }}
			</wtf-tag>
		</transition-group>
		<wtf-tag type="primary" editable @insert="onInsert"></wtf-tag>
	</wtf-space>
</template>

<style lang="less" scoped>

.example-tag-enter-active,
.example-tag-leave-active {
	transition: opacity .4s, transform .4s, translate .4s;
}
.example-tag-enter-from,
.example-tag-leave-to {
	opacity: 0;
	translate: -50% 0;
	transform: scaleX(0);
}

</style>

<script lang="ts" setup>

import { ref, unref } from 'vue'

const list = ref([{ index: 0, label: 'editable=true' }])
const nextIndex = ref(1)

function onClose(index: number) {
	list.value = unref(list).filter((item) => item.index !== index)
}

function onInsert(val: string) {
	list.value.push({ index: unref(nextIndex), label: val })
	nextIndex.value++
}

</script>