<template>
  <div>
    <div>
      <span ref="DataSuccess">{{ normalDataSuccess }}</span>
      <button @click="dataSuccess">
        Data Success
      </button>
    </div>
    <div>
      <span ref="DataFail">{{ normalDataFail }}</span>
      <button @click="dataFail">
        Data Fail
      </button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import syncData from './index'
Vue.use(syncData)
export default Vue.extend({
  data () {
    return {
      normalDataFail: 1,
      normalObjFail: {
        test: 1
      },
      normarlArrFail: [1, 2, 3]
    }
  },
  syncData () {
    return {
      normalDataSuccess: 1,
      normalObjSuccess: {
        test: 1
      },
      normarlArrSuccess: [1, 2, 3]
    }
  },
  mounted () {
    console.log(this)
  },
  methods: {
    dataSuccess () {
      this.normalDataSuccess++
      console.log(`
        ${this.normalDataSuccess}
        ${this.$refs.DataSuccess.innerText}
      `)
      if (this.normalDataSuccess.toString() === this.$refs.DataSuccess.innerText) {
        console.log('DataSuccess')
      } else {
        console.log('DataFail')
      }
    },
    dataFail () {
      this.normalDataFail++
      console.log(`
        ${this.normalDataFail}
        ${this.$refs.DataFail.innerText}
      `)
      if (this.normalDataFail.toString() === this.$refs.DataFail.innerText) {
        console.log('DataSuccess')
      } else {
        console.log('DataFail')
      }
    },
    objSuccess () {
      console.log(`
        ${this.normalDataSuccess}
        ${this.$refs.DataSuccess.innerText}
      `)
      if (this.normarlArrSuccess.toString() === this.$refs.DataSuccess.innerText) {
        console.log('DataSuccess')
      } else {
        console.log('DataFail')
      }
    }
  }
})
</script>
