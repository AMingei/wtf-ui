import { App } from 'vue'
import Divider from './divider.vue'

export { Divider }
export default {
	install: (app: App<Element>) => {
		app.component(Divider.name, Divider)
	}
}