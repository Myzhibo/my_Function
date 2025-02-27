<template>
  <!-- 虚拟列表：固定子项高度 -->
  <div id="app">
    <!-- 可视区(container) -->
    <div ref="containerRef" class="container" @scroll="scrollEvent">
      <!-- 内容虚拟撑开区(phantom) -->
      <div class="phantom" :style="{ height: phantomHeight + 'px' }"></div>
      <!-- 内容可见区(content) -->
      <div class="content" :style="{ transform: getTransform }">
          <div v-for="item in visibleData" ref="items" :key="item.id" class="content-item"
            :style="{ height: itemHeight + 'px', lineHeight: itemHeight + 'px' }">
            {{ item.id }}
          </div>
        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, computed, onMounted, watch } from 'vue';
  // 列表数据
  const listData = ref(new Array(1000).fill({}).map((item, index) => ({ id: index })))
  // 固定子项高度
  const itemHeight = ref(60)
  // 可视区数据
  const visibleInfo = reactive({
    startIndex: 0,// 起始索引
    endIndex: 0,// 结束索引
    height: 0,// 可视区高度
  })
  // 可视区内容
  const visibleData = computed(() => {
    return listData.value.slice(visibleInfo.startIndex, Math.min(visibleInfo.endIndex, listData.value.length))
  })
  // 可视区子项个数
  const visibleCount = computed(() => {
    // 为什么是ceil：ceil是向上取整 有小数就+1 确保足量数量不留白
    return Math.ceil(visibleInfo.height / itemHeight.value)
  })
  // 内容区需要被撑开的高度
  const phantomHeight = ref(0)
  // 可视区示例
  const containerRef = ref(null)
  // 偏移量
  const startOffset = ref(0)
  // 偏移量对应的style：滚动后偏移多少子项元素 需要增补回来
  const getTransform = computed(() => `translate3d(0,${startOffset.value}px,0)`)

  // 初始化
  onMounted(() => {
    visibleInfo.height = containerRef.value.clientHeight
    phantomHeight.value = listData.value.length * itemHeight.value
    visibleInfo.startIndex = 0
    visibleInfo.endIndex = visibleInfo.startIndex + visibleCount.value
  })
  // 监听可视区滚动事件
  const scrollEvent = (e) => {
    const scrollTop = e.target.scrollTop
    // 为什么是floor：floor是向下取整 取整数部分 确保每个子项完整滚动
    visibleInfo.startIndex = Math.floor(scrollTop / itemHeight.value)
    visibleInfo.endIndex = visibleInfo.startIndex + visibleCount.value
    startOffset.value = visibleInfo.startIndex * itemHeight.value
  }
</script>

<style lang="scss" scoped>
.container {
  width: 200px;
  height: 300px;
  -webkit-overflow-scrolling: touch;
  overflow: auto;
  position: relative;
  background-color: aqua;
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  background-color: yellow;
}
.content-item {
  box-sizing: border-box;
  border: 1px solid #ddd;
  text-align: center;
  color: #333;
}
</style>
