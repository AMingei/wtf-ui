import { App } from 'vue'
import DateSelector from './date-selector.vue'

export { DateSelector }
export default {
	install: (app: App<Element>) => {
		app.component(DateSelector.name, DateSelector)
	}
}