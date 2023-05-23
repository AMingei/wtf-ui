<template>
	<wtf-space>
		<div class="container">
			<wtf-tooltip title="阿巴阿巴"
			placement="top"
			trigger-mode="always"
			:skidding="skidding"
			:distance="distance">
				<div class="example-box">offset</div>
			</wtf-tooltip>
			<div class="skidding-box">skidding {{ skidding }}px</div>
			<div class="skidding-box-2" :style="{ top: `calc(50% - ${distance + 57.8}px)`, bottom: `calc(50% + ${distance + 20 - 10}px)`, left: `calc(50% + ${skidding - 1}px` }"></div>
			<div class="distance-box" :style="{ top: `calc(50% - ${distance + 22}px)` }">distance {{ distance }}px</div>
		</div>
		<wtf-space vertical>
			<wtf-space>
				skidding
				<wtf-number v-model="skidding" suffix="px" controller />
			</wtf-space>
			<wtf-space>
				distance
				<wtf-number v-model="distance" suffix="px" controller />
			</wtf-space>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const skidding = ref(10)
const distance = ref(20)

</script>

<style lang="less" scoped>
.container {
	width: 280px;
	height: 200px;
	position: relative;
	.example-box {
		box-sizing: border-box;
		width: 100px;
		height: 40px;
		position: absolute;
		inset: calc(50% - 20px) auto auto calc(50% - 50px);
		z-index: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: .25em;
		background-color: lightgray;
		user-select: none;
	}
	.skidding-box {
		box-sizing: border-box;
		position: absolute;
		inset: 5% 5% 5% calc(50% - 1px);
		display: flex;
		justify-content: center;
		align-items: start;
		border-left: 2px dotted SandyBrown;
		color: brown;
		font-size: .8em;
		z-index: 0;
	}
	.skidding-box-2 {
		box-sizing: border-box;
		position: absolute;
		inset: 5% 5% 50% calc(50% - 1px);
		border-left: 2px solid brown;
		z-index: 0;
	}
	.distance-box {
		box-sizing: border-box;
		position: absolute;
		inset: auto 5% calc(50% + 18px) 5%;
		display: flex;
		justify-content: end;
		align-items: center;
		border-top: 2px dotted lightgray;
		border-bottom: 2px dotted lightgray;
		color: gray;
		font-size: .8em;
	}
}
</style>