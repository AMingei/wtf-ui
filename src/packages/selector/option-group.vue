<template>
	<div class="wtf-option-group">
		<div :class="`wtf-option-group-label ${label ? '' : 'invisible'}`">
			<wtf-d text-float="left">{{ label }}</wtf-d>
		</div>
		<slot></slot>
	</div>
</template>

<script lang="ts" setup>

import './option-group.less'
import WtfD from '../divider/divider.vue'
import { provide, ref } from 'vue'
import { OPTIONGROUP_PROVIDE_KEY } from './option-group'

defineOptions({
	name: 'WtfOptionGroup'
})

const props = withDefaults(defineProps<{
	label?: string,
	disabled?: boolean
}>(), {})

provide(OPTIONGROUP_PROVIDE_KEY, {
	isDisabled: ref(props.disabled)
})

</script>
