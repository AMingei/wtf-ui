<template>
	<wtf-content width="520px">
		<wtf-header flex gap=".5em" justify="center">
			<wtf-tooltip placement="top-start" title="阿巴阿巴">
				<div class="example-box">top-start</div>
			</wtf-tooltip>
			<wtf-tooltip placement="top" title="阿巴阿巴">
				<div class="example-box">top</div>
			</wtf-tooltip>
			<wtf-tooltip placement="top-end" title="阿巴阿巴">
				<div class="example-box">top-end</div>
			</wtf-tooltip>
		</wtf-header>
		<wtf-content>
			<wtf-left flex vertical gap=".5em" justify="center">
				<wtf-tooltip placement="left-start" title="阿巴阿巴">
					<div class="example-box">left-start</div>
				</wtf-tooltip>
				<wtf-tooltip placement="left" title="阿巴阿巴">
					<div class="example-box">left</div>
				</wtf-tooltip>
				<wtf-tooltip placement="left-end" title="阿巴阿巴">
					<div class="example-box">left-end</div>
				</wtf-tooltip>
			</wtf-left>
			<wtf-content></wtf-content>
			<wtf-right flex vertical gap=".5em" justify="center">
				<wtf-tooltip placement="right-start" title="阿巴阿巴">
					<div class="example-box">right-start</div>
				</wtf-tooltip>
				<wtf-tooltip placement="right" title="阿巴阿巴">
					<div class="example-box">right</div>
				</wtf-tooltip>
				<wtf-tooltip placement="right-end" title="阿巴阿巴">
					<div class="example-box">right-end</div>
				</wtf-tooltip>
			</wtf-right>
		</wtf-content>
		<wtf-footer flex gap=".5em" justify="center">
			<wtf-tooltip placement="bottom-start" title="阿巴阿巴">
				<div class="example-box">bottom-start</div>
			</wtf-tooltip>
			<wtf-tooltip placement="bottom" title="阿巴阿巴">
				<div class="example-box">bottom</div>
			</wtf-tooltip>
			<wtf-tooltip placement="bottom-end" title="top-阿巴阿巴">
				<div class="example-box">bottom-end</div>
			</wtf-tooltip>
		</wtf-footer>
	</wtf-content>
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