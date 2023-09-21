<template>
  <div ref="CP_MyTextBasket" @mousedown="dragMe">
    。。。
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Getter, Action } from 'vuex-class';
import TextCard from './TextCard.vue';

@Component({ components: { TextCard } })
export default class CP_MyTextBasket extends Vue {

  dragMe(event) {
    console.log(event);
    const box = this.$refs.CP_MyTextBasket;
    console.log(box);

    event = event || window.event; // 解决浏览器兼容问题

    // div的左偏移量=鼠标.clientX-元素.ofsetLeft
    const boxLeft = event.clientX - box.offsetLeft;

    // div的上偏移量=鼠标.clientY-元素.ofsetTop
    const boxTop = event.clientY - box.offsetTop;

    document.onmousemove = function(event) {
      event = event || window.event; // 解决浏览器兼容问题

      // 获取鼠标的坐标
      let left = event.clientX - boxLeft;
      let top = event.clientY - boxTop;

      // 盒子移动的最大偏移量=浏览器宽度-盒子宽度
      const moveLeft = document.documentElement.clientWidth - box.offsetWidth;
      // let moveLeft = 0           // 水平方向上锁住不动
      const moveTop = document.documentElement.clientHeight - box.offsetHeight;
      // let moveTop = 0            // 垂直方向上锁住不动

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
