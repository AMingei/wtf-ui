<template>
	<wtf-space vertical>
		<wtf-radio-group name="example-event-1" v-model="currentValue" :value="defaultValue">
			<wtf-space>
				<wtf-radio v-for="force in threeKingdoms"
				:key="force.index"
				:value="force.label"
				@focus="(event: FocusEvent) => focus(event, force.label)"
				@focusout="(event: FocusEvent) => focusout(event, force.label)"
				@change="(value: boolean) => change(value, force.label)">
					{{ force.label }}
				</wtf-radio>
			</wtf-space>
		</wtf-radio-group>
		<span style="display: inline-block">{{ state }}</span>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const state = ref<string[]>([])

const threeKingdoms = [{ index: 0, label: '魏国' }, { index: 1, label: '蜀国' }, { index: 2, label: '吴国' }]

const defaultValue = threeKingdoms[0].label
const currentValue = ref(defaultValue)

function focus(event: FocusEvent, target: string) {
	state.value.push(`${target} focus`)
}
function focusout(event: FocusEvent, target: string) {
	state.value.push(`${target} focusout`)
}
function change(value: boolean, target: string) {
	state.value.push(`${target} change ${value}`)
}
</script>