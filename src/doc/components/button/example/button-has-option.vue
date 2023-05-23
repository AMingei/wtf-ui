<template>
	<wtf-space>
		<wtf-button type="primary" round has-option breathing>
			<template #option>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M17.25 5h-2.364a2.501 2.501 0 0 0-4.771 0H2.75a.75.75 0 0 0 0 1.5h7.364a2.501 2.501 0 0 0 4.771 0h2.365a.75.75 0 0 0 0-1.5zm-14.5 8.5a.75.75 0 0 0 0 1.5h2.364a2.501 2.501 0 0 0 4.772 0h7.364a.75.75 0 0 0 0-1.5H9.886a2.501 2.501 0 0 0-4.772 0H2.75z" fill="currentColor"></path></g></svg>
			</template>
			Optional
		</wtf-button>

		<wtf-button has-icon has-option>
			<template #icon>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M13.387 3.425l6.365 4.243a1 1 0 0 1 0 1.664l-6.365 4.244a2.5 2.5 0 0 1-2.774 0L4.248 9.332a1 1 0 0 1 0-1.664l6.365-4.243a2.5 2.5 0 0 1 2.774 0zm6.639 8.767a2.002 2.002 0 0 1-.577.598l-6.05 4.084a2.5 2.5 0 0 1-2.798 0l-6.05-4.084a2 2 0 0 1-.779-2.29l6.841 4.56a2.5 2.5 0 0 0 2.613.098l.16-.098l6.841-4.56a1.996 1.996 0 0 1-.201 1.692zm0 3.25a2.002 2.002 0 0 1-.577.598l-6.05 4.084a2.5 2.5 0 0 1-2.798 0l-6.05-4.084a2 2 0 0 1-.779-2.29l6.841 4.56a2.5 2.5 0 0 0 2.613.098l.16-.098l6.841-4.56a1.996 1.996 0 0 1-.201 1.692z" fill="currentColor"></path></g></svg>
			</template>
			<template #option>
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill="currentColor"></path></svg>
			</template>
			Too many characters in this button's default slot
		</wtf-button>
	</wtf-space>
</template>