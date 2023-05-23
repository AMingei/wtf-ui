<template>
	<div :class="classList">
		<template v-if="editable">
			<svg width="1.25em" height="1.25em" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M11.75 3a.75.75 0 0 1 .743.648l.007.102l.001 7.25h7.253a.75.75 0 0 1 .102 1.493l-.102.007h-7.253l.002 7.25a.75.75 0 0 1-1.493.101l-.007-.102l-.002-7.249H3.752a.75.75 0 0 1-.102-1.493L3.752 11h7.25L11 3.75a.75.75 0 0 1 .75-.75z" fill="currentColor"></path></g></svg>
		</template>
		<div v-else class="wtf-color-block-inner" :style="styleList"></div>
	</div>
</template>

<script lang="ts" setup>

import { computed } from 'vue'
import './color-block.less'

defineOptions({
	name: 'WtfColorBlock'
})

const props = withDefaults(defineProps<{
	color?: string,
	editable?: boolean
}>(), {})

// Dom

// State

// Class & Style

const classList = computed(() => [
	'wtf-color-block',
	props.editable ? 'wtf-color-block--editable' : ''
])

const styleList = computed(() => ({
	backgroundColor: props.color
}))

// Function

// Export

</script>