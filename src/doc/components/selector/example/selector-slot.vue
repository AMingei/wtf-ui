<template>
	<wtf-space width="290px">
		<wtf-selector v-model="value">
			<wtf-option-group v-for="group in groups"
			:key="group.index"
			:label="group.label">
				<wtf-option v-for="item in group.content"
				:key="item.index"
				:value="item.value"
				:label="item.label">
					<div class="example-option">
						<svg v-if="item.value === 1" width="1.25em" height="1.25em" style="color: brown" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 576 512"><path d="M575.92 76.6c-.01-8.13-3.02-15.87-8.58-21.8c-3.78-4.03-8.58-9.12-13.69-14.5c11.06-6.84 19.5-17.49 22.18-30.66C576.85 4.68 572.96 0 567.9 0H447.92c-70.69 0-128 57.31-128 128H160c-28.84 0-54.4 12.98-72 33.11V160c-48.53 0-88 39.47-88 88v56c0 8.84 7.16 16 16 16h16c8.84 0 16-7.16 16-16v-56c0-13.22 6.87-24.39 16.78-31.68c-.21 2.58-.78 5.05-.78 7.68c0 27.64 11.84 52.36 30.54 69.88l-25.72 68.6a63.945 63.945 0 0 0-2.16 37.99l24.85 99.41A15.982 15.982 0 0 0 107.02 512h65.96c10.41 0 18.05-9.78 15.52-19.88l-26.31-105.26l23.84-63.59L320 345.6V496c0 8.84 7.16 16 16 16h64c8.84 0 16-7.16 16-16V318.22c19.74-20.19 32-47.75 32-78.22c0-.22-.07-.42-.08-.64V136.89l16 7.11l18.9 37.7c7.45 14.87 25.05 21.55 40.49 15.37l32.55-13.02a31.997 31.997 0 0 0 20.12-29.74l-.06-77.71zm-64 19.4c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z" fill="currentColor"></path></svg>
						<svg v-else-if="item.value === 2" width="1.25em" height="1.25em" style="color: purple" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M16.67 13.13C18.04 14.06 19 15.32 19 17v3h4v-3c0-2.18-3.57-3.47-6.33-3.87zM15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4c-.47 0-.91.1-1.33.24a5.98 5.98 0 0 1 0 7.52c.42.14.86.24 1.33.24zm-6 0c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1z" fill="currentColor"></path></svg>
						<svg v-else-if="item.value === 3" width="1.25em" height="1.25em" style="color: goldenrod" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 10V6a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4"></path><path d="M16 15v-2a3 3 0 1 1 3 3v3H5v-3a3 3 0 1 1 3-3v2"></path><path d="M8 12h8"></path><path d="M7 19v2"></path><path d="M17 19v2"></path></g></svg>
						{{ item.label }}
					</div>
				</wtf-option>
			</wtf-option-group>
		</wtf-selector>
	</wtf-space>
</template>

<script lang="ts" setup>

import { ref } from 'vue'

const value = ref(1)

const groups = [{
	index: 0,
	label: '第一部 群雄逐鹿',
	content: [
		{ index: 0, value: 1, label: '第一集：桃园三结义' },
		{ index: 1, value: 2, label: '第二集：十常侍乱政' },
		{ index: 2, value: 3, label: '第三集：董卓霸京师' },
	]
}]

</script>

<style lang="less" scoped>
.example-option {
	display: flex;
	align-items: center;
	gap: .5em;
}
</style>