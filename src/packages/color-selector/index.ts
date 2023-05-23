import { App } from 'vue'
import ColorSelector from './color-selector.vue'

export { ColorSelector }
export default {
	install: (app: App<Element>) => {
		app.component(ColorSelector.name, ColorSelector)
	}
}