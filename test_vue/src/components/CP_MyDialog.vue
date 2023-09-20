<template>
  <div class="main">
    <el-dialog
      ref="myDialog"
      @open="open"
      :modal="true"
      :append-to-body="true"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      :show-close="true"
      :close-on-press-escape="true"
      :before-close="handleClose"
      :title="title"
      :visible.sync="isShow"
      :width="width"
      :height="height"
      :class="{ 'wrap': ifWrap }"
      center
    >
        <!-- 为父组件放置一个插槽 -->
        <slot name="option"></slot>
    </el-dialog>
  </div>
</template>


<script>
export default {
  props: {
    needTitle: {
      type: Boolean,
      default: true,
    },
    isShows: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '新增',
    },
    width: {
      type: String,
      default: '40%',
    },
    height: {
      type: String,
      default: '1000px',
    },
    ifWrap: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
    };
  },
  mounted() {
  },
  watch: {
    isShows(newValue) {
      this.isShow = newValue;
    },
  },
  methods: {
    // 打开
    open() { },
    // // 右上角退出
    handleClose() {
      this.isShow = false;
      // 通知父组件关闭
      this.$emit('getShow', false);
    },
  },
};
</script>
<style scoped lang="scss">
.wrap{
  white-space: nowrap; /*文字不换行*/
  overflow: hidden; /*超出部分隐藏*/
  // text-overflow: ellipsis; /*溢出部分用省略号表示*/
  font-size: 100%; /*设置字号为100%; */
  min-width: 40% !important; 
}
</style>
