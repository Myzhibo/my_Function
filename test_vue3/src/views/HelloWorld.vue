<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <el-button @click="increment">Increment</el-button>
    <el-button @click="decrement">Decrement</el-button>

    <br><br>

    <el-button @click="changeState">直接修改Pinia里的state值, 将count变成100</el-button>
  </div>
</template>
  
<script setup lang="ts">
import { useCounterStore } from '../store/counter';
  const counterStore = useCounterStore();

  function increment() {
    counterStore.increment()
  }
  function decrement() {
    counterStore.decrement()
  }

  function changeState() {
    counterStore.count = 100;
  }
</script>