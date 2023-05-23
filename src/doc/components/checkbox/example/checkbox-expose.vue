<template>
	<wtf-space vertical>
		<wtf-checkbox-group name="example-event-2" v-model="currentValue" :value="defaultValue">
			<wtf-space>
				<wtf-checkbox ref="forceList"
				v-for="force in threeKingdoms"
				:key="force.index"
				:value="force.label">
					{{ force.label }}
				</wtf-checkbox>
			</wtf-space>
		</wtf-checkbox-group>
		<wtf-space>
			<button @click="forceList[1].focus">focus</button>
			<button tabindex="-1" @click="forceList[1].focusout" @mousedown.prevent @keydown.prevent>focusout</button>
			<button @click="forceList[1].check">check</button>
			<button @click="forceList[1].uncheck">uncheck</button>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { WtfRadio } from '@/packages'

const threeKingdoms = [{ index: 0, label: '魏国' }, { index: 1, label: '蜀国' }, { index: 2, label: '吴国' }]

const defaultValue = ['魏国']
const currentValue = ref(defaultValue)

const forceList = ref<InstanceType<typeof WtfRadio>[]>([])
</script>