<template>
  <div class="conition-panel m-b-10">
    <div class="flex filter-item" v-for="item of data" :key="item.key">
      <div
        :style="largeTitle ? { width: '80px', 'min-width': '80px' } : { width: '40px', 'min-width': '40px' }"
        class="bold"
      >
        {{ item.keyName }}
      </div>
      <div style="width: 100%;" class="flex-between">
        <CP_MyFilterButton :item="item" :data="item.dataList" :value="item.value" @input="handleClick" small> </CP_MyFilterButton>
        <slot name="option-top"></slot>
      </div>
    </div>
    <div class="flex-between m-t-10">
      <!-- 为父组件放置一个插槽 -->
      <slot name="option-left"></slot>

      <div class="flex-start">
        <!-- 中英显示 -->
        <!-- <div style="display: flex">
          <div v-bind:hidden="noLanguage" class="dynamic_font2" style="position: relative; right: 12px">
            <span style="width: 40px; min-width: 40px; position: relative; right: 10px; font-size: 14px" class="bold">{{
              ChiEng.keyName
            }}</span>
            <span>
              <span style="font-size: 3px">
                <CP_MyFilterButton
                  :item="ChiEng"
                  :data="ChiEng.dataList"
                  :value="ChiEng.value"
                  @input="handleClick"
                  style="font-size: 14px"
                  small
                ></CP_MyFilterButton
              ></span>
            </span>
          </div>
          <div>
            <span class="dynamic_font">共计 {{ total }} 个{{ cate }}</span>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import CP_MyFilterButton from './CP_MyFilterButton.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    CP_MyFilterButton
  },
  props: ['data', 'cate', 'language', 'largeTitle', 'total', 'noLanguage'],
  watch: {
    // language: {
    //   async handler() {
    //     if (this.language === '1' && this.search !== '') {
    //       this.ChiEng.value = this.ChiEng.dataList[0].id; // 按钮的 active 状态
    //       this.$emit('handleClick', [this.language, this.ChiEng]);
    //     } else if (this.language === '2') {
    //       // 只有在输入中文时，active状态是EN的时候在切换状态
    //       if (this.ChiEng.value === '1') {
    //         this.ChiEng.value = this.ChiEng.dataList[1].id; // 按钮的 active 状态
    //         this.$emit('handleClick', [this.language, this.ChiEng]);
    //       }
    //     }
    //   },
    //   deep: true
    // },
    total: {
      async handler() {
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    handleClick(data) {
    // console.log(data);
      data[1].value = data[0]; // 按钮的 active 状态
      this.$emit('handleClick', data);
    }
  }
};
</script>

<style scoped lang="scss">
// 设置文字自适应
.dynamic_font {
  white-space: nowrap; /*文字不换行*/
  overflow: hidden; /*超出部分隐藏*/
  // text-overflow: ellipsis; /*溢出部分用省略号表示*/
  font-size: 100%; /*设置字号为100%*/
}
.dynamic_font2 {
  white-space: nowrap; /*文字不换行*/
  font-size: 100%; /*设置字号为100%*/
}
@media screen and (max-width: 950px) {
  .dynamic_font {
    font-size: 50%; /*当屏幕宽度小于800px时，字号缩小到80%*/
  }
}
.conition-panel {
  font-size: 14px;
  line-height: 2;
  // background-color: pink;
  .filter-item {
    border-bottom: 1px dashed #ddd;
  }
}
</style>
