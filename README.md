<big><h1 align="center">vue-sync-data</h1></big>

<p align="center">
  <a href="https://npmjs.org/package/vue-sync-data">
    <img src="https://img.shields.io/npm/v/vue-sync-data.svg?style=flat-square"
         alt="NPM Version">
  </a>

  <a href="https://coveralls.io/r/foxbenjaminfox/vue-sync-data">
    <img src="https://img.shields.io/coveralls/foxbenjaminfox/vue-sync-data.svg?style=flat-square"
         alt="Coverage Status">
  </a>

  <a href="https://travis-ci.org/foxbenjaminfox/vue-sync-data">
    <img src="https://img.shields.io/travis/foxbenjaminfox/vue-sync-data.svg?style=flat-square"
         alt="Build Status">
  </a>

  <a href="https://npmjs.org/package/vue-sync-data">
    <img src="https://img.shields.io/npm/dm/vue-sync-data.svg?style=flat-square"
         alt="Downloads">
  </a>

  <a href="https://david-dm.org/foxbenjaminfox/vue-sync-data.svg">
    <img src="https://david-dm.org/foxbenjaminfox/vue-sync-data.svg?style=flat-square"
         alt="Dependency Status">
  </a>

  <a href="https://github.com/foxbenjaminfox/vue-sync-data/blob/master/LICENSE">
    <img src="https://img.shields.io/npm/l/vue-sync-data.svg?style=flat-square"
         alt="License">
  </a>
</p>

## 前言

在vue中，有如下代码，打印结果为 `2 1`，这是由于vue中改变data后，视图并不是同步渲染的，而是将同步的所有数据改变操作推入到一个队列之中，然后在下一个`nextTick`更新。

```html
<template>
  <div ref="test">{{test}}</div>
</template>
<script>
new Vue({
  data () {
    return {
      test: 1
    }
  },
  mounted () {
    this.test = 2
    console.log(this.test, this.$refs.test.innerText)
  }
}
</script>
```

那么问题就来了，如果想要视图同步更新，怎么办？这个插件解决了问题。

```
  // install
  npm i --save vue-sync-data
```

## 使用
```js
// main.js
import Vue from vue
import syncData from 'vue-sync-data'

Vue.use(syncData)
```

```html
// *.vue
<template>
  <div>
    <div ref="test">{{test}}</div>
    <div ref="obj">{{obj}}</div>
  </div>
</template>
<script>
new Vue({
  syncData () {
    return {
      test: 1,
      obj: {
        h: 1
      }
    }
  },
  mounted () {

    this.test = 2 // 成功
    console.log(this.test, this.$refs.test.innerText) // 2 2

    this.obj.h = 2 // 成功
    console.log(this.obj, this.$refs.obj.innerText) // { "h": 2 } { "h": 2 }

    this.obj.g = 2 // 失败
    console.log(this.obj, this.$refs.obj.innerText) // { "h": 1 } { "h": 1 }

    this.$syncSet(this.obj, 'g', 2) // 成功
    console.log(this.obj, this.$refs.obj.innerText) // { "h": 1, "g": 2 } { "h": 1, "g": 2  }
  }
}
</script>
```

## 说明
1. `syncData`是一个options选项，用法跟`data`完全一样，同样必须是一个函数
2. `$syncSet`是一个挂载到了vue原型上的方法，用法跟`$set`完全一样，作用是处理`syncData`中的数据，达到其改变时视图同步更新的目的

## License

MIT © [TGuoW](https://github.com/TGuoW)
