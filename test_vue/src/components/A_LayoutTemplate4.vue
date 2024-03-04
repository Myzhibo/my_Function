<template>  
  <div id="app">  
    <!-- 固定顶部 -->  
    <div class="fixed-top">  
      顶部内容  
    </div>  
  
    <!-- 可滚动内容区域 -->  
    <div class="scrollable-content">  
      中间内容  
      <!-- 长篇文字或其他内容 -->  <p v-for="i in 50" :key="i">  
          {{i}}11Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
        </p>  
    </div>  
  
    <!-- 固定底部 -->  
    <div class="fixed-bottom">  
      底部内容  
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  name: 'App',  
  // ...其他组件选项  
};  
</script>  
  
<style>  
#app {  
  display: flex;  
  flex-direction: column;  
  min-height: 100vh; /* 确保容器至少占据整个视口高度 */  
  overflow: hidden; /* 防止整体滚动 */  
  position: relative; /* 为固定定位的子元素设置参考点 */  
}  
  
.fixed-top,  
.fixed-bottom {  
  position: fixed; /* 固定位置 */  
  width: 100%; /* 宽度全屏 */  
  z-index: 10; /* 确保固定在其他内容之上 */  
  background-color: #f5f5f5;  
}  
  
.fixed-top {  
  top: 0; /* 固定在顶部 */  
  height: 50px; /* 可以根据需要调整高度 */  
  line-height: 50px; /* 垂直居中单行文本 */  
}  
  
.fixed-bottom {  
  bottom: 0; /* 固定在底部 */  
  height: 50px; /* 可以根据需要调整高度 */  
  line-height: 50px; /* 垂直居中单行文本 */  
}  
  
.scrollable-content {  
  flex: 1; /* 占据剩余空间 */  
  padding: 20px; /* 为内容添加内边距，防止与固定元素重叠 */  
  overflow-y: auto; /* 启用垂直滚动 */  
  margin-top: 50px; /* 为顶部固定元素留出空间 */  
  margin-bottom: 50px; /* 为底部固定元素留出空间 */  
}  
</style>