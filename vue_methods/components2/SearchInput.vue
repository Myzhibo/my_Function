<template>
  <div>
    <el-input class="my-input" v-model="localValue" :placeholder="props.placeholder" :prefix-icon="Search"
      @input="(val) => emit('update:modelValue', val)" @keyup.enter="(val) => emit('enter', val)">
      <template #append>
        <div style="display: flex; align-items: center; justify-content: center">
          <span class="leftBorder">|</span>
          <el-button @click="emit('click')">搜索</el-button>
        </div>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
// 定义props
const props = defineProps({
  modelValue: String,
  placeholder: String
});

// 定义emit
const emit = defineEmits(['update:modelValue', 'enter', 'click', 'clearInput']);

// 定义一个本地变量来存储输入值，以便能够响应式地更新
const localValue = ref(props.modelValue);
// 监听本地变量的变化，并更新父组件的 modelValue
watch(
  () => localValue.value,
  (newValue) => {
    emit('update:modelValue', newValue);

    if (!newValue) {
      emit('clearInput');
    }
  }
);
</script>

<style scoped lang="scss">
.my-input {
  height: 35px;

  ::v-deep .el-input__prefix-inner> :first-child,
  .el-input__prefix-inner> :first-child.el-input__icon {
    font-size: 20px;
  }

  ::v-deep .el-input-group__append,
  .el-input-group__prepend {
    background-color: #fff;
  }

  // 左
  ::v-deep .el-input__wrapper {
    box-shadow: none;
    border: 1px #dcdfe6 solid;
    border-right: none;
    border-radius: 5px 0px 0px 5px;
    height: 35px;
  }

  // 右
  ::v-deep .el-input-group__append {
    width: 100px;
    box-shadow: none;
    border: 1px #ddd solid;
    border-left: none;
    border-radius: 0px 5px 5px 0;
  }

  ::v-deep .el-input-group__append button.el-button,
  .el-input-group__append button.el-button:hover,
  .el-input-group__append div.el-select .el-select__wrapper,
  .el-input-group__append div.el-select:hover .el-select__wrapper,
  .el-input-group__prepend button.el-button,
  .el-input-group__prepend button.el-button:hover,
  .el-input-group__prepend div.el-select .el-select__wrapper,
  .el-input-group__prepend div.el-select:hover .el-select__wrapper {
    margin-left: -10px;
  }

  .leftBorder {
    color: #dcdfe6;
    margin-right: 10px;
  }
}
</style>
