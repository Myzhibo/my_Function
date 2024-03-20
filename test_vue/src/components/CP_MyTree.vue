<template>
  <div class="node-item-box">
    <div class="node-item" v-for="item of treeData" :key="item.id || item.node_id">
      <div v-show="!item.isHidden" :key="refresh" @contextmenu.prevent="showContextMenu($event, item, showMenu)">
        <!-- 自身内容 -->
        <div :class="['sp-self-box']" @click="selfItemOnClicked(item)">
          <div :class="['sp-title']">
            <!-- 这个display: flex;使得目录集体靠左 -->
            <span
              style="display: flex; align-items: center"
              :title="item.tag || item.node_name"
              :class="[
                {
                  'on-currTag': currTag && (currTag.node_id === item.node_id || (currTag.id && currTag.id === item.id))
                }
              ]"
            >
              <!-- 子目录 展开/隐藏 图标
                :class="item.expand ? 'el-icon-remove blue' : 'el-icon-circle-plus gray'"
                :class="item.expand ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
               -->
              <i
                v-if="item.children && item.children.length  && item.children.some(i=>{ return i.node_type === 'chapter'})"
                class="node-item-icon"
                @click.stop="$set(item, 'expand', !item.expand)"
                :class="item.expand ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
              />
              <span>{{ item.tag || item.node_name }}</span>
              <!-- 目录条数 -->
              <!-- readingset的目录 -->
              <span v-if="item.text_count && item.text_count !== undefined"
                >&nbsp;{{ !item.text_count || item.text_count <= 0 ? '' : '(' + (item.text_count || '') + ')' }}
              </span>
              <span
                style="
                  border-radius: 4px;
                  color: #fff;
                  font-size: 12px;
                  padding: 0 6px;
                  text-align: center;
                  white-space: nowrap;
                  border: 1px solid #fff;
                  margin-left: 2px;
                  height: 18px;
                  display: flex;
                  align-items: center;
                "
              />
            </span>
          </div>
          <slot name="node-info" :node="item" />
        </div>
        <!-- 子项内容 -->
        <div class="animated fadeIn" v-if="item.children && item.children.length" v-show="item.expand">
          <TagsTree v-bind="$props" :data="[...item.children]" :currTag="currTag" @onCurrChange="onCurrChange" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagsTree',
  data() {
    return {
      refresh: 0,
      contextMenu: {
        show: false,
        x: 0,
        y: 0,
        item: null,
      },
      treeItem: [], // 被点击的tree_item
      treeName: '', // 被点击的tree_name

    };
  },
  props: {
    data: {
      default() {
        return null;
      },
    },
    // total: {
    //   default() {
    //     return null;
    //   },
    // },
    // filterName: {
    //   default() {
    //     return null;
    //   },
    // },
    currTag: {
      type: Object,
      default() {
        return null;
      },
    },
    // searchInput: {
    //   type: String,
    //   default() {
    //     return null;
    //   },
    // },
    showMenu: {
      type: Boolean,
      default() {
        return false;
      },
    },
    contextMenuItems: {
      type: Function,
      default() {
        return () => [];
      },
    },
    expanding: {        // 是否默认展开
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  mounted() {
    // console.log(this.treeData);
  },
  computed: {
    treeData() {
      if (this.data) {
        // for (const item of this.data) {
        //   item.isHidden = false;
        // }
        for(let item of this.data){
          this.$set(item, 'expand', this.expanding)
        }
        return this.data;
      }
    },
  },
  methods: {
    // 点击目录
    async selfItemOnClicked(item) {
      this.treeName = item.name;
      this.treeItem = item;
      await this.$emit('onCurrChange', item);
      setTimeout(() => {
        item.article_count = this.total;
      }, 1500);
    },
    // refreshClick() {
    //   this.selfItemOnClicked(this.treeItem);
    // },
    onCurrChange(item) {
      this.$emit('onCurrChange', item);
    },
    // // html转为text
    // html2text(html) {
    //   const el = document.createElement('div');
    //   el.innerHTML = html;
    //   const text = el.innerText;
    //   return text;
    // },
    //显示右键菜单
    showContextMenu(event, item, showMenu) {
      console.log(event, item, showMenu);
      event.stopPropagation();
      if (showMenu) {
        this.$contextmenu({
          items: this.contextMenuItems(item),
          event, // 鼠标事件信息
          customClass: 'custom-class', // 自定义菜单 class
          zIndex: 99999, // 菜单样式 z-index
          minWidth: 230, // 主菜单最小宽度
        });
      }
      return false;
    },
  },
  watch: {
    // 在标签树中搜索
    // searchInput(inputValue, oldValue) {
    //   if (inputValue) {
    //     for (const item of this.treeData) {
    //       // 最外层不包含，隐藏
    //       if ((item.tag || item.node_name).indexOf(inputValue) === -1) {
    //         item.isHidden = true;
    //         for (const c of item.children) {
    //           if (c.tag.indexOf(inputValue) === -1) {
    //             // children里不包含，隐藏children
    //             c.isHidden = true;
    //           } else {
    //             // children里包含，展示children和最外层
    //             item.isHidden = false;
    //             c.isHidden = false;
    //           }
    //         }
    //       }
    //     }
    //   } else {
    //     for (const item of this.treeData) {
    //       if (item.isHidden) {
    //         item.isHidden = false;
    //       }
    //     }
    //   }

    //   this.refresh = this.refresh + 1;
    //   console.log(this.treeData);
    // },

    total(newValue, oldValue) {
      // console.log(this.currTag.name, '-', this.treeName, '-', this.treeItem.name);
      if (this.currTag?.name === this.treeItem?.name) {
        this.treeItem.article_count = newValue;
      }
      this.treeName = '';
    },
  },
};
</script>

<style scoped lang="scss">
.node-item-box {
  $c: #7eb3fd;
  cursor: pointer;
  font-size: 14px;
  line-height: 0;
  padding-left: 15px;
  padding-bottom: -5px;
  border-left: 1px dashed #ddd;

  .sp-input-like-span {
    font-weight: bold;
    cursor: default;
    appearance: none;
    display: inline-block;
    width: 100%;
    background-color: transparent;
    height: 70px;
    outline: none;
    border: none;
    border-bottom: 1px solid transparent;
    padding-left: 0;
    &:focus:hover {
      border-color: #aaa;
    }
    background-color: blanchedalmond;
  }

  .node-item {
    position: relative;
    &-icon {
      position: absolute;
      font-size: 16px;
      left: -15px;
      top: 4px;
    }

    .sp-self-box {
      padding: 2px;
      border-bottom: 2px solid transparent;

      &:hover {
        color: $c;
        .sp-btn-box {
          display: block;
        }
      }

      .sp-btn-box {
        display: none;
        padding: 0 2px;
        float: right;

        span {
          &:hover {
            color: #007acc;
          }
          &.hover-green {
            &:hover {
              color: #195;
            }
          }
          &.hover-red {
            &:hover {
              color: #c20;
            }
          }
        }
      }

      .sp-title {
        line-height: 20px;
        margin-bottom: 4px;

        // overflow: hidden;
        // text-overflow: ellipsis;
        white-space: nowrap;

        &.t-gray {
          color: #666;
        }
      }
    }

    .sp-picker-target-hock {
      margin-top: 5px;
      margin-bottom: 5px;
      display: flex;

      &:hover {
        background-color: #ddd;
      }

      .sp-btn-follow,
      .sp-btn-insert {
        flex: 1;
        height: 7px;
        &:hover {
          background-color: #3fb8fd;
        }
      }
    }
  }
}

.on-currTag {
  color: #409eff;
  border-bottom: 2px #1a5 solid;
}

.blue {
  color: #409eff;
}

.gray {
  color: #909399;
}
</style>
