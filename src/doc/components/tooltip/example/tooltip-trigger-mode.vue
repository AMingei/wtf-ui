<template>
	<wtf-space gap=".5em">
		<wtf-tooltip placement="top" title="阿巴阿巴">
			<div class="example-box" tabindex="1">hover</div>
		</wtf-tooltip>
		<wtf-tooltip placement="top" title="阿巴阿巴" trigger-mode="focus">
			<div class="example-box" tabindex="1">focus</div>
		</wtf-tooltip>
		<wtf-tooltip placement="top" title="阿巴阿巴" trigger-mode="click">
			<div class="example-box" tabindex="1">click</div>
		</wtf-tooltip>
		<wtf-tooltip placement="top" title="阿巴阿巴" trigger-mode="contextmenu">
			<div class="example-box" tabindex="1">contextmenu</div>
		</wtf-tooltip>
		<wtf-tooltip placement="top" title="阿巴阿巴" trigger-mode="always">
			<div class="example-box" tabindex="1">always</div>
		</wtf-tooltip>
	</wtf-space>
</template>

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