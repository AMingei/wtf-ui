<template>
	<wtf-space>
		<wtf-button type="primary" has-icon>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M3 5v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2H5a2 2 0 0 0-2 2zm12 4c0 1.66-1.34 3-3 3s-3-1.34-3-3s1.34-3 3-3s3 1.34 3 3zm-9 8c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6v-1z" fill="currentColor"></path></svg>
			</template>
			Profile
		</wtf-button>

		<wtf-button type="success" priority="secondary" round has-icon>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z" fill="currentColor"></path><path d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" fill="currentColor"></path></svg>
			</template>
			Time Out!
		</wtf-button>

		<wtf-button type="warning" priority="tertiary" disabled has-icon>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3l18 18"></path><path d="M14.828 9.172A4 4 0 0 1 16 12"></path><path d="M17.657 6.343a8 8 0 0 1 1.635 8.952"></path><path d="M9.168 14.828a4 4 0 0 1 0-5.656"></path><path d="M6.337 17.657a8 8 0 0 1 0-11.314"></path></g></svg>
			</template>
			Warning
		</wtf-button>

		<wtf-button type="error" priority="quaternary" has-icon>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11.933 5H5v16h13v-8"></path><path d="M14 17H9"></path><path d="M9 13h5V9H9z"></path><path d="M15 5V3"></path><path d="M18 6l2-2"></path><path d="M19 9h2"></path></g></svg>
			</template>
			Print Log
		</wtf-button>
	</wtf-space>
</template>