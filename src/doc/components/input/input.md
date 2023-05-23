基础的文本录入组件，在这里就可以试一下。

<preview src="components.input.input" />

可以被清空，或是重置。

<preview src="components.input.input-reset" />

指定尺寸。

<preview src="components.input.input-resize" />

有时可能会被禁用或是设定只读。

<preview src="components.input.input-disabled" />

使用 `prefix`、`suffix` 属性指定前缀与后缀。

<preview src="components.input.input-xfix" />

也可以使用插槽方式，`#prefix`、`#suffix` 插槽指定组件内容；  
插槽容器带有默认样式，可以使用 `content/prefix/suffix-style` 覆盖预设样式。

<preview src="components.input.input-compfix" />

分组。

<preview src="components.input.input-group" />

限定内容长度。

<preview src="components.input.input-limitation" />

密码。

<preview src="components.input.input-password" />

使用 `required`、`parttern`、`vertify-text` 进行本地校验。

<preview src="components.input.input-vertify" />

使用 `feedback` 进行远程校验。

<preview src="components.input.input-feedback" />

事件触发。

<preview src="components.input.input-event" />

<preview src="components.input.input-expose" />

## API

| Attr | Type | Default | |
| - | - | - | - |
| `type` | `'text' \| 'textarea' \| 'password'` | `'text'` | 指定组件类型 |
| `size` | `'smallest' \| 'smaller' \| 'normal' \| 'larger' \| 'largest'` | `'normal'` | 指定组件大小 |
| `name` | `string` | | 指定 `<input>.name` 属性 |
| `form` | `string` | | 指定 `<input>.form` 属性 |
| `value` | `string` | | 指定输入框的默认值，使用预设的清空按钮将把输入框重置为指定值 |
| `placeholder` | `string` | | 指定 `<input>.placeholder` 属性 |
| `space-valid` | `boolean` | `false` | 是否保留空格，默认情况下在用户失焦后清除文本两端的空格 |
| `disabled` | `boolean` | | 指定 `<input>.disabled` 属性 |
| `readonly` | `boolean` | | 指定 `<input>.readonly` 属性 |
| `resetable` | `boolean` | | 是否使用预设的清空按钮 |
| `required` | `boolean` | | 指定 `<input>.required` 属性 |
| `pattern` | `'tel' \| 'email' \| 'url' \| string \| RegExp` | | 指定 `<input>.pattern` 属性；附带三组预设的校验 |
| `vertify-text` | `string` | | 当使用自定义校验规则时，指定反馈文本 |
| `autocomplete` | `string` | | 指定 `<input>.autocomplete` 属性 |
| `autofocus` | `boolean` | | 指定 `<input>.autofocus` 属性 |
| `content-class` | `string \| string[]` | | 指定 `<input>`（最底层标签） 类名 |
| `content-style` | `string \| object` | | 指定 `<input>` 样式 |
| `prefix` | `string` | | 指定前缀内容 |
| `prefix-class` | `string \| string[]` | | 指定 `#prefix` 插槽类名 |
| `prefix-style` | `string \| object` | | 指定 `#prefix` 插槽样式 |
| `suffix` | `string` | | 指定后缀内容 |
| `suffix-class` | `string \| string[]` | | 指定 `#suffix` 插槽类名 |
| `suffix-style` | `string \| object` | | 指定 `#suffix` 插槽样式 |
| `feedback` | `TFeedback` | | 设置用户输入反馈 |
| `max-length` | `number \| string` | | 限定输入字符长度，组合字符（注音符号、组合emoji）将会被识别为若干字符组合 |

| Expose | Type | |
| - | - | - |
| `dom` | `HTMLInputElement \| HTMLTextAreaElement` | 获取 `<input>` 或 `textarea` 元素 |
| `focus` | `() => void` | 获取焦点 |
| `focusout` | `() => void` | 失去焦点 |
| `reset` | `() => void` | 重置 |
| `select` | `(from?: number, to?: number) => void` | 全选或指定范围选择 |
| `scrollTo` | `(posX: number, posY: number = 0) => void` | 滚动至 `(posX, posY)` |
| `scrollBy` | `(delX: number, delY: number = 0) => void` | 向前滚动 `(delX, delY)` |
| `togglePassword` | `(state?: boolean) => void` | 切换密码显式 |

| Event | Type | |
| - | - | - |
| `focus` | `(event: FocusEvent) => void` | 获取焦点后触发 |
| `focusout` | `(event: FocusEvent) => void` | 失去焦点后触发 |
| `input` | `(value: string \| undefined) => void` | 用户输入后触发 |
| `change` | `(value: string \| undefined) => void` | 失焦且值改变时触发，触发在 `@focusout` 前 |
| `before-reset` | `(value: string \| undefined) => void` | 重置输入框前触发 |
| `reset` | `(value: string \| undefined) => void` | 重置输入框后触发 |

| Slot | |
| - | - |
| `#prefix` | 前缀插槽 |
| `#suffix` | 后缀插槽 |