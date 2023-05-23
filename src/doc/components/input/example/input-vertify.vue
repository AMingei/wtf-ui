<template>
	<form ref="obj" @submit="sub" novalidate>
		<wtf-space width="50%" vertical>
			<wtf-space>
				<label for="example-2" style="width: 15%">必填选项</label>
				<wtf-input id="example-2" style="flex: auto" placeholder="Please input something..." required />
			</wtf-space>
			<wtf-space>
				<label for="example-3" style="width: 15%">电话号码</label>
				<wtf-input id="example-3" style="flex: auto" placeholder="Please input a valid phonenumber" pattern="tel" required />
			</wtf-space>
			<wtf-space>
				<label for="example-4" style="width: 15%">电子邮件</label>
				<wtf-input id="example-4" style="flex: auto" placeholder="Please input a valid e-mail address" pattern="email" required />
			</wtf-space>
			<wtf-space>
				<label for="example-5" style="width: 15%">自定义内容</label>
				<wtf-input id="example-5" style="flex: auto" placeholder='pattern = "^[0-9]*$"' pattern="^[0-9]*$" vertify-text="只能填入数字" required />
			</wtf-space>
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