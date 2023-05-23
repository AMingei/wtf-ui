export type TTheme = 'light' | 'dark' | undefined

export const setTheme = (theme: TTheme) => {
	localStorage.setItem('wtf-theme', theme || 'light')
	if(theme === 'dark') {
		document.body.className = theme
	} else {
		document.body.removeAttribute('class')
	}
}

export const getTheme = () => localStorage.getItem('wtf-theme') as TTheme

export const initTheme = () => {
	import('./theme/theme.css')
	import('./theme/theme-dark.css')
	const currentTheme = getTheme()
	setTheme(currentTheme)
}