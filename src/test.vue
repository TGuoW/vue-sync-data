<template>
  <div>
    <span ref="DataSuccess">{{normalDataSuccess}}</span>
    <button @click="dataSuccess">Data Success</button>
  </div>
  <div>
    <span ref="DataFail">{{normalDataFail}}</span>
    <button @click="normalDataFail++">Data Fail</button>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  data() {
    return {
      normalDataFail: 1,
      normalObjFail: {
        test: 1
      },
      normarlArrFail: [1, 2, 3]
    };
  },
  syncData() {
    return {
      normalDataSuccess: 1,
      normalObjSuccess: {
        test: 1
      },
      normarlArrSuccess: [1, 2, 3]
    };
  },
  methods: {
    dataSuccess() {
      this.normalDataSuccess++;
      console.log(`
        ${this.normalDataSuccess}
        ${this.$refs.DataSucess.innerText}
      `);
      if (this.normarlArrSuccess == this.$refs.DataSucess.innerText) {
        console.log("DataSuccess");
      } else {
        console.log("DataFail");
      }
    },
    objSuccess() {
      console.log(`
        ${this.normalDataSuccess}
        ${this.$refs.DataSucess.innerText}
      `);
      if (this.normarlArrSuccess == this.$refs.DataSucess.innerText) {
        console.log("DataSuccess");
      } else {
        console.log("DataFail");
      }
    }
  }
};
</script>
