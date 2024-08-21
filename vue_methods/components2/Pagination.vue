<template>
  <div>
    <el-pagination class="my-pagination" v-model:current-page="props.currentPage" v-model:page-size="props.currentLimit"
      :page-sizes="pageLimitGroup" size="small" layout="total, prev, pager, next, sizes, jumper "
      :total="props.dataCount" :background="true" @size-change="(val) => emit('size-change', val)"
      @current-change="(val) => emit('current-change', val)" />
  </div>
</template>

<script setup lang="ts">
// 定义props
const props = defineProps({
  currentPage: Number,
  currentLimit: Number,
  pageLimitGroup: Array,
  dataCount: Number,
  background: Boolean
});
// 定义emit
const emit = defineEmits(['size-change', 'current-change']);
</script>

<style lang="scss">
/** @todo: 注: 这里不要加 scoped, 否则样式不生效 */
.my-pagination .el-pagination.is-background .btn-next.is-active,
.el-pagination.is-background .btn-prev.is-active,
.el-pagination.is-background .el-pager li.is-active {
  background-color: #fff;
  color: var(--main1-6);
  border-radius: 5px;
  border: 1px var(--main1-6) solid;
}

.my-pagination .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #fff;
  color: black;
  border-radius: 5px;
  border: 1px #ddd solid;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background-color: #fff;
  color: black;
  border-radius: 5px;
  border: 1px #ddd solid;
}

.el-pagination.is-background .btn-next.is-disabled,
.el-pagination.is-background .btn-next:disabled,
.el-pagination.is-background .btn-prev.is-disabled,
.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .el-pager li.is-disabled,
.el-pagination.is-background .el-pager li:disabled {
  background-color: #fff;
  color: black;
  border-radius: 5px;
  border: 1px #ddd solid;
}

.my-pagination .el-select--large .el-select__wrapper {
  border-radius: 5px;
}

.my-pagination .el-input--large .el-input__wrapper {
  border-radius: 5px;
}
</style>

<style lang="scss" scoped>
::v-deep .el-pagination--small .el-select {
  width: 85px;
}

::v-deep .el-pagination__editor.el-input {
  width: 45px;
}
</style>
