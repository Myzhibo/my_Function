<template>
  <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title">css布局模版</template>
            <el-menu-item index="lay1">选项1</el-menu-item>
            <el-menu-item index="lay2">选项2</el-menu-item>
          </el-submenu>

          <el-menu-item index="home">HelloWorld</el-menu-item>

          <el-submenu index="11">
            <template slot="title">功能</template>
            <el-menu-item index="selection">选择文本</el-menu-item>
          </el-submenu>

          <el-menu-item index="vir">虚拟滚动</el-menu-item>
          
          <el-menu-item index="vir2">虚拟滚动2</el-menu-item>

          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex: 'home',
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        console.log(this.$route.path);
        // 跳转router
        this.$route.path === ('/'+key) ? '' : this.$router.push('/'+key);
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>