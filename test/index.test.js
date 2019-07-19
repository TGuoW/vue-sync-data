import syncData from '../src'
import Vue from 'vue'

const clone = function (value) {
  return JSON.parse(JSON.stringify(value))
}

/* eslint-disable */
Vue.use(syncData)
let id = 0
const createElm = function () {
  const elm = document.createElement('div')

  elm.id = 'app' + ++id
  document.body.appendChild(elm)

  return elm
}

describe('Async computed values are computed', () => {
  const testArr = [
    {name: 'Data', type: 'Fail', do: function () {
      this.value++
    }, from: 1},
    {name: 'Data', type: 'Success', do: function () {
      this.value++
    }, from: 1},
    {name: 'Obj', type: 'Fail', do: function () {
      this.value.test++
    }, from: {test: 1}},
    {name: 'Obj', type: 'Success', do: function () {
      this.value.test++
    }, from: {test: 1}},
    {name: 'ObjSet', type: 'Fail', do: function () {
      this.$set(this.value, 'test', 1)
    }, from: {}},
    {name: 'ObjSet', type: 'Success', do: function () {
      this.$syncSet(this.value, 'test', 1)
    }, from: {}},
    {name: 'ObjReset', type: 'Fail', do: function () {
      this.value = {}
    }, from: {test: 1}},
    {name: 'ObjReset', type: 'Success', do: function () {
      this.value = {}
    }, from: {test: 1}},
    {name: 'ArrReset', type: 'Fail', do: function () {
      this.value = []
    }, from: [1, 2, 3]},
    {name: 'ArrReset', type: 'Success', do: function () {
      this.value = []
    }, from: [1, 2, 3]},
    {name: 'ArrPush', type: 'Fail', do: function () {
      this.value.push(4)
    }, from: [1, 2, 3]},
    {name: 'ArrPush', type: 'Success', do: function () {
      this.value.push(4)
    }, from: [1, 2, 3]},
    {name: 'ArrPop', type: 'Fail', do: function () {
      this.value.pop()
    }, from: [1, 2, 3]},
    {name: 'ArrPop', type: 'Success', do: function () {
      this.value.pop()
    }, from: [1, 2, 3]},
    {name: 'ArrShift', type: 'Fail', do: function () {
      this.value.shift()
    }, from: [1, 2, 3]},
    {name: 'ArrShift', type: 'Success', do: function () {
      this.value.shift()
    }, from: [1, 2, 3]},
    {name: 'ArrUnshift', type: 'Fail', do: function () {
      this.value.unshift(0)
    }, from: [1, 2, 3]},
    {name: 'ArrUnshift', type: 'Success', do: function () {
      this.value.unshift(0)
    }, from: [1, 2, 3]},
    {name: 'ArrSplice', type: 'Fail', do: function () {
      this.value.splice(1, 0, 10)
    }, from: [1, 2, 3]},
    {name: 'ArrSplice', type: 'Success', do: function () {
      this.value.splice(1, 0, 10)
    }, from: [1, 2, 3]},
    {name: 'ArrSort', type: 'Fail', do: function () {
      this.value.sort((a, b) => {
        return Math.random() - 0.5
      })
    }, from: [1, 2, 3]},
    {name: 'ArrSort', type: 'Success', do: function () {
      this.value.sort((a, b) => {
        return Math.random() - 0.5
      })
    }, from: [1, 2, 3]},
    {name: 'ArrReverse', type: 'Fail', do: function () {
      this.value.reverse()
    }, from: [1, 2, 3]},
    {name: 'ArrReverse', type: 'Success', do: function () {
      this.value.reverse()
    }, from: [1, 2, 3]}
  ]

  testArr.forEach(item => {
    it(item.name + item.type, () => {
      const options = {
        render (h) {
          return h('div', [
            h('span', {
              ref: 'content'
            }, JSON.stringify(this.value))
          ])
        }
      }
      if (item.type === 'Fail') {
        options.data = function () {
          return {
            value: item.from
          }
        }
      } else {
        options.syncData = function () {
          return {
            value: item.from
          }
        }
      }
      const vm = new Vue(options).$mount(createElm())
      const prev = clone(vm.value)
      item.do.call(vm)
      expect(
        item.type === 'Fail' ? prev : vm.value
      ).toEqual(
        JSON.parse(vm.$refs.content.innerHTML)
      )
    })
  })


})
