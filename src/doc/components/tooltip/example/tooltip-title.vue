<template>
	<div class="example-box" v-title:top.raw="'<strong>阿巴阿巴</strong>'">directive</div>
</template>

<script lang="ts" setup>
import { vTitle } from '@/packages'
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