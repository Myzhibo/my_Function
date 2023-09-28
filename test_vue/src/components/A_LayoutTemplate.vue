<template>
  <div class="container p-t-100 animated fadeIn">
    <!-- 上方title -->
    <div class="top">
      <span class="tip dynamic_font">tip</span>
      TOP
    </div>
    <!-- 主页内容 -->
    <div class="content" >
      <!-- 左侧tree -->
      <div class="content-left" ref="mytree">
        left
      </div>
      <!-- <CP_MyDragDiv box="content" left="content-left" right="content-right" :leftMin="200" :rightMin="650"/> -->
      <!-- 右侧内容-->
      <div class="content-right">
        <!-- loading加载 -->
        <div class="cover"></div>
        <!-- <div style="position: fixed; z-index: 9999; width: 100%; height: 100%; left: 0; top: 0"> -->
        <!-- <div v-loading="loading" style="position: relative; left: 4%; top: 50%"></div> -->
        <!-- </div> -->
        <!-- 右侧内容 -->
        <div class="content-right-content">
          right
          <!-- 筛选 -->
          <!-- <div class="content-right-content-header p-b-5">
            <FilterSearch
              :data="filterData"
              :total="total"
              cate="文章"
              @handleClick="handleFilterClick"
              :language="language"
              :search="conditions.search"
            >
            </FilterSearch> -->
          </div>
          <!-- 正文List -->
          <!-- <div v-if="loading===false && listData.length>0">
            <div v-for="(text, index) of listData" :key="'lib' + index">
              <TextCard
                :mode="displayMode"
                :data="text"
                :key="'lib' + index"
                :abstractHidden="abstractHidden"
                :subscribe="text.subscribe_status"
                :unfit="text.unfit"
                :keyword="conditions.search"
                :deleteHidden="text._id === cardId ? deleteHidden : true"
                :multiDelete="multiDelete"
                :cancelSelected="cancelSelected"
                :changePage="changePage"
                @getHidden="getHidden"
                @getId="getId"
                @handle-delete="handleDelete(text._id)"
              >
                <div slot="option"  style="margin-top:2px">
                  <slot name="button_option" :text="text"></slot>
                </div>
              </TextCard>
            </div>
          </div>
          <div v-if="loading===false && listData.length === 0" class="flex-center">
            <el-empty description="暂无文章"></el-empty>
          </div>
        </div> -->
        <!-- 分页 -->
        <div class="content-right-footer flex-center">
          footer
        </div>
      </div>
     </div>
    </div>
</template>

<script>
// import FilterSearch from './components/FilterSearch.vue';

export default {
  data() {
    return {

    };
  },
  components: {

  },
  methods: {

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
@media screen and (max-width: 1100px) {
  .dynamic_font {
    font-size: 60%;
  }
}
.tip {
  justify-content: left;
  display: flex;
  font-weight: bold;
  font-family: Circular, Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: #293a5c;
  position: relative;
  // left: 10px;
}
.container {
  max-width: 80%;
  height: 100%;
  margin: auto;
  // overflow: auto;
  .top {
    display: flex;
    width: 100%;
    min-height: 30px;
    // height: 30%;
    height: 250px;
    position: relative;
    top: -10px;
    margin-bottom: 5px;
    // background-color: pink;
  }
  .content {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    // height: 70%;
    height: calc(100% - 250px);
    padding-bottom: 20px;
    &-left {
      width: 190px;
      min-width: 200px;
      height: 100%;
      overflow-y: auto;
      padding-right: 10px;
      padding-left: 10px;
      margin-right: 20px;
      box-sizing: border-box;
      color: #333;
      font-family: DengXian, Helvetica Neue, Helvetica, Nimbus Sans L, Arial, Liberation Sans, Hiragino Sans GB,
        Source Han Sans CN, Source Han Sans SC, Microsoft YaHei, '\5FAE\8F6F\96C5\9ED1', Wenquanyi Micro Hei,
        WenQuanYi Zen Hei, ST Heiti, SimHei, WenQuanYi Zen Hei Sharp, sans-serif;
      letter-spacing: 0.55px;
      border-right: 1px #ddd solid;

      & ::v-deep .el-radio-button {
        width: 50%;
        & .el-radio-button__inner {
          width: 100%;
          border-radius: 0;
        }
      }
    }
    &-right {
      flex: 1;
      width: calc(100% - 200px);
      min-width: 650px;
      height: 100%;
      &-content {
        padding-right: 20px;
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;
        .sort-item {
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
      &-footer {
        height: 50px;
        border-top: 1px #ddd solid;
        // background-color: pink;
      }
    }
  }
}

.disable {
  pointer-events: none;
  cursor: default !important;
  opacity: 0.4;
}
.signup-drawer {
  ::v-deep.el-drawer__body {
    overflow: hidden;
  }
}

::v-deep .el-button--mini {
  padding: 6px 5px !important;
  width: 2px !important;
}
</style>
