<template>
  <div>
    <div
      slot="signal"
      class="text-card-container m-b-10"
      style="position: relative"
      :class="{ 'select-mode': selectMode }"
    >
      <!-- 是否可选模式 -->
      <el-checkbox v-if="selectMode" v-model="data.checked" style="margin-right: 10px;" @change="getBeChecked" />
      <!-- 卡片 -->
      <el-card
        style="width: 100%"
        shadow="hover"
        @mouseenter.native="hoverCard"
        @mouseleave.native="leaveCard"
        @click.native="handleCardClick"
        :class="[
          // data.inBasket ? 'in-basket' : '',
          data.inBasket ?  ($route.path !=='/propositionConfig' ?'in-basket' : '') : '',
          unfit ? 'unfit' : '',
          subscribe ? 'subscribe' : '',
          // data.content && [0, 1].includes(data.content.rewrite_status) ? 'disabled' : '',
          // data.content && [0, 1].includes(data.content.proposition_status) ? 'disabled' : ''
        ]"
      >

      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CP_MyCard',
  props: {
    data: Object,
    // serial_num,   // 卡片序号
    // keyword,      // 高亮关键词
    // subscribe,
    // unfit,
    // headerHidden,
    // footerHidden,
    // source,
    // currentNode,  // readingset页当前卡片所在节点
    abstractHidden: {
      type: Boolean,
      default: false,
    },
    textHidden: {
      type: Boolean,
      default: false,
    },
    deleteHidden: {
      type: Boolean,
      default: true,
    },
    multiDelete: {
      type: Boolean,
      default: false,
    },
    cancelSelected: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: Number,
      default: 1,      // 1 - 英文，2 - 中文，3 - 中英文
    },
    selectMode: {
      type: Boolean,
      default: false,      // 是否开启可选模式
    },
    open: {
      type: Boolean,
      default: false,      // 开启过渡动画
    },
  },
  components: {
  },
  mounted(){
    console.log(1);
    console.log(this.data);
  },
  method:{
    // 关键字高亮
    highlight(html) {
      if (!this.keyword) {
        return html;
      }
      if (html) {
        return html.replace(new RegExp(this.keyword, 'gi'), (...args) => {
          return `<span class="highlight">${args[0]}</span>`;
        });
      }
    },
    // 可选模式下，选中多选框通知父组件触发'select'
    getBeChecked() {
      this.data.checked = !this.data.checked;
      this.$set(this.data, 'checked', !this.data.checked);
      this.$emit('select', this.data);
    },
    // 鼠标移入卡片
    hoverCard() {
      this.$emit('getHidden', false, this.data._id);
    },
    // 鼠标移出卡片
    leaveCard() {
      this.$emit('getHidden', true, '');
    },
    // 鼠标点击卡片
    handleCardClick() {
      if (this.selectMode) {
        this.$set(this.data, 'checked', !this.data.checked);
        this.$emit('select', this.data);
        return;
      }
      if (this.multiDelete) {
        return this.clickDelete();
      }
      return this.clickCard(this.$route.path);
    },
    
  },

}
</script>

<style scoped lang="scss">
.active {
  color: rgba(190, 32, 32, 0.822);
}
// 设置文字自适应
.dynamic_font2 {
  white-space: nowrap; /*文字不换行*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*溢出部分用省略号表示*/
}
@media screen and (max-width: 1005px) {
  .dynamic_font2 {
    font-size: 2px;
    width: 60px;
  }
}
@media screen and (max-width: 950px) {
  .dynamic_font2 {
    font-size: 2px;
    width: 30px;
  }
}
.text-card-container {
  width: 100%;
  cursor: pointer;
  &.select-mode {
    display: flex;
    align-items: center;
  }
  &-header {
    .c-full-pipeline {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
    }
    .c-full-pipeline-info {
      display: flex;
      flex-wrap: nowrap;
      > a {
        cursor: pointer;
        text-decoration: underline;
        white-space: nowrap;
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
      a:hover{
        color: rgb(0, 68, 255);
      }
    }
  }
  &-content {
    width: 100%;
    .title {
      margin-bottom: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .abstract,
    .origin_article {
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &-footer {
    width: 100%;
  }
}
.in-basket {
  background-color: rgb(233, 253, 233);
}

.subscribe {
  background-color: rgb(233, 253, 233);
}

.unfit {
  background-color: rgb(253, 233, 233);
}

.disabled {
  pointer-events: none;
}

::v-deep .el-card {
  border-color: #ddd;
  border-radius: 5px;

  .highlight {
    background-color: skyblue;
    color: white;
  }
}
::v-deep .el-card__body {
  padding: 10px 20px;
}
</style>