import { App } from 'vue'
import Content from './content.vue'
import Header from './header.vue'
import Footer from './footer.vue'
import Left from './left.vue'
import Right from './right.vue'
import Space from './space.vue'

export default {
	install: (app: App<Element>) => {
		app.component(Content.name, Content)
		app.component(Header.name, Header)
		app.component(Footer.name, Footer)
		app.component(Left.name, Left)
		app.component(Right.name, Right)
		app.component(Space.name, Space)
	}
}