<template>
	<wtf-space vertical>
		<wtf-checkbox-group name="example-event-3"
		v-model="currentValue"
		:value="defaultValue"
		@change="change"
		@focus="focus"
		@focusout="focusout">
			<wtf-space>
				<wtf-checkbox v-for="force in threeKingdoms"
				:key="force.index"
				:value="force.label">
					{{ force.label }}
				</wtf-checkbox>
			</wtf-space>
		</wtf-checkbox-group>
		<span style="display: inline-block">{{ state }}</span>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const state = ref<string[]>([])

const threeKingdoms = [{ index: 0, label: '魏国' }, { index: 1, label: '蜀国' }, { index: 2, label: '吴国' }]

const defaultValue = ['魏国']
const currentValue = ref(defaultValue)

function focus() {
	state.value.push('focus')
}
function focusout() {
	state.value.push('focusout')
}
function change(value: boolean) {
	state.value.push(`change ${value}`)
}
</script>