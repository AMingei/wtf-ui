<template>
	<wtf-space>
		<wtf-checkbox ref="checkAllRef" :indeterminate="indeterminate" @click="onClick">全选</wtf-checkbox>
		<wtf-checkbox-group name="example-group-2" v-model="currentValue" :value="defaultValue">
			<wtf-space>
				<wtf-checkbox value="魏国">魏国</wtf-checkbox>
				<wtf-checkbox value="蜀国">蜀国</wtf-checkbox>
				<wtf-checkbox value="吴国">吴国</wtf-checkbox>
				{{ currentValue }}
			</wtf-space>
		</wtf-checkbox-group>
	</wtf-space>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const kingdoms = ['魏国', '蜀国', '吴国']
const defaultValue = [kingdoms[0]]
const currentValue = ref(defaultValue)

const checkAllRef = ref()
const indeterminate = computed(() => currentValue.value.length > 0 && currentValue.value.length < kingdoms.length)

watch(() => currentValue.value, (val) => {
	if(val.length === kingdoms.length) {
		checkAllRef.value.check()
	} else {
		checkAllRef.value.uncheck()
	}
})

function onClick() {
	currentValue.value = currentValue.value.length === kingdoms.length ? [] : kingdoms
}
</script>