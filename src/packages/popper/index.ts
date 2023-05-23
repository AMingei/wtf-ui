import { App } from 'vue'
import Tooltip from './tooltip.vue'
import Popover from './popover.vue'
import { vTitle } from './tooltip'

export { vTitle } from './tooltip'
export { Tooltip, Popover }
export default {
	install: (app: App<Element>) => {
		app.directive('v-title', vTitle)
		app.component(Tooltip.name, Tooltip)
		app.component(Popover.name, Popover)
	}
}