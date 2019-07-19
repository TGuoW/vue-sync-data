
<script>
import Vue from 'vue'
import syncData from './index'
Vue.use(syncData)

const compare = function (left, right) {
  if (typeof left === 'object' && typeof right === 'object') {
    var keyArr = new Set(Object.keys(left).concat(Object.keys(right)))
    for (const key of keyArr) {
      try {
        const res = compare(left[key], right[key])
        if (!res) return false
      } catch (e) {
        return false
      }
    }
    return true
  } else {
    return left === right
  }
}

export default Vue.extend({
  data () {
    return {
      DataFail: 1,
      ObjFail: {
        test: 1
      },
      ObjSetFail: {},
      ObjResetFail: { test: 1 },
      ArrResetFail: [1, 2, 3],
      ArrPushFail: [1, 2, 3],
      ArrPopFail: [1, 2, 3],
      ArrShiftFail: [1, 2, 3],
      ArrUnshiftFail: [1, 2, 3],
      ArrSpliceFail: [1, 2, 3],
      ArrSortFail: [1, 2, 3],
      ArrReverseFail: [1, 2, 3]
    }
  },
  syncData () {
    return {
      DataSuccess: 1,
      ObjSuccess: {
        test: 1
      },
      ObjSetSuccess: {},
      ObjResetSuccess: { test: 1 },
      ArrResetSuccess: [1, 2, 3],
      ArrPushSuccess: [1, 2, 3],
      ArrPopSuccess: [1, 2, 3],
      ArrShiftSuccess: [1, 2, 3],
      ArrUnshiftSuccess: [1, 2, 3],
      ArrSpliceSuccess: [1, 2, 3],
      ArrSortSuccess: [1, 2, 3],
      ArrReverseSuccess: [1, 2, 3]
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    output (target) {
      console.log(`
        ${JSON.stringify(this[target])}
        ${this.$refs[target].innerText}
      `)
      if (compare(this[target], JSON.parse(this.$refs[target].innerText))) {
        console.log('success')
      } else {
        console.log('fail')
      }
    },
    mDataSuccess () {
      this.DataSuccess++
      this.output('DataSuccess')
    },
    mDataFail () {
      this.DataFail++
      this.output('DataFail')
    },
    mObjFail () {
      this.ObjFail.test++
      this.output('ObjFail')
    },
    mObjSuccess () {
      this.ObjSuccess.test++
      this.output('ObjSuccess')
    },
    mObjSetSuccess () {
      this.$syncSet(this.ObjSetSuccess, 'test', 1)
      this.output('ObjSetSuccess')
    },
    mObjSetFail () {
      this.$set(this.ObjSetFail, 'test', 1)
      this.output('ObjSetFail')
    },
    mObjResetSuccess () {
      this.ObjResetSuccess = {}
      this.output('ObjResetSuccess')
    },
    mObjResetFail () {
      this.ObjResetFail = {}
      this.output('ObjResetFail')
    },
    mArrResetSuccess () {
      this.ArrResetSuccess = []
      this.output('ArrResetSuccess')
    },
    mArrResetFail () {
      this.ArrResetFail = []
      this.output('ArrResetFail')
    },
    mArrPushSuccess () {
      this.ArrPushSuccess.push(4)
      this.output('ArrPushSuccess')
    },
    mArrPushFail () {
      this.ArrPushFail.push(4)
      this.output('ArrPushFail')
    },
    mArrPopSuccess () {
      this.ArrPopSuccess.pop()
      this.output('ArrPopSuccess')
    },
    mArrPopFail () {
      this.ArrPopFail.pop()
      this.output('ArrPopFail')
    },
    mArrShiftSuccess () {
      this.ArrShiftSuccess.shift()
      this.output('ArrShiftSuccess')
    },
    mArrShiftFail () {
      this.ArrShiftFail.shift()
      this.output('ArrShiftFail')
    },
    mArrUnshiftSuccess () {
      this.ArrUnshiftSuccess.unshift(0)
      this.output('ArrUnshiftSuccess')
    },
    mArrUnshiftFail () {
      this.ArrUnshiftFail.unshift(0)
      this.output('ArrUnshiftFail')
    },
    mArrSpliceSuccess () {
      this.ArrSpliceSuccess.splice(1, 0, 10)
      this.output('ArrSpliceSuccess')
    },
    mArrSpliceFail () {
      this.ArrSpliceFail.splice(1, 0, 10)
      this.output('ArrSpliceFail')
    },
    mArrSortSuccess () {
      this.ArrSortSuccess.sort((a, b) => {
        return Math.random() - 0.5
      })
      this.output('ArrSortSuccess')
    },
    mArrSortFail () {
      this.ArrSortFail.sort((a, b) => {
        return Math.random() - 0.5
      })
      this.output('ArrSortFail')
    },
    mArrReverseSuccess () {
      this.ArrReverseSuccess.reverse(1, 0, 10)
      this.output('ArrReverseSuccess')
    },
    mArrReverseFail () {
      this.ArrReverseFail.reverse(1, 0, 10)
      this.output('ArrReverseFail')
    }
  },
  render () {
    const list = [
      'DataSuccess',
      'DataFail',
      'ObjSuccess',
      'ObjFail',
      'ObjSetSuccess',
      'ObjSetFail',
      'ObjResetSuccess',
      'ObjResetFail',
      'ArrResetSuccess',
      'ArrResetFail',
      'ArrPushSuccess',
      'ArrPushFail',
      'ArrPopSuccess',
      'ArrPopFail',
      'ArrShiftSuccess',
      'ArrShiftFail',
      'ArrUnshiftSuccess',
      'ArrUnshiftFail',
      'ArrSpliceSuccess',
      'ArrSpliceFail',
      'ArrSortSuccess',
      'ArrSortFail',
      'ArrReverseSuccess',
      'ArrReverseFail'
    ]
    return (
      <div>
        { list.map(item => {
          const text = JSON.stringify(this[item])
          return <div>
            <span ref={item}>{text}</span>
            <button onclick={this['m' + item]}>
              {item}
            </button>
          </div>
        }) }
      </div>
    )
  }
})
</script>
