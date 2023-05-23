<template>
	<wtf-content width="520px">
		<wtf-header flex gap=".5em" justify="center">
			<wtf-popover placement="top-start">
				<template #content>阿巴阿巴</template>
				<div class="example-box">top-start<div>another</div></div>
			</wtf-popover>
			<wtf-popover placement="top">
				<template #content>阿巴阿巴</template>
				<div class="example-box">top</div>
			</wtf-popover>
			<wtf-popover placement="top-end">
				<template #content>阿巴阿巴</template>
				<div class="example-box">top-end</div>
			</wtf-popover>
		</wtf-header>
		<wtf-content>
			<wtf-left flex vertical gap=".5em" justify="center">
				<wtf-popover placement="left-start">
					<template #content>阿巴阿巴</template>
					<div class="example-box">left-start</div>
				</wtf-popover>
				<wtf-popover placement="left">
					<template #content>阿巴阿巴</template>
					<div class="example-box">left</div>
				</wtf-popover>
				<wtf-popover placement="left-end">
					<template #content>阿巴阿巴</template>
					<div class="example-box">left-end</div>
				</wtf-popover>
			</wtf-left>
			<wtf-content></wtf-content>
			<wtf-right flex vertical gap=".5em" justify="center">
				<wtf-popover placement="right-start">
					<template #content>阿巴阿巴</template>
					<div class="example-box">right-start</div>
				</wtf-popover>
				<wtf-popover placement="right">
					<template #content>阿巴阿巴</template>
					<div class="example-box">right</div>
				</wtf-popover>
				<wtf-popover placement="right-end">
					<template #content>阿巴阿巴</template>
					<div class="example-box">right-end</div>
				</wtf-popover>
			</wtf-right>
		</wtf-content>
		<wtf-footer flex gap=".5em" justify="center">
			<wtf-popover placement="bottom-start">
				<template #content>阿巴阿巴</template>
				<div class="example-box">bottom-start</div>
			</wtf-popover>
			<wtf-popover placement="bottom">
				<template #content>阿巴阿巴</template>
				<div class="example-box">bottom</div>
			</wtf-popover>
			<wtf-popover placement="bottom-end">
				<template #content>阿巴阿巴</template>
				<div class="example-box">bottom-end</div>
			</wtf-popover>
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