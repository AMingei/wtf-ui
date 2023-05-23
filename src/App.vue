<script lang="ts" setup>
import { setTheme } from './packages'
function fun() {
	setTheme('dark')
}
function fun1() {
	setTheme('light')
}
</script>

<template>
	<wtf-content tag-name="article" height="100vh" border-style="lightgray">
		<wtf-header height="50px" back="blue">
			<router-link :to="{ name: 'Homepage' }">Homepage</router-link>
			<router-link :to="{ name: 'Components' }">Components</router-link>
			<button @click="fun">变</button>
			<button @click="fun1">变</button>
		</wtf-header>
		<wtf-content>
			<router-view></router-view>
		</wtf-content>
	</wtf-content>
</template>

<style lang="less" scoped>

</style>