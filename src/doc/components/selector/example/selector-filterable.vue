<template>
	<wtf-space width="290px">
		<wtf-selector v-model="value" filterable>
			<wtf-option-group v-for="group in groups"
			:key="group.index"
			:label="group.label">
				<wtf-option v-for="item in group.content"
				:key="item.index"
				:value="item.value"
				:label="item.label" />
			</wtf-option-group>
		</wtf-selector>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(1)

const groups = [{
	index: 0,
	label: '第一部 群雄逐鹿',
	content: [
		{ index: 0, value: 1, label: '第一集：桃园三结义' },
		{ index: 1, value: 2, label: '第二集：十常侍乱政' },
		{ index: 2, value: 3, label: '第三集：董卓霸京师' },
	]
}, {
	index: 1,
	label: '第二部 赤壁鏖战',
	content: [
		{ index: 0, value: 4, label: '第二十四集：跃马檀溪' },
		{ index: 1, value: 5, label: '第二十五集：刘备求贤' },
		{ index: 2, value: 6, label: '第二十六集：回马荐诸葛' },
	]
}, {
	index: 2,
	label: '第三部 三足鼎立',
	content: [
		{ index: 0, value: 7, label: '第四十八集：张松献图' },
		{ index: 1, value: 8, label: '第四十九集：刘备入川' },
		{ index: 2, value: 9, label: '第五十集：凤雏落坡' },
	]
}]

</script>