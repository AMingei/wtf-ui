<template>
	<wtf-space width="290px">
		<wtf-selector v-model="value" auto-title>
			<wtf-option :value="1" label="第一回：宴桃园豪杰三结义 斩黄巾英雄首立功" />
			<wtf-option :value="2" label="第二回：张翼德怒鞭督邮 何国舅谋诛宦竖" />
			<wtf-option :value="3" label="第三回：议温明董卓叱丁原 馈金珠李肃说吕布" />
		</wtf-selector>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(1)

</script>