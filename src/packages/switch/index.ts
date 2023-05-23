import { App } from 'vue'
import Switch from './switch.vue'

export default {
	install: (app: App<Element>) => {
		app.component(Switch.name, Switch)
	}
}