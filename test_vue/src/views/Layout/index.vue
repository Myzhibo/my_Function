<template>
  <div class="Layout">
    <!-- 头部 -->
    内容
    <Header class="Layout-header" />
    <!-- 内容 -->
    <Content class="Layout-content">
      <template slot="content">
        <router-view />
      </template>
    </Content> 
  </div>
</template>

<script>
import Header from './Header.vue';
import Content from './Content.vue';
export default {
  name: 'App',
  components: {
    Header, 
    Content
  }
}
</script>

<style lang="scss" scoped>
.Layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}
.Layout-header {
  width: 100%;
  height: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
</style>
