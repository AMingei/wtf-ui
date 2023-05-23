<template>
	<form ref="obj" @submit="sub" novalidate>
		<wtf-space width="50%">
			<label for="example-vertify-1" style="width: 15%">必填选项</label>
			<wtf-number id="example-vertify-1" style="flex: auto" placeholder="Please input a number..." required />
		</wtf-space>
		<button type="submit">提交</button>
	</form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const obj = ref('obj')
function sub(event: Event) {
	const objdom = obj.value as unknown as HTMLElement
	const inputs = objdom.querySelectorAll('input')
	for(let input of Array.from(inputs)) {
		input.focus()
		input.blur()
		const validity = input.validity
		if(validity.valueMissing || validity.patternMismatch) {
			input.focus()
			break
		}
	}
	event.preventDefault()
}
</script>