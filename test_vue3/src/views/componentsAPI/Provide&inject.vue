<template>
  <div>
    <table border=1>
      <tr>
        <td>
          依赖注入 基本数据类型
        </td>
        <td>
          {{msg1}}
        </td>
      </tr>
      <tr>
        <td>
          依赖注入 引用数据类型
        </td>
        <td>
          {{msg2}} <el-button @click="handleClick">msg2.data + 1</el-button>
        </td>
        <td>
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                父组件中 provide 提供响应式引用 state <br>
                子组件中 inject 注入的 msg2 是一个响应式引用 <br>
              </div>
            </template>
            <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
          </el-tooltip>
        </td>
      </tr>
      <tr>
        <td>依赖注入 引用数据类型中某个属性</td>
        <td>{{msg3}}  <el-button @click="handleClick2">msg3 + 1</el-button></td>
        <td>
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                如果父组件传递的是一个引用数据类型的某个属性 <br>
                要使用 计算属性 或者 toRef 来实现响应式再传给子组件 <br>
                - provide('msg3', toRef(state, 'data'))
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
import { inject } from "vue"

const msg1 = inject('msg1');
const msg2 = inject('msg2');
let msg3 = inject('msg3');

function handleClick() {
  msg2.data++
}
function handleClick2() {
  msg3.value++
}


</script>

<style scoped>
</style>
