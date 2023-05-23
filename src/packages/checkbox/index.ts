import { App } from 'vue'
import Checkbox from './checkbox.vue'
import CheckboxGroup from './checkbox-group.vue'

export { Checkbox, CheckboxGroup }
export default {
	install: (app: App<Element>) => {
		app.component(Checkbox.name, Checkbox)
		app.component(CheckboxGroup.name, CheckboxGroup)
	}
}