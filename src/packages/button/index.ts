import { App } from 'vue'
import Button from './index.vue'

export default {
	install: (app: App<Element>) => {
		app.component(Button.name, Button)
	}
}