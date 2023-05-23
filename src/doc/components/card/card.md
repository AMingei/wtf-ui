## Common Exapmle

可以用来盛东西的卡片。

<preview src="components.card.card" />

设置头部、底部或者其他选项。

<preview src="components.card.card-slots-1" />

为卡片添加 banner。

<preview src="components.card.card-slots-2" />

为卡片指定 border。

<preview src="components.card.card-slots-3" />

没有边框的话，你或许很难分辨卡片边界，指定一个阴影也能达到相似的目的。

<preview src="components.card.card-slots-4" />

## API

### Attributes

| Attr | Type | Default | |
| - | - | - | - |
| `width` | `string` |
| `height` | `string` |
| `ratio` | `string` | | 指定 `aspect-ratio` 属性 |
| `bordered` | `boolean` | `true` | 是否设定边框 |
| `border-style` | `string` | | 指定 `border` 属性，相较 `attr.bordered` 具有更高的优先级 |
| `shadow` | `'always' \| 'hover' \| 'none'` | `'none'` | 指定卡片阴影 |
| `bannerClass` | `string \| string[]` | | 指定 `#banner` 插槽容器样式类 |
| `bannerStyle` | `string \| object` | | 指定 `#banner` 插槽容器样式 |
| `headerClass` | `string \| string[]` | | 指定 `#header` 插槽容器样式类 |
| `headerStyle` | `string \| object` | | 指定 `#header` 插槽容器样式 |
| `contentClass` | `string \| string[]` | | 指定 `#default` 插槽容器样式类 |
| `contentStyle` | `string \| object` | | 指定 `#default` 插槽容器样式 |
| `footerClass` | `string \| string[]` | | 指定 `#footer` 插槽容器样式类 |
| `footerStyle` | `string \| object` | | 指定 `#footer` 插槽容器样式 |

### Slots

| Slot | |
| - | - |
| `#banner` | 图片插槽 |
| `#header` | 头部插槽 |
| `#option` | 选项插槽，需要头部插槽存在内容 |
| `#default` | 正文插槽 |
| `#footer` | 底部插槽 |