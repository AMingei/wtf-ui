<template>
	<wtf-space width="600px">
		<wtf-selector style="flex: auto" v-model="value_1">
			<wtf-option :value="1" label="第一回：宴桃园豪杰三结义 斩黄巾英雄首立功" />
			<wtf-option :value="2" label="第二回：张翼德怒鞭督邮 何国舅谋诛宦竖" />
			<wtf-option :value="3" label="第三回：议温明董卓叱丁原 馈金珠李肃说吕布" />
		</wtf-selector>
		<wtf-selector style="flex: auto" v-model="value_2">
			<wtf-option v-for="(item, index) in new Array(12)" :value="index + 1" :label="`第${index + 1}回`" />
		</wtf-selector>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value_1 = ref(1)
const value_2 = ref(1)

</script>