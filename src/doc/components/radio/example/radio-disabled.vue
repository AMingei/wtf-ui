<template>
	<wtf-space vertical>
		<wtf-space>
			<wtf-radio-group name="example-disabled" v-model="currentValue_1">
				<wtf-space>
					<wtf-radio v-for="force in threeKingdoms_1"
					:key="force.index"
					:value="force.index"
					:disabled="(force as any).isDisabled">
						{{ force.label }}
					</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
			禁用选项 将无法被聚焦、更改、提交。
		</wtf-space>

		<wtf-space style="align-items: baseline;">
			<wtf-radio-group name="example-readonly" v-model="currentValue_2">
				<wtf-space>
					<wtf-radio v-for="force in threeKingdoms_2"
					:key="force.index"
					:value="force.index"
					:readonly="(force as any).isReadonly">
						{{ force.label }}
					</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
			<span>
				只读选项 将无法被用户直接更改，可以通过访问 expose 或修改单选组的绑定值进行更改；
				<button @click="currentValue_2=2">click this</button>
				<br/>
				当只读选项被<ruby>选中<rt>checked</rt></ruby>时选项组内的其他选项同样无法被直接更改。
				<button @click="currentValue_2=0">click this</button>
			</span>
		</wtf-space>

		<wtf-space>
			<wtf-radio-group disabled
			name="example-disabled-group" v-model="currentValue_3">
				<wtf-space>
					<wtf-radio v-for="force in threeKingdoms_3 as typeof threeKingdoms"
					:key="force.index"
					:value="force.index">
						{{ force.label }}
					</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
			在单选组上进行组禁用。
		</wtf-space>
		
		<wtf-space>
			<wtf-radio-group readonly
			name="example-readonly-group" v-model="currentValue_4">
				<wtf-space>
					<wtf-radio v-for="force in threeKingdoms_4 as typeof threeKingdoms"
					:key="force.index"
					:value="force.index">
						{{ force.label }}
					</wtf-radio>
				</wtf-space>
			</wtf-radio-group>
			在单选组上进行组只读。
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const threeKingdoms = [{ index: 0, label: '魏国' }, { index: 1, label: '蜀国' }, { index: 2, label: '吴国' }]
const threeKingdoms_1 = threeKingdoms.map(item => item.index == 2 ? { index: 2, label: '禁用', isDisabled: true } : item )
const threeKingdoms_2 = threeKingdoms.map(item => item.index == 2 ? { index: 2, label: '只读', isReadonly: true } : item )
const threeKingdoms_3 = threeKingdoms.map(item => new Object({ index: item.index, label: '禁用' }))
const threeKingdoms_4 = threeKingdoms.map(item => new Object({ index: item.index, label: '只读' }))

const currentValue_1 = ref(0)
const currentValue_2 = ref(0)
const currentValue_3 = ref(0)
const currentValue_4 = ref(0)
</script>