import { App } from 'vue'
import Form from './form.vue'
import FormItem from './form-item.vue'

export { Form, FormItem }
export default {
	install: (app: App<Element>) => {
		app.component(Form.name, Form)
		app.component(FormItem.name, FormItem)
	}
}