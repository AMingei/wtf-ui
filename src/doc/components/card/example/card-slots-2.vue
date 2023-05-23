<template>
	<wtf-space>
		<wtf-card width="320px" height="330px" :innerStyle="{ textIndent: '2em' }">
			<template #banner>
				<img src="./card-example.png" alt="第一集：桃园三结义" />
			</template>
			<template #header>第一回&ensp;宴桃园豪杰三结义 斩黄巾英雄首立功</template>
			<template #option>
				<a href="javascript: void(0)">分享</a>
			</template>
			话说天下大势，分久必合，合久必分。周末七国分争，并入于秦。及秦灭之后，楚、汉分争，又并入于汉……
		</wtf-card>
		<wtf-card width="320px" height="330px" :bannerStyle="{ height: '198.2px' }">
			<template #banner>#banner</template>
			<template #header>#header</template>
			<template #option>#option</template>
			#default
		</wtf-card>
	</wtf-space>
</template>