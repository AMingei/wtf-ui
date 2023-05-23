import Test from '@/views/test.vue'
import Homepage from '@/views/Homepage.vue'
import Components from '@/views/Components.vue'
import Button from '@/doc/components/button/button.md'
import Divider from '@/doc/components/divider/divider.md'
import Card from '@/doc/components/card/card.md'
import Tag from '@/doc/components/tag/tag.md'
import Switch from '@/doc/components/switch/switch.md'
import Radio from '@/doc/components/radio/radio.md'
import Checkbox from '@/doc/components/checkbox/checkbox.md'
import Input from '@/doc/components/input/input.md'
import Number from '@/doc/components/number/number.md'
import Slider from '@/doc/components/slider/slider.md'
import Selector from '@/doc/components/selector/selector.md'
import ColorSelector from '@/doc/components/color-selector/color-selector.md'
import DateSelector from '@/doc/components/date-selector/date-selector.md'
import Form from '@/doc/components/form/form.md'
import Content from '@/doc/components/content/content.md'
import Layout from '@/doc/components/layout/layout.md'
import Space from '@/doc/components/space/space.md'
import Tooltip from '@/doc/components/tooltip/tooltip.md'
import Popover from '@/doc/components/popover/popover.md'

import { createRouter, createWebHistory } from 'vue-router'

const componentsRoutesByGroup = [{
	name: '通用组件 Common Components',
	routes: [
		{ path: 'button', name: 'Button', component: Button, meta: { name: '按钮 Button' } },
		{ path: 'divider', name: 'Divider', component: Divider, meta: { name: '分割线 Divider' } },
		{ path: 'card', name: 'Card', component: Card, meta: { name: '卡片 Card' } },
		{ path: 'tag', name: 'Tag', component: Tag, meta: { name: '标签 Tag' } }
	]
}, {
	name: '布局组件 Layout Components',
	routes: [
		{ path: 'content', name: 'Content', component: Content, meta: { name: '布局容器 Content' } },
		{ path: 'layout', name: 'Layout', component: Layout, meta: { name: '预置布局 Header/Footer/Left/Right' } },
		{ path: 'space', name: 'Space', component: Space, meta: { name: '预置布局 Space' } }
	]
}, {
	name: '表单组件 Form Components',
	routes: [
		{ path: 'switch', name: 'Switch', component: Switch, meta: { name: '开关 Switch' } },
		{ path: 'radio', name: 'Radio', component: Radio, meta: { name: '单选 Radio' } },
		{ path: 'checkbox', name: 'Checkbox', component: Checkbox, meta: { name: '多选 Checkbox' } },
		{ path: 'input', name: 'Input', component: Input, meta: { name: '文本录入 Input' } },
		{ path: 'number', name: 'Number', component: Number, meta: { name: '数字录入 Number' } },
		{ path: 'slider', name: 'Slider', component: Slider, meta: { name: '滑块 Slider' } },
		{ path: 'selector', name: 'Selector', component: Selector, meta: { name: '选择器 Selector' } },
		{ path: 'color-selector', name: 'ColorSelector', component: ColorSelector, meta: { name: '颜色选择器 Color Selector' } },
		{ path: 'date-selector', name: 'DateSelector', component: DateSelector, meta: { name: '日期选择器 Date Selector' } },
		{ path: 'form', name: 'Form', component: Form, meta: { name: '表单 Form' } }
	]
}, {
	name: '响应组件 Response Components',
	routes: [
		{ path: 'tooltip', name: 'Tooltip', component: Tooltip, meta: { name: '文字提示 Tooltip' } },
		{ path: 'popover', name: 'Popover', component: Popover, meta: { name: '气泡提示 Popover' } }
	]
}]

const componentsRoutes = componentsRoutesByGroup.reduce((acc, current) => acc.concat(current.routes as any), [])

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: '/wtf-ui/', alias: '/wtf-ui/home', name: 'Homepage', component: Homepage, meta: { pageTitle: 'WTF UI' } },
		{
			path: '/wtf-ui/component',
			name: 'Components',
			redirect: { name: 'Button' },
			component: Components,
			children: componentsRoutes
		}
	]
})

export { componentsRoutesByGroup }
export default router