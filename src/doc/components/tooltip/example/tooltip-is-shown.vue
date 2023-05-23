<template>
	<wtf-space gap=".5em">
		<wtf-tooltip placement="top" title="阿巴阿巴" :is-shown="isShown">
			<div class="example-box">trigger me</div>
		</wtf-tooltip>
		<div class="example-box"
		@mouseenter="isShown = true"
		@mouseleave="isShown = false">hover me</div>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const isShown = ref(false)

</script>

<style lang="less" scoped>
.example-box {
	box-sizing: border-box;
	width: 100px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: .25em;
	background-color: lightgray;
	user-select: none;
}
</style>