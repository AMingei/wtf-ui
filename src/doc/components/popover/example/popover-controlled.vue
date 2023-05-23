<template>
	<wtf-popover confirm-button="OK" cancel-button="cancel">
		<template #content>
			阿巴阿巴，<br />
			这是一个可关闭的 Popover。
		</template>
		<div class="example-box" tabindex="1">x</div>
	</wtf-popover>
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