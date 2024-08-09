<template>
  <div>
      <br><br><br>
      <div v-html="resHtml"></div>
  </div>
</template>

<script>
import Vue from 'vue';
import json from './static/testHtml.json'
import { json2Html } from "./helper/helper.js";

export default {
  name: 'TestHtml',
  data () {
    return {
      resHtml: '',
    };
  },
  mounted () {
    this.resHtml = json;
    // 处理json
    this.resHtml = json2Html(this.resHtml);
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
// 粗体
::v-deep .b-font {
  font-weight: 600;
}
// 粗体 + 增大字号
::v-deep .b-s-font {
  font-size: 18px;
  font-weight: 600;
}
// 表格
::v-deep table {  
  width: 100%;
  border-collapse: collapse;
}
::v-deep th, td {  
  border: 1px solid #ddd;
  padding: 8px;
  height: 45px;
  // text-align: left;
}
::v-deep td {  
  border: 1px solid #ddd;
  height: 65px;
}
::v-deep th {
  background-color: #f2f2f2;
}
::v-deep textarea {
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 5px;
  box-sizing: border-box;
}
</style>
