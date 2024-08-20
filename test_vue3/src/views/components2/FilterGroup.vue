<template>
  <div class="button-group">
    <div v-for="item in filterData" style="margin-bottom: 15px;">
      <span class="label">{{item.label}}</span>
      <template v-if="item.filters.length < 10">
        <span class="button" v-for="filter in item.filters" :key="filter.value" @click="handleClick(item.label, filter)" 
          :class="{ 'act-button': item.active === filter.value }"
        >
          {{filter.label}}
        </span>
      </template>
      <template v-else>
        <el-select v-model="item.active" size="large" style="width: 240px" @change="val => handleChange(val, item.label)">
          <el-option v-for="filter in item.filters" :key="filter.value" :label="filter.label" :value="filter.value" />
        </el-select>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
// 定义props
const props = defineProps({
  /** [ {label: '年级', filters: [{label: '全部', value: 'all'}], active: 'all'}, ]  */
  filterData: Array,
});
// 定义emit
const emit = defineEmits(['change']);

const handleClick = (activeLabel: string, activeFilter: string) => {
  // 构造一个对象，只包含需要更新的信息
  const updateData = { label: activeLabel, active: activeFilter.value };
  emit('change', updateData);
};
const handleChange = (val, activeLabel) => {
  const updateData = { label: activeLabel, active: val };
  emit('change', updateData);
};

</script>

<style lang="scss" scoped>
// @import '@/styles/_vars.scss';
.button-group {
  display: inline-block;
  color: #606266;
  .label {
    font-weight: 700;
    font-size: 14px;
    margin-right: 20px;
  }
  .button {
    display: inline-block;
    line-height: 1;
    cursor: pointer;
    // transtion: all 0.1s;
    font-weight: 500;
    font-size: 14px;
    padding: 6px 10px;
    margin-right: 5px;
    &:hover {
      color: #3AA5FF;
    }
    &:last-child {
      margin-right: 00px;
    }
  }
  .small-button {
    padding: 3px 5px;
  }
  .act-button {
    color: #fff;
    border-radius: 5px;
    background-color: rgb(105 184 251);
    &:hover {
      color: #fff;
    }
  }
}
</style>
