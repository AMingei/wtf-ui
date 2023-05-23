<template>
	<wtf-space width="500px">
		<wtf-form
		:label-width="labelWidth + 'px'"
		:label-align="labelAlign"
		:input-align="inputAlign">
			<wtf-form-item label="文本录入">
				<wtf-input v-model="formData.input" placeholder="input" />
			</wtf-form-item>
			<wtf-form-item label="文本录入">
				<wtf-input v-model="formData.textarea" placeholder="textarea" type="textarea" />
			</wtf-form-item>
			<wtf-form-item label="开关">
				<wtf-switch v-model="formData.switch" text-on="switch on" text-off="switch off" />
			</wtf-form-item>
			<wtf-form-item input-align="end">
				<wtf-space>
					<button type="button">submit</button>
				</wtf-space>
			</wtf-form-item>
		</wtf-form>
	</wtf-space>
	<wtf-space width="calc(100% - 500px)" vertical>
		<wtf-space width="240px">
			<span>label-width</span>
			<wtf-number v-model="labelWidth" size="smaller" suffix="px" content-style="width: 150px" auto-fit controller />
		</wtf-space>
		<wtf-space>
			label-align
			<wtf-radio-group v-model="labelAlign" name="label-align">
				<wtf-space>
					<wtf-radio value="start">start</wtf-radio>
					<wtf-radio value="center">center</wtf-radio>
					<wtf-radio value="end">end</wtf-radio>
					<wtf-radio value="">undefined</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
		</wtf-space>
		<wtf-space>
			input-align
			<wtf-radio-group v-model="inputAlign" name="input-align">
				<wtf-space>
					<wtf-radio value="start">start</wtf-radio>
					<wtf-radio value="center">center</wtf-radio>
					<wtf-radio value="end">end</wtf-radio>
					<wtf-radio value="">undefined</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

interface TFormData {
	input?: string,
	textarea?: string,
	switch?: boolean
}

const formData = reactive<TFormData>({})

const labelWidth = ref(80)
const labelAlign = ref('end')
const inputAlign = ref('')
</script>