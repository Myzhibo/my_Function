<template>
  <div>
    <table border=1>
      <tr>
        <td>
          ref函数
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                作用： <br>
                定义一个响应式数据 <br>
                创建响应式数据： <br>
                - 当定义一个基本数据类型的响应式时，<b style="color:yellow">使用的是 Object.defineProperty</b> <br>
                - 当定义一个引用数据类型的响应式时，<b style="color:yellow">调用了 reactive 函数</b> <br>
                获取 : 在 js 中需要以 .value 的形式去获取 <br>
              </div>
            </template>
            <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
          </el-tooltip>
        </td>
        <td>
          reactive函数
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                作用： <br>
                定义一个响应式数据 <br>
                创建响应式数据： <br>
                - 不能定义基本数据类型 <br>
                - 当定义一个引用数据类型的响应式时，<b style="color:yellow">使用的是 Proxy 和 Reflect</b> <br>
                获取 : 在 js 中直接获取 <br>
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
import {ref, reactive} from 'vue'
</script>

<style scoped>
</style>
