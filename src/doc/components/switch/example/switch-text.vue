<template>
	<wtf-space>
		<wtf-switch text-off="关" text-on="开" />
		<wtf-switch text-off="OFF" text-on="ON" />
		<wtf-switch>
			<template #textoff>
				<svg width="1.2em" height="1.2em" style="color: gray" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M279.1,48h-46.2v231.1h46.2V48z M390.7,98.2L357.9,131c36.5,29.4,59.9,74.4,59.9,125c0,89.4-72.3,161.8-161.8,161.8 S94.2,345.4,94.2,256c0-50.6,23.3-95.7,59.6-125.3l-32.6-32.6C76.4,136.3,48,192.7,48,256c0,114.9,93.1,208,208,208 s208-93.1,208-208C464,192.7,435.6,136.3,390.7,98.2z"></path></svg>
			</template>
			<template #texton>
				<svg width="1.2em" height="1.2em" style="color: yellow" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve"><path fill="currentColor" d="M279.1,48h-46.2v231.1h46.2V48z M390.7,98.2L357.9,131c36.5,29.4,59.9,74.4,59.9,125c0,89.4-72.3,161.8-161.8,161.8 S94.2,345.4,94.2,256c0-50.6,23.3-95.7,59.6-125.3l-32.6-32.6C76.4,136.3,48,192.7,48,256c0,114.9,93.1,208,208,208 s208-93.1,208-208C464,192.7,435.6,136.3,390.7,98.2z"></path></svg>
			</template>
		</wtf-switch>
	</wtf-space>
</template>