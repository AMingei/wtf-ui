import { App, Plugin } from 'vue'
import Scrollbar from './scrollbar.vue'
Scrollbar.install = (app: App<Element>) => {
	app.component(Scrollbar.name, Scrollbar)
}
export default Scrollbar as unknown as Plugin