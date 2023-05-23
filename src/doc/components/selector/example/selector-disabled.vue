<template>
	<wtf-space width="600px" vertical>

		<wtf-space>
			<wtf-selector style="flex: auto" v-model="value_1" disabled>
				<wtf-option-group v-for="group in groups"
				:key="group.index"
				:label="group.label">
					<wtf-option v-for="item in group.content"
					:key="item.index"
					:value="item.value"
					:label="item.label" />
				</wtf-option-group>
			</wtf-selector>

			<wtf-selector style="flex: auto" v-model="value_2" readonly>
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

		<wtf-space>
			<wtf-selector style="flex: auto" v-model="value_3">
				<wtf-option-group v-for="group in groups"
				:key="group.index"
				:label="group.label">
					<wtf-option v-for="item in group.content"
					:key="item.index"
					:value="item.value"
					:label="item.label"
					:disabled="item.disabled" />
				</wtf-option-group>
			</wtf-selector>

			<wtf-selector style="flex: auto" v-model="value_4">
				<wtf-option-group v-for="group in groups"
				:key="group.index"
				:label="group.label"
				:disabled="group.disabled">
					<wtf-option v-for="item in group.content"
					:key="item.index"
					:value="item.value"
					:label="item.label" />
				</wtf-option-group>
			</wtf-selector>
		</wtf-space>

	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value_1 = ref(1)
const value_2 = ref(2)
const value_3 = ref(3)
const value_4 = ref(4)

const groups = [{
	index: 0,
	label: '第一部 群雄逐鹿',
	content: [
		{ index: 0, value: 1, label: '第一集：桃园三结义', disabled: true },
		{ index: 1, value: 2, label: '第二集：十常侍乱政', disabled: false },
		{ index: 2, value: 3, label: '第三集：董卓霸京师', disabled: false },
	],
	disabled: true
}, {
	index: 1,
	label: '第二部 赤壁鏖战',
	content: [
		{ index: 0, value: 4, label: '第二十四集：跃马檀溪', disabled: false },
		{ index: 1, value: 5, label: '第二十五集：刘备求贤', disabled: false },
		{ index: 2, value: 6, label: '第二十六集：回马荐诸葛', disabled: false },
	],
	disabled: false
}, {
	index: 2,
	label: '第三部 三足鼎立',
	content: [
		{ index: 0, value: 7, label: '第四十八集：张松献图', disabled: false },
		{ index: 1, value: 8, label: '第四十九集：刘备入川', disabled: false },
		{ index: 2, value: 9, label: '第五十集：凤雏落坡', disabled: false },
	],
	disabled: false
}]

</script>