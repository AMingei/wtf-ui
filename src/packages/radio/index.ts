import { App } from 'vue'
import Radio from './radio.vue'
import RadioGroup from './radio-group.vue'

export { Radio, RadioGroup }
export default {
	install: (app: App<Element>) => {
		app.component(Radio.name, Radio)
		app.component(RadioGroup.name, RadioGroup)
	}
}