<template>
  <div>
    我是主页： <br>

    <!-- <LayoutAndMenu :data="menuData" defaultPath='test1'>
      <template #prefix>
        <img src="/backHXN_logo.png" alt="" style="width: 160px; height: 100%; display: block" />
      </template>
<template #suffix>
        <div>试题篮</div>
      </template>
</LayoutAndMenu>

<TextCard :cardData="cardData" :ifChild="cardData.children">
  <template #prefix>
        <div>
          <img src="/backHXN_logo.png" alt="" style="width: 160px; height: 100%; display: block" />
        </div>
      </template>
  <template #suffix>
        <div>
          <el-button>123</el-button>
        </div>
      </template>
</TextCard>

<FilterGroup :filterData="filterData" @change="handleClick">

</FilterGroup> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { message } from '@pureadmin/components';
import { ElMessageBox } from 'element-plus';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

// import LayoutAndMenu from './LayoutAndMenu/LayoutAndMenu.vue';
// import TextCard from './TextCard.vue';
// import FilterGroup from './FilterGroup.vue';

const menuData = ref([
  { path: 'test1', name: '测试1' }, { path: 'test2', name: '测试2' }, { path: 'test3', name: '测试3' },
  { path: 'test4', name: '测试4' }, { path: 'test5', name: '测试5' }, { path: 'test6', name: '测试6' },
  { path: 'test7', name: '测试7' }, { path: 'test8', name: '测试8' }, { path: 'test9', name: '测试9' },
  { path: 'test7', name: '测试7' }, { path: 'test8', name: '测试8' }, { path: 'test9', name: '测试9' },
  { path: 'test7', name: '测试7' }, { path: 'test8', name: '测试8' }, { path: 'test9', name: '测试9' },
]);
const cardData = ref({
  name: '123',
  info: {
    subject: '数学'
  },
  children: [{
    name: '111',
    info: {
      subject: '语文'
    },
  },
  {
    name: '222',
    info: {
      subject: '英语'
    },
  }
  ]
})
const filterData = ref(
  [
    { label: '类型', filters: [{ label: '全部', value: 'all' }], active: 'all' },
    { label: '年份', filters: [{ label: '全部', value: 'all' }, { label: '2025', value: '2025' }, { label: '2024', value: '2024' }, { label: '2023', value: '2023' }, { label: '更早', value: 'early' }], active: 'all' },
    { label: '年份2', filters: [{ label: '全部', value: 'all' }, { label: '2025', value: '2025' }, { label: '2024', value: '2024' }, { label: '2023', value: '2023' }, { label: '更早', value: 'early' }, { label: '全部', value: 'all' }, { label: '2025', value: '2025' }, { label: '2024', value: '2024' }, { label: '2023', value: '2023' }, { label: '更早', value: 'early' }, { label: '全部', value: 'all' }, { label: '2025', value: '2025' }, { label: '2024', value: '2024' }, { label: '2023', value: '2023' }, { label: '更早', value: 'early' }], active: 'all' },
    { label: '地区', filters: [{ label: '全部', value: 'all' }, { label: '北京', value: '北京' }, { label: '天津', value: '天津' }, { label: '辽宁', value: '辽宁' }, { label: '@@@1', value: '@@@1' }, { label: '@@@2', value: '@@@2' }, { label: '@@@3', value: '@@@3' }, { label: '@@@4', value: '@@@4' }, { label: '@@@5', value: '@@@5' }, { label: '@@@6', value: '@@@6' }, { label: '@@@7', value: '@@@7' }, { label: '@@@8', value: '@@@8' }, { label: '@@@9', value: '@@@9' }, { label: '@@@11', value: '@@@11' }, { label: '@@@22', value: '@@@22' }, { label: '@@@33', value: '@@@33' }], active: 'all' },
  ]
)
const handleClick = (val) => {
  filterData.value.forEach(item => {
    if (item.label === val.label) item.active = val.active;
  });
}
</script>

<style lang="scss" scoped></style>