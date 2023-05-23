import { App } from 'vue'
import Selector from './selector.vue'
import Option from './option.vue'
import OptionGroup from './option-group.vue'

export { Selector, Option, OptionGroup }
export default {
	install: (app: App<Element>) => {
		app.component(Selector.name, Selector)
		app.component(Option.name, Option)
		app.component(OptionGroup.name, OptionGroup)
	}
}