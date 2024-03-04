<template>  
  <div id="app" class="app-container" style="background-color:pink;">  
    <!-- 上部固定区域 -->  
    <div class="fixed-top" style="top:100px">  
      <h1>固定顶部</h1>  
      <!-- 可以添加其他内容 -->  
    </div>  
  
    <!-- 中部滚动区域 -->  
    <div class="scrollable-middle">  
      <div class="content">  
        <!-- 长篇文字内容 -->  
        <p v-for="i in 50" :key="i">  
          {{i}} = Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.  
        </p>  
      </div>  
    </div>  
  
    <!-- 下部固定区域 -->  
    <div class="fixed-bottom">  
      <p>固定底部</p>  
      <!-- 可以添加其他内容 -->  
    </div>  
  </div>  
</template>  

<script>
export default {
  name: 'A_LayoutTemplate3',
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  }
};
</script>

<style>  
.app-container {  
  display: flex;  
  flex-direction: column;  
  height: 100vh; /* 视口高度 */  
  overflow: hidden; /* 防止整体滚动 */  
}  
  
.fixed-top,  
.fixed-bottom {  
  flex-shrink: 0; /* 防止收缩 */  
  height: 50px; /* 可以根据需要调整高度 */ 
  line-height: 25px; 
  background-color: #f5f5f5; /* 背景色 */  
  overflow: hidden; /* 防止内容溢出 */ 
}  
  
.scrollable-middle {  
  flex: 1; /* 占据剩余空间 */  
  overflow-y: auto; /* 启用垂直滚动 */  
  padding: 20px; /* 可根据需要添加内边距 */  
  background-color: #fff; /* 背景色 */  
}  
</style>