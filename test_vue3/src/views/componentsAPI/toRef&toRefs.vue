<template>
  <div>
    <table border=1>
      <tr>
        <td>
          toRef
        </td>
        <td>
          state1.sum1: {{state1.sum1}} <br>
          sum1Ref: {{sum1Ref}}
        </td>
        <td>
          <el-button @click="handleClick1">sum1Ref + 1</el-button>
        </td>
        <td>
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                toRef 为一个响应式对象的<b style="color:yellow">某个</b>属性新建一个 ref，使这两个数据相连接
              </div>
            </template>
            <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
          </el-tooltip>
        </td>
      </tr>
      <tr>
        <td>
          toRefs
        </td>
        <td>
          state2: {{state2}} <br>
          state2Refs: {{state2Refs}}
        </td>
        <td>
          <el-button @click="handleClick2">state2Refs.sum1 + 1</el-button>
          <el-button @click="handleClick3">state2Refs.sum2 + 1</el-button>
        </td>
        <td>
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                toRefs 为一个响应式对象的<b style="color:yellow">每一条</b>属性新建一个 ref
              </div>
            </template>
            <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
          </el-tooltip>
        </td>
      </tr>
    </table>
    
    
  </div>
</template>

<script setup lang="ts">
import {Management} from '@element-plus/icons-vue'
import {reactive, toRef, toRefs} from 'vue'

// toRef 用法
const state1 = reactive({
  sum1: 1,
})
// 此时 fooRef 和 state1.foo 相连接，并且都是响应式的
const sum1Ref = toRef(state1, 'sum1')
function handleClick1 () {
  sum1Ref.value++
}


// toRefs 用法
const state2 = reactive({
  sum1: 1,
  sum2: 2
})

// 此时 state2AsRefs 与 state2 相连接
const state2Refs = toRefs(state2)
function handleClick2 () {
  state2Refs.sum1.value++
  console.log(state2Refs.sum1.value);
  
}
function handleClick3 () {
  state2Refs.sum2.value++
}
</script>

<style scoped>
</style>
