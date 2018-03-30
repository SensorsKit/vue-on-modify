# vue-on-modify

[![npm (scoped)](https://img.shields.io/npm/v/@sensorskit/vue-on-modify.svg)](https://www.npmjs.com/package/@sensorskit/vue-on-modify)
[![Build Status](https://travis-ci.org/SensorsKit/vue-on-modify.svg?branch=master)](https://travis-ci.org/SensorsKit/vue-on-modify)

[[在线预览]](https://sensorskit.github.io/vue-on-modify/)

> 通用的「是否修改」监听逻辑：**输入框失焦之后，字符相对输入框上次聚焦时发生变化**
>
> 示例：
>
> * 输入框聚焦，输入字符后失焦，算修改
> * 输入框聚焦，输入字符后又把刚输入的字符删掉，再失焦，不算修改

## 使用

```bash
yarn add @sensorskit/vue-on-modify
```

在 Vue.js 项目的入口处引入：

```js
import VueOnModify from '@sensorskit/vue-on-modify'

Vue.use(VueOnModify)

// 如果需要自定义选项
Vue.use(VueOnModify, {
  directive： 'your-custom-directive-name'
})
```

在需要绑定修改逻辑的地方引入自定义指令：

```html
<input type="text" v-on-modify="onModify">

<!-- 如果自定义了directive name -->
<input type="text" v-your-custom-name="onModify">
```

也可以使用对象字面量传入自定义方法和可选参数：

```html
<!-- method为必填项，且值必须为函数，之后的参数为可选 -->
<input type="text" v-on-modify="{ method: onModify, name: 'Taylor', age: '29' }"
```

```js
onModify (args) {
  // DO SOMETHING
  ......
  // 除了method还存在其它参数
  if (args) {
    console.log(args.name)
    console.log(args.age)
  }
}
```
