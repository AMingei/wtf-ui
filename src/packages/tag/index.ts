import { App } from 'vue'
import Tag from './tag.vue'

export { Tag }
export default {
	install: (app: App<Element>) => {
		app.component(Tag.name, Tag)
	}
}