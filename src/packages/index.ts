import { App } from 'vue'
import { getTheme, initTheme, setTheme, TTheme } from './style'
import Button from './button'
import Divider from './divider'
import Card from './card'
import Tag from './tag'
import Switch from './switch'
import Radio from './radio'
import Checkbox from './checkbox'
import Input from './input'
import Slider from './slider'
import Selector from './selector'
import ColorSelector from './color-selector'
import DateSelector from './date-selector'
import Form from './form'
import Content from './content'
import Popper from './popper'

const install = (app: App<Element>) => {
	initTheme()
	app.use(Button)
	app.use(Divider)
	app.use(Card)
	app.use(Tag)
	app.use(Switch)
	app.use(Radio)
	app.use(Checkbox)
	app.use(Input)
	app.use(Slider)
	app.use(Selector)
	app.use(ColorSelector)
	app.use(DateSelector)
	app.use(Form)
	app.use(Content)
	app.use(Popper)
}

const wtf = {
	install,
	get theme() { return getTheme() },
	set theme(val: TTheme) { setTheme(val) }
}

export { Tag as WtfTag } from './tag'
export { Radio as WtfRadio, RadioGroup as WtfRadioGroup } from './radio'
export { Checkbox as WtfCheckbox, CheckboxGroup as WtfCheckboxGroup } from './checkbox'
export { Slider as WtfSlider } from './slider'
export { Selector as WtfSelector, Option as WtfOption, OptionGroup as WtfOptionGroup } from './selector'
export { ColorSelector as WtfColorSelector } from './color-selector'
export { DateSelector as WtfDateSelector } from './date-selector'
export { Input as WtfInput, InputGroup as WtfInputGroup, Number as WtfNumber } from './input'
export { Form as WtfFrom, FormItem as WtfFormItem } from './form'
export { vTitle, Tooltip as WtfTooltip, Popover as WtfPopover } from './popper'
export * from './utils'
export * from './style'
export default wtf