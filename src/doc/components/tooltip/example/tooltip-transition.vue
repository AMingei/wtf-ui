<template>
	<wtf-tooltip title="阿巴阿巴" transition="bounce">
		<div class="example-box">HTML</div>
	</wtf-tooltip>
</template>

<style lang="less">
.bounce-enter-active { animation: bounce-in .5s }
.bounce-leave-active { transition: opacity .4s }
.bounce-leave-to { opacity: 0 }
@keyframes bounce-in {
	0%, 100% { opacity: 1 }
	50% { opacity: .25 }
}
</style>

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