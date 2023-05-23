<template>
	<wtf-space style="padding-bottom: 1.75em;" gap="1.75em" width="50%" vertical>
		<wtf-input placeholder="请输入用户名" :feedback="foo" />
		<wtf-input placeholder="请输入用户名" :feedback="bar" />
		<wtf-input placeholder="请输入用户名" :feedback="baz" />
	</wtf-space>
</template>

<script lang="ts" setup>
const content = {
	pass: '当前用户名可用',
	fail: '用户名已被占用，请重新选择',
	judge: '正在检测用户名可用性，请稍候……'
}
const foo = {
	isShown: true,
	isPassed: true,
	isJudging: false,
	content
}
const bar = {
	isShown: true,
	isPassed: false,
	isJudging: false,
	content
}
const baz = {
	isShown: true,
	isPassed: true,
	isJudging: true,
	content
}
</script>