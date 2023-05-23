<template>
	<wtf-space>
		<wtf-card width="320px" ratio="3" :bordered="false">
			bordered = false
			<br />shadow = "none" (default)
		</wtf-card>
		<wtf-card width="320px" ratio="3" :bordered="false" shadow="hover">
			bordered = false
			<br />shadow = "hover"
		</wtf-card>
		<wtf-card width="320px" ratio="3" :bordered="false" shadow="always">
			bordered = false
			<br />shadow = "always"
		</wtf-card>
	</wtf-space>
</template>