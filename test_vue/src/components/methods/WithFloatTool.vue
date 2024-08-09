<template>
  <div>
    ============== ++++++++++++++++++++++++ ==============  ++++++++++++++++++++++++  ===============
    <br><br>{{json}}<br><br>
    <FloatTool 
      :data="json"
      @handleEn="handleEn"
      @handleChen="handleChen"
      @handleOrigin="handleOrigin"
      @handleColor="handleColor"
    />
    ============== ++++++++++++++++++++++++ ==============  ++++++++++++++++++++++++  ===============
  </div>
</template>

<script>
import Vue from 'vue';
import FloatTool from "./components/FloatTool";

export default {
  name: 'WithFloatTool',
  components: { FloatTool },
  data () {
    return {
      json: []
    };
  },
  mounted () {
    this.json = [
      {name: '<span style="color: red">中文</span>', icon: 'el-icon-document', active: false, emitCallName: 'handleEn'},
      {name: '中英', icon: 'el-icon-document-copy', active: false, emitCallName: 'handleChen', iconStyle: 'color: red'},
      {name: '原文对比', icon: 'el-icon-tickets', active: false, emitCallName: 'handleOrigin', removeMe: true},
      {name: '颜色', icon: 'el-icon-notebook-1', active2: false, emitCallName: 'handleColor'}
    ]
  },
  methods: {
    handleEn (val) {
      // 选中状态 变更
      this.json[this.json.findIndex(item => item.name === val.name)].active = !this.json[this.json.findIndex(item => item.name === val.name)].active
    },
    handleChen (val) {
      // 选中状态 变更
      this.json[this.json.findIndex(item => item.name === val.name)].active = !this.json[this.json.findIndex(item => item.name === val.name)].active
    },
    handleOrigin (val) {
      // 选中状态 变更
      this.json[this.json.findIndex(item => item.name === val.name)].active = !this.json[this.json.findIndex(item => item.name === val.name)].active
    },
    handleColor (val) {
      // 选中状态 变更
      this.json[this.json.findIndex(item => item.name === val.name)].active2 = !this.json[this.json.findIndex(item => item.name === val.name)].active2
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
