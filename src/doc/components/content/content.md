## Common Example

基础的布局组件，看起来就像是一个 `<div>`。

<preview src="components.content.content" />

可以通过 `flex` 属性显式声明一个弹性盒子。

<preview src="components.content.flex-content" />

也可以通过预置的布局结构隐式声明一个弹性盒子。

<preview src="components.content.inplicit-flex-content" />

content

| attribute | type | default | |
| - | - | - | - |
| `tagName` | `keyof HTMLElementTagNameMap` | `'section'` | 自定义标签名 |
| `width` | `string: <length-percentage>` | | 对父容器为隐式弹性布局的 header/footer/content 无效 |
| `height` | `string: <length-percentage>` | | 对父容器为隐式弹性布局的 left-side/right-side 无效 |
| `*flex` | `boolean` | `false` | 显式弹性布局声明 |
| `*grid` | `boolean` | `false` | 显式网格布局声明 |
| `*space` | `boolean` | `false` | 显式内联弹性布局声明 |
| `gap` | `string: <length-percentage>` | | flex/grid 布局间距 |
| `gap-row` | `string: <length-percentage>` | | 同上 |
| `gap-column` | `string: <length-percentage>` | | 同上 |
| `vertical` | `boolean` | `false` | flex 布局方向 |
| `reverse` | `boolean` | `false` | 同上 |
| `*scrollbar` | `boolean` | `false` | 是否显示滚动条 |
| `*scrollbarX` | `boolean` | `false` | 是否显示水平方向滚动条 |
| `*scrollbarY` | `boolean` | `false` | 是否显示垂直方向滚动条 |
| `header` | `boolean` | `false` | 将元素声明为隐式布局容器中的预制 header |
| `footer` | `boolean` | `false` | 将元素声明为隐式布局容器中的预制 footer |
| `left` | `boolean` | `false` | 将元素声明为隐式布局容器中的预制 left |
| `right` | `boolean` | `false` | 将元素声明为隐式布局容器中的预制 right |
| `bordered` | `boolean` | `false` | 隐式弹性布局容器内部是否显示默认边框（`1px solid`） |
| `border-style` | `string: <border-color> \| <border>` | | 隐式弹性布局容器内部边框样式，启用时默认 `bordered=true` |