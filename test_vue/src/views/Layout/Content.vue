
<template>
  <el-container class="layout-content">
    <!-- 页面内容 -->
    <el-main>
      <div class="main-content">
        <slot name="content">
          
        </slot>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  .el-main {
    padding: 0;
    overflow: hidden;
    .top {
      background: #fff;
      height: 54px;
      border-right: none;
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        padding-left: 16px;
      }
    }
    .main-content {
      // padding: 10px;
      // height: calc(100% - 54px);
      width: 100%;
      height: 100%;
      box-sizing: border-box;
    }
  }
}
</style>
