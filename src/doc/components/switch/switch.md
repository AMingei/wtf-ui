开关。

<preview src="components.switch.switch" />

调整大小。

<preview src="components.switch.switch-size" />

只读或是禁用。

<preview src="components.switch.switch-disabled" />

自定义文本。

<preview src="components.switch.switch-text" />

自定义背景色。

<preview src="components.switch.switch-color" />

事件触发。

<preview src="components.switch.switch-event" />

<preview src="components.switch.switch-expose" />

## API

| Attr | Type | Default | |
| - | - | - | - |
| `id` | `string` | | 指定 `<input>.id` 属性 |
| `size` | `'smallest' \| 'smaller' \| 'normal' \| 'larger' \| 'largest'` | `'normal'` | 指定组件大小 |
| `name` | `string` | | 指定 `<input>.name` 属性 |
| `form` | `string` | | 指定 `<input>.form` 属性 |
| `valueOff` | `boolean \| number \| string` | `false` | 指定 switch-off 状态下的值 |
| `valueOn` | `boolean \| number \| string` | `true` | 指定 switch-on 状态下的值 |
| `textOff` | `string` | | 指定 switch-off 显示的文本 |
| `textOn` | `string` | | 指定 switch-on 显示的文本 |
| `colorOff` | `string` | | 指定 switch-off 显示背景色 |
| `colorOn` | `string` | | 指定 switch-on 显示背景色 |
| `disabled` | `boolean` | | 指定 `<input>.disabled` 属性 |
| `readonly` | `boolean` | | 指定 `<input>.readonly` 属性 |
| `autofocus` | `boolean` | | 指定 `<input>.autofocus` 属性 |
| `content-class` | `string \| string[]` | | 指定 switch 类名 |
| `content-style` | `string \| object` | | 指定 switch 样式 |
| `switch-off-class` | `string \| string[]` | | 指定 `#textoff` 插槽类名 |
| `switch-off-style` | `string \| object` | | 指定 `#textoff` 插槽样式 |
| `switch-on-class` | `string \| string[]` | | 指定 `#texton` 插槽类名 |
| `switch-on-style` | `string \| object` | | 指定 `#texton` 插槽样式 |
| `switch-button-class` | `string \| string[]` | | 指定 `#button` 插槽类名 |
| `switch-button-style` | `string \| object` | | 指定 `#button` 插槽样式 |

| Expose | Type | |
| - | - | - |
| `dom` | `HTMLDivElement` | 获取元素 |
| `focus` | `() => void` | 获取焦点 |
| `focusout` | `() => void` | 失去焦点 |
| `toogle` | `(value?: boolean \| number \| string)` | 触发 switch |

| Event | Type | |
| - | - | - |
| `focus` | `(event: FocusEvent) => void` | 获取焦点后触发 |
| `focusout` | `(event: FocusEvent) => void` | 失去焦点后触发 |
| `change` | `(value: boolean \| number \| string \| undefined) => void` | 失焦且值改变时触发，触发在 `@focusout` 前 |

| Slot | |
| - | - |
| `#button` | button 插槽 |
| `#textoff` | switch-off 插槽 |
| `#texton` | switch-on 插槽 |