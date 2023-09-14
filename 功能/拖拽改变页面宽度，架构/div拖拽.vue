<template>
  <div class="app1">
    <div v-drag class="qwe" style="width: 1920px; height: 1080px">
      <div class="div1" @click="getData"></div>
      <div class="div2" @click="getData"></div>
      <div class="div3" @click="getData"></div>
      <div class="div4" @click="getData"></div>
      <div class="div5" @click="getData"></div>
      <div class="div6" @click="getData"></div>
    </div>
  </div>
</template>

<script>
export default {
  // 组件名称
  name: 'mapPage',
  data() {
    return {};
  },
  // 自定义指令 实现可拖动 drag(el, bindings)
  directives: {
    drag(el) {
      el.onmousedown = function (e) {
        const disx = e.pageX - el.offsetLeft;
        const disy = e.pageY - el.offsetTop;
        document.onmousemove = function (e) {
          /*
           * el.style.left = e.pageX - disx + 'px'
           * el.style.top = e.pageY - disy + 'px'
           */

          if (e.pageX - disx < 53 && e.pageX - disx > -1100) {
            // if (e.pageY - disy < 40 && -271 < e.pageY - disy) {
            el.style.left = e.pageX - disx + 'px';
            el.style.top = e.pageY - disy + 'px';
            /*
             * console.log('左', el.style.left, el.style.top, '上')
             * }
             */
          }
        };
        document.onmouseup = function () {
          document.onmousemove = document.onmouseup = null;
        };
      };
      // 对div盒子的大小改变
      let scale = 1;
      el.onmousewheel = document.onmousewheel = e => {
        if (e.wheelDelta < 0) {
          // console.log('后滚放大')
          if (scale < 1.2) {
            scale += 0.05;
            el.style.transform = `scale(${scale})`;
            el.style.transformOrigin = '200 200';
            // console.log(scale, '放大')
          }
        } else if (e.wheelDelta > 0) {
          // 前滚缩小
          if (scale > 0.4) {
            scale -= 0.05;
            el.style.transform = `scale(${scale})`;
            el.style.transformOrigin = '200 200';
            // console.log(scale, '缩小')
          }
        }
      };
    }
  },
  // 计算属性
  computed: {},
  // 组件方法
  methods: {
    getData() {
      console.log('可以触发点击事件');
    }
  },
  // 挂载后钩子函数
  mounted() {}
};
</script>

<style scoped lang="scss">
.app1 {
  position: relative;
  .map {
    width: 45%;
    height: 100%;
  }
  .qwe {
    z-index: 1;
    // background: url('../../assets/indexImg/bg.webp') center center no-repeat;
    background-size: 100% 100%;
    // background-color: rgb(185, 76, 13);
    position: absolute;
    top: 0%;
    left: 0%;
    img {
      width: 100%;
      height: 100%;
    }
    .div1 {
      width: 20px;
      height: 30px;
      background-color: red;
      position: absolute;
      top: 48%;
      left: 12%;
    }
    .div2 {
      @extend .div1;
      position: absolute;
      top: 66%;
      left: 12%;
    }
    .div3 {
      @extend .div1;
      position: absolute;
      top: 55%;
      left: 12%;
    }
    .div4 {
      @extend .div1;
      position: absolute;
      top: 71%;
      left: 33%;
    }
    .div5 {
      @extend .div1;
      position: absolute;
      top: 46%;
      left: 66%;
    }
    .div6 {
      @extend .div1;
      position: absolute;
      top: 32%;
      left: 82%;
    }
  }
}
</style>
