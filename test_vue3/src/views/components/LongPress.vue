<template>
  {{ count }} 
  <el-button @click="handleClick" @mousedown="downClick" @mouseup="upClick">可长按</el-button>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const count = ref(0);
  const timer1 = ref('');
  const timer2 = ref('');

  function handleClick() {
    count.value++
  }
  function downClick() {
    console.log('按下');
    // 计算按下后未抬起的时间，超过1.5s则启动长按机制
    timer1.value = setTimeout(() => {
      timer2.value = setInterval(() => {count.value++},200)
    }, 1000);
  }
  function upClick() {
    console.log('抬起');
    clearTimeout(timer1.value)
    clearTimeout(timer2.value)
  }

</script>

<style scoped>
</style>
