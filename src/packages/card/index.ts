import { App, Plugin } from 'vue'
import Card from './card.vue'
export default {
	install: (app: App<Element>) => {
		app.component(Card.name, Card)
	}
}