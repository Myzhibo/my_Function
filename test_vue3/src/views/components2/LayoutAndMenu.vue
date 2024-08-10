<template>
  <div class="container">
    <div class="content">
      <slot name="prefix"></slot>
      <div style="display: flex; width: 100%; min-width: 400px; overflow-x: hidden; white-space: nowrap; padding: 0px 20px;">
        <span v-if="needPaging" :style="{color: scrollLeft === 0 ? '#ddd' : '' }"
          class="no-select" style="margin-right: 20px; cursor: pointer;" @click="handleClick('left')"> < </span>
        <ul class="navbar-nav no-select" ref="scrollContainer">
          <li v-for="item of data" :key="item.path" style="margin-right: 20px; font-weight: 500; cursor: pointer;"
            @click="handleSelect(item.path)"
          >
            {{item.name}}
          </li>
        </ul>
        <span v-if="needPaging" :style="{color: ifMaxRight ? '#ddd' : '' }"
          class="no-select" style="margin-left: 20px; cursor: pointer;" @click="handleClick('right')"> > </span>
      </div>
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch, nextTick } from 'vue';
import { message } from '@pureadmin/components';
import { ElMessageBox } from 'element-plus';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
const route = useRoute();
const router = useRouter();
const routers = useRouter().options.routes;

const props = defineProps({
  /** [{ path: 'test1', name: '测试1'},{path: 'test2', name: '测试2'}] */
  data: {
    type: Array,
    required: () => []
  },
  /** 'test1' */
  defaultPath: {
    type: String,
    default: ''
  }
});

// 默认选中的tab
const activeIndex = computed(() =>{
  return props.defaultPath;
})

const handleSelect = (path) => {
  route.path === ('/'+path) ? '' : router.push('/'+path);
}

onMounted(() => {
  // 监听视口
  getWindowWidth();
  window.onresize = () => {
    return (() => {
      nextTick(() => {
        getWindowWidth();
      });
    })();
  };
})

const windowWidth = ref(0);
const needPaging = ref(false);
const getWindowWidth = () => {
  windowWidth.value = window.innerWidth;
  // 宽度小于1500 就让 right icon 出现
  if (windowWidth.value && windowWidth.value < 1500) needPaging.value = true;
  else needPaging.value = false;
  
  ifMaxRight.value = ifScrollAtRight();
}

// 判断当前滚动条是否在最右边
const ifScrollAtRight = () => {
  const scrollContainer = document.querySelector('.navbar-nav');
  const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;
  if (scrollWidth - scrollLeft <= clientWidth + 5) {
    console.log('滚动条已经到达最右边');
    return true;
  } else {
    return false;
  }
}

const ifMaxRight = ref(false);
const scrollLeft = ref(0);
const handleClick = (ty) => {
  const scrollContainer = document.querySelector('.navbar-nav');

  if (ty==='left') {
    scrollContainer.scrollLeft -= 100; // 每次向左滚动100px
    ifMaxRight.value = false;
    if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = 0; // 防止反向滚动超出界限
    }
  }
  if (ty==='right') {
    scrollContainer.scrollLeft += 100; // 每次向右滚动100px

    ifMaxRight.value = ifScrollAtRight();
  }

  scrollLeft.value = scrollContainer.scrollLeft;
}
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  display: flex;
  align-item: center;
  justify-content: center;
  border-bottom: 1px #dcdfe6 solid;
}
.content {
  display: flex;
  width: 80%;
}
.MyMenu {
  width: 100%;
  min-width: 400px;
}
::v-deep .el-menu--horizontal.el-menu {
  border-bottom: none;
}

.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto; /* 允许横向滚动 */
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.navbar-nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
.no-select {
  -webkit-user-select: none; /* Chrome all / Safari all */
  -moz-user-select: none; /* Firefox all */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* Likely future */
}
</style>