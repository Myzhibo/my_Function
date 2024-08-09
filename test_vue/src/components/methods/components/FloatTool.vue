<template>
  <div class="c-float-tool">
    <div v-for="item of data.filter(item => !item.removeMe)" class="c-float-tool-item" 
        :class="{ active: !!item.active, active2: !!item.active2 }"
        @click="handleClick(item)">
      <i :class="item.icon" :style="item.iconStyle" />
      <span v-html="item.name"></span>
    </div>

  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'FloatTool',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    handleClick(beClickItem) {
      this.$emit(beClickItem.emitCallName, beClickItem);
    }
  }
};
</script>

<style lang="scss" scoped>
.c-float-tool {
  width: 100%;
  height: auto;

  &-item {
    cursor: pointer;
    user-select: none;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    background: #fff;
    padding: 5px 0;

    > span {
      font-size: 12px;
    }

    &:not(:last-child) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &:not(:first-child) {
      border-top: none;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    &.active {
      background: #409eff;
      color: #fff;
    }
    &.active2 {
      background: #f19000bf;
      color: #fff;
    }
  }
}
</style>
