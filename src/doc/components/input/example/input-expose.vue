<template>
	<wtf-space width="50%" vertical>
		<wtf-input ref="input" :value="text" />
		<wtf-space>
			<button @click="input.focus">focus</button>
			<button tabindex="-1" @click="input.focusout" @mousedown.prevent @keydown.prevent>focusout</button>
			<button @click="input.reset">reset</button>
			<button @click="input.select">select</button>
			<button @click="input.select(0, 10)">select: 0 ~ 10</button>
			<button @click="input.scrollTo(100)">scrollTo: 100</button>
			<button @click="input.scrollBy(100)">scrollBy: 100</button>
		</wtf-space>
	</wtf-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const input = ref()
const text = '赵钱孙李 周吴郑王 冯陈褚卫 蒋沈韩杨 朱秦尤许 何吕施张 孔曹严华 金魏陶姜 戚谢邹喻 柏水窦章 云苏潘葛 奚范彭郎 鲁韦昌马 苗凤花方 俞任袁柳 酆鲍史唐'
</script>