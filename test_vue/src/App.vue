<template>
  <div id="app">
      <router-view /><!-- 当前组件下的路由展示区 -->
  </div>
</template>

<script>
import { __canvasWM } from './scripts/waterMark';

export default {
  name: 'App',
  components: {
  },
  created () {
    console.log('初始');
    // 添加水印
    __canvasWM({
      content: '我是水印'
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
