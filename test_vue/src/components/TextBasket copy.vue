<template>
  <div ref="CP_MyTextBasket" id="CP_MyTextBasket"
        class="text-basket-container m-b-10"
        @mousedown="dragMe"
  >
    <el-badge :value="data.length" :max="99" class="item" :hidden="!data.length">
      <div class="basket-icon-box">
        <div class="flex-center">
          <i
            style="font-size: 30px; color: #409eff"
            :class="data.length ? 'el-icon-shopping-cart-full' : 'el-icon-shopping-cart-2'"
          ></i>
        </div>
        <div class="flex-center">{{ name ? name : '文章篮' }}</div>
      </div>
    </el-badge>
    <el-drawer @open="handleOpened" @close="handleClose" size="30%" :visible.sync="drawerVisible" :modal="false">
      <div class="text-basket-drawer m-l-20 m-r-20">
        <div class="text-basket-drawer-content" style="position: relative">
          <slot name="title"></slot>
          <div class="m-b-10">共计 {{ data.length || 0 }} 篇</div>
          <div v-for="(text, index) of data" :key="'TextCard' + index">
            <TextCard
              :ref="'mycard' + index"
              :data="text"
              :headerHidden="true"
              :footerHidden="true"
              :deleteHidden="false"
              :selectMode="selectMode"
              :key="'TextCard' + index"
              @handle-delete="handleDelete"
              @select="handleSelect"
            />
          </div>
          <div v-if="data.length === 0" style="position: absolute; top: 40%; left: 40%">
            <a style="color: blue" href="javascript:void(null);" @click="$router.push('/fullTextLib')">{{
              myPlaceholder
            }}</a>
          </div>
        </div>
        <div class="text-basket-drawer-footer flex-between">
          <el-button type="danger" icon="el-icon-delete" round @click="handleCleanAll">
            {{ name ? `清空${name}` : '清空文章篮' }}
          </el-button>
          <slot name="option"></slot>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import TextCard from './TextCard.vue';

@Component({ components: { TextCard } })
export default class CP_MyTextBasket extends Vue {
  @Action('setRewriteCP_MyTextBasket') setRewriteCP_MyTextBasket: any;
  @Getter('rewriteCP_MyTextBasket') rewriteCP_MyTextBasket: any;
  @Action('setPropositionCP_MyTextBasket') setPropositionCP_MyTextBasket: any;
  @Getter('propositionCP_MyTextBasket') propositionCP_MyTextBasket: any;
  @Getter('CP_MyTextBasket') CP_MyTextBasket: any;
  @Action('setCP_MyTextBasket') setCP_MyTextBasket: any;
  @Prop({ default: () => [] }) data?: any;
  @Prop() myPlaceholder?: any;
  @Prop() selected?: any;
  @Prop({ default: '' }) name?: string;
  @Prop({ default: false }) selectMode?: boolean; // 选择模式

  drawerVisible = false;

  // 是否正在拖拽
  draging = false

  mounted() {}

  handleClick() {
    console.log(this.draging);

    if (this.draging === false) {
      this.drawerVisible = !this.drawerVisible;
    } else {
      console.log(1);
    }
  }

  handleOpened() {
    if (this.$refs.CP_MyTextBasket) {
      (this.$refs.CP_MyTextBasket as any).style.right = '30%';
    }
    this.$emit('open');
  }

  // 可选模式下，关闭篮子要请空被选
  handleCleanSelected() {
    if (this.selectMode) {
      for (let i = 0; i < this.data.length; i++) {
        eval('this.$refs.mycard' + i)[0].handleCleanCardSelect();
      }
    }
  }

  handleClose() {
    if (this.$refs.CP_MyTextBasket) {
      (this.$refs.CP_MyTextBasket as any).style.right = '0%';
    }
    this.$emit('close');
  }

  handleClose_hideen() {
    if (this.$refs.CP_MyTextBasket) {
      (this.$refs.CP_MyTextBasket as any).style.right = '-20px';
    }
  }

  handleDelete(text: any) {
    if (this.$route.path === '/fullTextLib' || this.$route.path === '/editFullText' || this.$route.path === '/readingsetDetail') {
      const newRewriteCP_MyTextBasket = [...this.rewriteCP_MyTextBasket];
      newRewriteCP_MyTextBasket.splice(
        newRewriteCP_MyTextBasket.findIndex((r) => r._id === text._id),
        1
      );
      this.setRewriteCP_MyTextBasket(newRewriteCP_MyTextBasket);
      (this as any).$localForage.setItem('rewriteCP_MyTextBasket', newRewriteCP_MyTextBasket);
    } else if (this.$route.path === '/rewriteLib' || this.$route.path === '/editRewriteResult') {
      const newPropositionCP_MyTextBasket = [...this.propositionCP_MyTextBasket];
      newPropositionCP_MyTextBasket.splice(
        newPropositionCP_MyTextBasket.findIndex((r) => r._id === text._id),
        1
      );
      this.setPropositionCP_MyTextBasket(newPropositionCP_MyTextBasket);
      (this as any).$localForage.setItem('propositionCP_MyTextBasket', newPropositionCP_MyTextBasket);
    } else if (this.$route.path === '/propositionLib' || this.$route.path === '/editPropositionResult') {
      const newCP_MyTextBasket = [...this.CP_MyTextBasket];
      newCP_MyTextBasket.splice(
        newCP_MyTextBasket.findIndex((r) => r._id === text._id),
        1
      );
      this.setCP_MyTextBasket(newCP_MyTextBasket);
      (this as any).$localForage.setItem('CP_MyTextBasket', newCP_MyTextBasket);
    }
    this.$emit('delete', text);
  }

  handleCleanAll() {
    this.$emit('cleanBasket');
  }

  // 通知父组件触发'select'
  handleSelect(data: any) {
    this.$emit(
      'select',
      this.rewriteCP_MyTextBasket.filter((i: { checked: any }) => Boolean(i.checked))
    );
  }

  // 拖拽
  dragMe(event) {
    const box = this.$refs.CP_MyTextBasket;
    const that = this;

    /** 拖拽div */
    event = event || window.event;
    // div的左偏移量=鼠标.clientX-元素.ofsetLeft
    const boxLeft = event.clientX - box.offsetLeft;
    // div的上偏移量=鼠标.clientY-元素.ofsetTop
    const boxTop = event.clientY - box.offsetTop;
    document.onmousemove = function(event) {
      // 阻止当前点击事件click
      that._data.draging = true;

      event = event || window.event; // 解决浏览器兼容问题
      // 获取鼠标的坐标
      let left = event.clientX - boxLeft;
      let top = event.clientY - boxTop;
      // 盒子移动的最大偏移量=浏览器宽度-盒子宽度
      const moveLeft = 0; // 水平方向上锁住不动
      const moveTop = document.documentElement.clientHeight - box.offsetHeight;

      // 让盒子不超出浏览器范围
      if (left <= 0) {
        left = 0;
      } else if (left > moveLeft) {
        left = moveLeft;
      } else {
        box.style.left = left + 'px';
      }
      if (top <= 0) {
        top = 0;
      } else if (top > moveTop) {
        top = moveTop;
      } else {
        box.style.top = top + 'px';
      }
    };
    // 为document绑定一个鼠标抬起事件，鼠标松开时，将box固定在当前位置
    document.onmouseup = function() {
      // 取消document的onmousemove事件
      document.onmousemove = null;
      // 取消document的onmouseup事件
      document.onmouseup = null;

      console.log(that._data.draging);

      if (that._data.draging === false) {
        that._data.drawerVisible = !that._data.drawerVisible;
      }
      that._data.draging = false;
    };
  }
}
</script>

<style scoped lang="scss">
.text-basket-container {
  position: fixed;
  top: 50%;
  right: 0px;
  .basket-icon-box {
    cursor: pointer;
    border-radius: 10px;
    background-color: aliceblue;
    padding: 20px 0px;
    width: 50px;
    font-size: 12px;
    color: #888;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
}
.text-basket-drawer {
  height: 100%;
  &-content {
    height: calc(100% - 65px);
    overflow-y: auto;
  }
  &-footer {
    line-height: 60px;
    border-top: 1px #ddd solid;
    height: 60px;
    text-align: right;
  }
}
::v-deep .el-badge__content.is-fixed {
  left: -35px;
  right: unset;
}
</style>
