<template>
	<wtf-space gap=".5em">
		<wtf-popover placement="top" trigger-mode="hover">
			<template #content>阿巴阿巴</template>
			<div class="example-box" tabindex="1">hover</div>
		</wtf-popover>
		<wtf-popover placement="top" trigger-mode="focus">
			<template #content>阿巴阿巴</template>
			<div class="example-box" tabindex="1">focus</div>
		</wtf-popover>
		<wtf-popover placement="top">
			<template #content>阿巴阿巴</template>
			<div class="example-box" tabindex="1">click</div>
		</wtf-popover>
		<wtf-popover placement="top" trigger-mode="contextmenu">
			<template #content>阿巴阿巴</template>
			<div class="example-box" tabindex="1">contextmenu</div>
		</wtf-popover>
		<wtf-popover placement="top" trigger-mode="always">
			<template #content>阿巴阿巴</template>
			<div class="example-box" tabindex="1">always</div>
		</wtf-popover>
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