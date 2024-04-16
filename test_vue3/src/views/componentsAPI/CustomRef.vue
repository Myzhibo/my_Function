<template>
  <div>
    <input type="text" v-model="keyword" /> 
    <el-tooltip placement="right-end" effect="dark">
      <template #content>
        <div style="max-width: 550px; max-height: 250px; overflow: auto">
          customRef接收一个函数，该函数接收两个参数 track 与 trigger ， <br>
          且需要返回包含有get、set方法的对象。get用于给使用者返回数据，set用于接收新的数据。 <br>
          <br>
          track：通知vue监听数据变化 <br>
          trigger：数据变化后通知vue更新页面 <br>
        </div>
      </template>
      <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
    </el-tooltip>

    <h3>{{ keyword }}</h3>
  </div>
</template>

<script setup lang="ts">
import {Management} from '@element-plus/icons-vue'
import { customRef } from "vue";
//自定义一个 myRef
function myRef(value, delay) {
  let timer;
  return customRef((track, trigger) => {
    return {
      get() {
        track(); // 允许添加依赖
        return value;
      },
      set(newValue) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          value = newValue;
          trigger(); // 触发依赖更新视图
        }, delay);
      },
    };
  });
}

let keyword = myRef("hello", 500);
</script>

<style scoped>
</style>