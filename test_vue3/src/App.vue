<template>  
  <div id="app">  
    <!-- <router-link to="/">Home</router-link><br>
    <router-link to="/helloworld">Hello</router-link> -->
    <!-- 导航 -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="">HOME</el-menu-item>
      <el-menu-item index="Vue3API">API</el-menu-item>
      <el-sub-menu>
        <template #title>工具1</template>
        <el-menu-item index="helloworld">hello world</el-menu-item>
        <el-menu-item index="UploadBook">上传</el-menu-item>
        <el-menu-item index="ImageDetail">图片详情</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
    </el-menu>
    <!-- 内容 -->
    <router-view style="padding: 15px;"></router-view>  
  </div>  
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

const route = useRoute();
const router = useRouter();
const routers = useRouter().options.routes;

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  route.path === ('/'+key) ? '' : router.push('/'+key);
}
</script>

<style scoped>
</style>
