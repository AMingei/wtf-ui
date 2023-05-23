import { App } from 'vue'
import Slider from './slider.vue'

export { Slider }
export default {
	install: (app: App<Element>) => {
		app.component(Slider.name, Slider)
	}
}