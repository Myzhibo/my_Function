<template>
  <div class="menu-container">
    <div class="content">
      <slot name="prefix"></slot>
      <div class="menu-content" ref="menuContainer">
        <span v-if="showArrow" class="no-select leftArrow" :style="{ color: scrollLeft === 0 ? '#ddd' : '' }"
          @click="handleClick('left')">
          <el-icon class="icon">
            <ArrowLeft />
          </el-icon>
        </span>
        <ul class="navbar-nav no-select" ref="scrollContainer">
          <li v-for="item of menuData.filter(item => !item.hidden)" :key="item.path" class="navbar-li"
            @click="handleSelect(item)">
            <div v-if="route.path.includes(item.name) || props.currentPath === item.path" class="activeLine"></div>
            <div :style="{
              color:
                route.path.includes(item.name) || props.currentPath === item.path
                  ? 'var(--main1-6)'
                  : ''
            }" class="tab-name">
              {{ item.tabName }}
            </div>
          </li>
        </ul>
        <span v-if="showArrow" class="no-select rightArrow" :style="{ color: ifMaxRight ? '#ddd' : '' }"
          @click="handleClick('right')">
          <el-icon class="icon">
            <ArrowRight />
          </el-icon>
        </span>
      </div>
      <slot name="suffix"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';


export interface IMenuDataProps {
  menuData: { path?: string; tabName: string; name?: string; hidden?: Boolean }[];
  currentPath: string;
}

export interface IMenuDataEmits {
  (e: 'update:modelValue', value: boolean): void;
  (e: 'change', path: string): void;
}


const store = useStore();
const route = useRoute();
const router = useRouter();

// 定义props
const props = withDefaults(defineProps<IMenuDataProps>(), {
  menuData: [
    { path: '', tabName: '', name: '', currentTab: '', hidden: true }
  ] /** [{ path: 'test1', tabName: '测试1'},{path: 'test2', tabName: '测试2'}]  */,
  currentPath: ''
});
// 定义emit
const emits = defineEmits<IMenuDataEmits>();

// 当前选中的tab
const activeIndex = computed(() => {
  console.log(route);

  return route.path;
});

const handleSelect = (item: any) => {
  emits('change', item);
};

const menuContainer = ref(null);
const scrollContainer = ref(null);

onMounted(() => {
  getWindowWidth();
  window.onresize = () => {
    return (() => {
      getWindowWidth();
    })();
  };
});

const getWindowWidth = () => {
  ifMaxRight.value = ifScrollAtRight();
};

// 判断当前滚动条是否在最右边
const ifScrollAtRight = () => {
  if (scrollContainer.value) {
    const { scrollWidth, scrollLeft, clientWidth } = scrollContainer.value;
    if (scrollWidth - scrollLeft <= clientWidth + 1) {
      console.log('滚动条已经到达最右边');
      return true;
    } else {
      return false;
    }
  }
};

// 判断是否可以显示 左右箭头
const showArrow = computed(() => {
  // 如果左右箭头都是灰色的话，说明此时不需要箭头。那么此时就需要隐藏 左右箭头
  if (scrollLeft.value === 0 && !!ifMaxRight.value) return false;
  else return true;
});

const ifMaxRight = ref(false);
const scrollLeft = ref(0);

const handleClick = (ty: string) => {
  if (ty === 'left') {
    scrollContainer.value.scrollLeft -= 100; // 每次向左滚动100px
    ifMaxRight.value = false;
    if (scrollContainer.value.scrollLeft <= 0) {
      scrollContainer.value.scrollLeft = 0; // 防止反向滚动超出界限
    }
  }
  if (ty === 'right') {
    scrollContainer.value.scrollLeft += 100; // 每次向右滚动100px
  }

  ifMaxRight.value = ifScrollAtRight();
  // 滚动条距离左边的长度；
  scrollLeft.value = scrollContainer.value.scrollLeft;
};

watch(
  () => props.menuData,
  () => {
    scrollLeft.value = 0;
    ifMaxRight.value = false;
    scrollContainer.value.scrollLeft = 0;
    getWindowWidth();
  }
);
</script>

<style lang="scss" scoped>
.menu-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  // border-bottom: 1px #dcdfe6 solid;
}

.content {
  display: flex;
  align-items: center;
  width: 100%;
  overflow: auto;
  overflow-y: hidden;
  // background-color: red;

  .menu-content {
    display: flex;
    align-items: center;
    width: 100%;
    overflow-x: hidden;
    white-space: nowrap;
    // padding: 0px 20px;
    // background-color: green;

    .leftArrow {
      margin-right: 8px;
      cursor: pointer;
    }

    .rightArrow {
      margin-left: 20px;
      cursor: pointer;
    }
  }
}

::v-deep .el-menu--horizontal.el-menu {
  border-bottom: none;
}

.navbar-nav {
  // background-color: pink;
  font-size: 18px;
  display: flex;
  // align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto;
  /* 允许横向滚动 */
  -ms-overflow-style: none;
  /* IE 和 Edge */
  scrollbar-width: none;
  /* Firefox */

  .navbar-li:not(:first-child) {
    margin-left: 32px;
  }

  .navbar-li {
    // margin-left: 32px;
    font-weight: 400;
    cursor: pointer;
    position: relative;

    .activeLine {
      width: 100%;
      height: 3px;
      background-color: var(--main1-6);
      position: absolute;
      bottom: 0px;
      border-radius: 10px 10px 0 0;
    }
  }
}

.navbar-nav::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera */
}

.no-select {
  -webkit-user-select: none;
  /* Chrome all / Safari all */
  -moz-user-select: none;
  /* Firefox all */
  -ms-user-select: none;
  /* IE 10+ */
  user-select: none;
  /* Likely future */
}
</style>
