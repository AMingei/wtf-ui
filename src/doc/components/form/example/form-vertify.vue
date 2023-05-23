<template>
	<wtf-space width="500px">
		<wtf-form
		:vertify="formRule"
		@submit="submit">
			<wtf-form-item label="文本录入" path="input">
				<wtf-input v-model="formData.input" placeholder="input" />
			</wtf-form-item>
			<wtf-form-item label="文本录入" path="password">
				<wtf-input v-model="formData.password" placeholder="password" type="password" resetable />
			</wtf-form-item>
			<wtf-form-item label="文本录入">
				<wtf-input v-model="formData.textarea" placeholder="textarea" type="textarea" />
			</wtf-form-item>
			<wtf-form-item label="数字录入">
				<wtf-number v-model="formData.number" placeholder="number" controller resetable />
			</wtf-form-item>
			<wtf-form-item label="开关">
				<wtf-switch v-model="formData.switch" text-on="switch on" text-off="switch off" />
			</wtf-form-item>
			<wtf-form-item label="单选">
				<wtf-radio-group v-model="formData.radio" name="radio">
					<wtf-space>
						<wtf-radio :value="0">radio 1</wtf-radio>
						<wtf-radio :value="1">radio 2</wtf-radio>
						<wtf-radio :value="2">radio 3</wtf-radio>
					</wtf-space>
				</wtf-radio-group>
			</wtf-form-item>
			<wtf-form-item label="多选">
				<wtf-radio-group name="checkbox">
					<wtf-space>
						<wtf-radio value="0">checkbox 1</wtf-radio>
						<wtf-radio value="1">checkbox 2</wtf-radio>
						<wtf-radio value="2">checkbox 3</wtf-radio>
					</wtf-space>
				</wtf-radio-group>
			</wtf-form-item>
			<wtf-form-item input-align="end">
				<wtf-space>
					<button type="submit">submit</button>
				</wtf-space>
			</wtf-form-item>
		</wtf-form>
	</wtf-space>
	<wtf-space width="calc(100% - 500px)">
		<span style="flex: auto">表单数据 {{ formData }}</span>
	</wtf-space>
</template>

<script lang="ts" setup>
import { FormRules } from '@/packages'
import { reactive } from 'vue'

interface FormData {
	input?: string,
	password?: string,
	textarea?: string,
	number?: number,
	switch?: boolean,
	radio?: number
}

const formData = reactive<FormData>({
	input: undefined,
	password: undefined,
	textarea: undefined,
	number: undefined,
	switch: undefined,
	radio: undefined
})


const formRule = reactive<FormRules>({
	input: [
		// { required: true, message: 'it\'s required!' }
		{ custom: (value) => {
			if(!value) {
				throw new Error('it\'s empty')
			} else if(value === 'aaa') {
				throw new Error('it\'s aaa')
			}
			return true
		}, listener: ['input', 'focusout'] }
	],
	password: [{ required: true, message: 'it\'s required!', listener: 'focusout' }]
})

function submit(passed: boolean) {
	if(passed) {
		console.log('submit')
	} else {
		console.log('fail')
	}
}
</script>