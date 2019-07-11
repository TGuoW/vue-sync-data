
const generateData = function (dataFn, syncDataFn) {
  return function () {
    return {
      ...dataFn(),
      ...syncDataFn()
    }
  }
}

const defineReactive = function (obj, item) {
  const type = typeof obj[item]
  if (type === 'object' && type !== null) {
    Object.keys(obj[item]).forEach(ele => {
      defineReactive.call(this, obj[item], ele)
    })
  } else {
    const setterFn = Object.getOwnPropertyDescriptor(obj, item).set
    let value
    Object.defineProperty(obj, item, {
      set : (newValue) => {
        if (value === newValue) return
        value = newValue
        setterFn(newValue)
        this._watcher.run()
      }
    })
  }
}


const typeofThis = function (tmp) {
  return Object.prototype.toString.call(tmp).slice(8, -1)
}

const SyncData = {
  install (Vue, Options) {
    Options = Options || {}

    Vue.prototype.$syncSet = function (target, key, val) {
      Vue.set(target, key, val)
      if (this._isVue) {
        defineReactive.call(this, target, key)
        this._watcher.run()
      }
    }
    Vue.mixin({
      beforeCreate() {
        const {data, syncData} = this.$options

        if (!syncData) return

        if (typeofThis(syncData) !== 'Function') {
          console.error('The "syncData" option should be a function that returns a per-instance value in component definitions.')
          return
        }

        const syncDataObj = syncData()
        if (typeofThis(syncDataObj) !== 'Object') {
          console.error('The "syncData" option should be a function that returns a per-instance value in component definitions.')
          return
        }

        const syncDataRes = syncDataObj || {}
        const dataRes = data()

        if (!Object.keys(syncDataRes).length) return

        const propertyObj = {}
        Object.keys(dataRes).forEach(item => propertyObj[item] = true)
        if (
          Object.keys(syncDataRes).some(item => {
            if (propertyObj[item]) {
              console.error(`The syncData property "${item}" is already declared as a data. `)
              return true
            }
          })
        ) return

        this.$options.data = generateData(data, syncData)
      },
      created() {
        const {$data} = this
        const {syncData} = this.$options

        if (!syncData) return

        Object.keys(syncData()).forEach(item => {
          defineReactive($data, item)
        })
      },
    })
  }
}

export default SyncData

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  // Auto install in dist mode
  window.Vue.use(SyncData)
}