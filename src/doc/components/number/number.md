用于录入数字的组件。

<preview src="components.number.number" />

可以被清空，或是重置。

<preview src="components.number.number-reset" />

指定尺寸。

<preview src="components.number.number-resize" />

有时可能会被禁用或是设定只读。

<preview src="components.number.number-disabled" />

使用 controller 控制数字线性增减。

<preview src="components.number.number-controller" />

自定义步长。严格步长模式下，输入值必须为步长的整数倍，非法值将被向 0 取整。

<preview src="components.number.number-step" />

使用 `range` 参数指定范围。

<preview src="components.number.number-range" />

设置显示精度，至多四舍五入保留小数点后 12 位。

<preview src="components.number.number-precision" />

使用 `prefix`、`suffix` 属性或插槽指定前缀与后缀；  
`auto-fit` 属性控制后缀是否自动适应数字长度。

<preview src="components.number.number-xfix" />

使用 `split` 属性指定数字分隔符。

<preview src="components.number.number-split" />

使用 `required` 进行本地校验。

<preview src="components.number.number-vertify" />

事件触发。

<preview src="components.number.number-event" />

<preview src="components.number.number-expose" />

## API

| Attr | Type | Default | |
| - | - | - | - |
| `type` | `'text' \| 'textarea' \| 'password'` | `'text'` | 指定组件类型 |
| `size` | `'smallest' \| 'smaller' \| 'normal' \| 'larger' \| 'largest'` | `'normal'` | 指定组件大小 |
| `name` | `string` | | 指定 `<input>.name` 属性 |
| `form` | `string` | | 指定 `<input>.form` 属性 |
| `value` | `string` | | 指定输入框的默认值，使用预设的清空按钮将把输入框重置为指定值 |
| `placeholder` | `string` | | 指定 `<input>.placeholder` 属性 |
| `controller` | `boolean` | | 是否显示 controller |
| `controller-justify` | `'between' \| 'start' \| 'end'` | `'end'` | controller 位置 |
| `precision` | `number \| string` | | 显示精度 |
| `step` | `number \| string` | | 步长 |
| `strict-step` | `number \| string` | | 严格步长 |
| `range` | `[number, number] \| string` | | 范围 |
| `split` | `[number, string] \| string` | | 自定义数字分隔符 |
| `disabled` | `boolean` | | 指定 `<input>.disabled` 属性 |
| `readonly` | `boolean` | | 指定 `<input>.readonly` 属性 |
| `resetable` | `boolean` | | 是否使用预设的清空按钮 |
| `required` | `boolean` | | 指定 `<input>.required` 属性 |
| `autocomplete` | `string` | | 指定 `<input>.autocomplete` 属性 |
| `autofocus` | `boolean` | | 指定 `<input>.autofocus` 属性 |
| `content-class` | `string \| string[]` | | 指定 `<input>`（最底层标签） 类名 |
| `content-style` | `string \| object` | | 指定 `<input>` 样式 |
| `prefix` | `string` | | 指定前缀内容 |
| `prefix-class` | `string \| string[]` | | 指定 `#prefix` 插槽类名 |
| `prefix-style` | `string \| object` | | 指定 `#prefix` 插槽样式 |
| `suffix` | `string` | | 指定后缀内容 |
| `auto-fit` | `boolean` | | 后缀位置是否自适应 |
| `suffix-class` | `string \| string[]` | | 指定 `#suffix` 插槽类名 |
| `suffix-style` | `string \| object` | | 指定 `#suffix` 插槽样式 |
| `decrease-class` | `string \| string[]` | | 指定 `#decrease` 插槽类名 |
| `decrease-style` | `string \| object` | | 指定 `#decrease` 插槽样式 |
| `increase-class` | `string \| string[]` | | 指定 `#increase` 插槽类名 |
| `increase-style` | `string \| object` | | 指定 `#increase` 插槽样式 |

| Expose | Type | |
| - | - | - |
| `dom` | `HTMLInputElement \| HTMLTextAreaElement` | 获取 `<input>` 或 `textarea` 元素 |
| `focus` | `() => void` | 获取焦点 |
| `focusout` | `() => void` | 失去焦点 |
| `decrease` | `() => void` | 按步长减少 |
| `increase` | `() => void` | 按步长增加 |
| `reset` | `() => void` | 重置 |
| `select` | `() => void` | 全选 |

| Event | Type | |
| - | - | - |
| `focus` | `(event: FocusEvent) => void` | 获取焦点后触发 |
| `focusout` | `(event: FocusEvent) => void` | 失去焦点后触发 |
| `input` | `(value: string \| undefined) => void` | 用户输入后触发 |
| `change` | `(value: number \| undefined) => void` | 失焦且值改变时触发，触发在 `@focusout` 前 |
| `before-reset` | `(value: string \| undefined) => void` | 重置输入框前触发 |
| `reset` | `(value: string \| undefined) => void` | 重置输入框后触发 |

| Slot | |
| - | - |
| `#prefix` | 前缀插槽 |
| `#suffix` | 后缀插槽 |
| `#decrease` | 步减插槽 |
| `#increase` | 步增插槽 |