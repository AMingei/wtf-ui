import { App, Plugin } from 'vue'
import Space from './index.vue'
Space.install = (app: App<Element>) => {
	app.component(Space.name, Space)
}
export default Space as unknown as Plugin