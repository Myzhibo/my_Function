<template>
  <div>
    <div
      slot="signal"
      class="text-card-container"
      style="position: relative; margin-bottom: 10px"
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
          data.inBasket ? 'in-basket' : '',
        ]"
      >
          <!-- 删除文章篮图标显隐 -->
          <div
            v-if="!deleteHidden"
            class="text-card-container-left"
            style="position: absolute; top: 0px; right: 0px; cursor: pointer"
          >
            <i
              class="el-icon-error"
              style="color: rgba(190, 32, 32, 0.822); font-size: 23px"
              @click.stop="deleteSingleData" />
          </div>
          <div
            v-show="multiDelete"
            :class="{ active: isActive }"
            style="position: absolute; top: 0px; right: 0px; cursor: pointer"
          >
            <i class="el-icon-error" style="font-size: 23px" />
          </div>

          <!-- 内容  -->
          <!-- <div style="display: flex; align-items: center; justify-content: space-between;"> -->
              <div>
                  {{ data }}
              </div>
              <div class="c-readingset-item-inner-ops">
                <el-dropdown @click.native.stop @command="handleCommand($event, data)">
                  <span class="el-dropdown-link">
                    <el-link :underline="false"> <i class="el-icon-more" style="font-size: 20px" /> </el-link>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
          <!-- </div> -->


          <!-- footer -->
          <div class="footer" v-if="!footerHidden">
            <!-- 为父组件放置一个插槽 -->
            <slot name="option"></slot>    <!-- 只放置插槽、用来[接收]父组件传值 -->
            <slot name="button_option" :text="data"></slot>     <!-- 放置插槽并[向]父组件传值 -->
          </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CP_MyCard',
  data(){
    return {
      isActive: false,
    }
  },
  props: {
    data: Object,
    // serial_num,   // 卡片序号
    // keyword,      // 高亮关键词
    // subscribe,
    // headerHidden,
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
    footerHidden: {
      type: Boolean,
      default: false,    // 是否隐藏卡片底部
    },
    deleteHidden: {
      type: Boolean,
      default: true,    // 是否隐藏删除icon
    },
    multiDelete: {
      type: Boolean,
      default: false,   // 是否开启批量删除模式
    },
    cancelSelected: {
      type: Boolean,
      default: false,   // 是否取消批量删除选中的卡片
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
    console.log(this.data);
  },
  watch: {
    cancelSelected() {
        if (this.cancelSelected === false) {
          this.isActive = false;
        } else {
          this.isActive = true;
        }
    }
  },
  methods:{
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
      console.log(this.data._id);
      this.$emit('getHidden', false, this.data._id);
    },
    // 鼠标移出卡片
    leaveCard() {
      this.$emit('getHidden', true, '');
    },
    deleteSingleData() {
      this.$emit('deleteSingleData', this.data)
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
    // 点击卡片事件 -- 批量删除
    clickDelete() {
      this.isActive = !this.isActive;
      this.$emit('getId', this.data._id);
    },
    // 点击卡片事件 -- 点击卡片
    clickCard(router) {
      console.log(this.$route.path);
      if (router === '/fullTextLib') {
        this.$router.push({
          path: '/editFullText',
          name: 'editFullText',
          params: this.data,
          query: { id: this.data._id },
        });
      }
      console.log(this.data);
    },

    // 操作

  handleCommand(e, item) {
    this.book = item;
    if (e === 'delete') {
      console.log(item);
    }
    if (e === 'edit') {
      console.log(item);
      this.bookName = item.name;
      this.displayEditDialog = true;
    }
  }
    
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

.footer{
  // background-color: pink;
  display: flex;
  align-items: center;
  justify-content: space-between; 
  
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
}

.c-readingset-item {
  cursor: pointer;
  margin-bottom: 10px;
  margin-right: 5px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.13);
  &-inner {
    display: flex;
    &-icon {
      position: relative;
      top: 20px;
      left: -5px;
      flex: none;
    }
    &-content {
      flex: auto;
      width: calc(100% - 90px);
      &-title {
        font-size: 20px;
        font-weight: 20px;
        margin-bottom: 3px;
        // background-color: red;
      }
      &-guide {
        font-size: 14px;
        font-weight: 14px;
        width: 95%;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        // background-color: green;
      }
      &-info {
        display: flex;
        font-size: 12px;
        // background-color: yellow;
        > span {
          padding: 3px 0px;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    &-ops {
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
    }
  }
}
</style>