import { App } from 'vue'
import Input from './input.vue'
import InputGroup from './input-group.vue'
import Number from './number.vue'

export { Input, InputGroup, Number }
export default {
	install: (app: App<Element>) => {
		app.component(Input.name, Input)
		app.component(InputGroup.name, InputGroup)
		app.component(Number.name, Number)
	}
}