<!--
  条件: 将该组件放置在由一个大div(box)包裹的两个div(left、right)中间，
        传入prop:
          1. box      外层div 的 className
          2. left     左边div 的 className
          3. right    右边div 的 className
          4. leftMin  左边div 的 min-width
          5. rightMin 右边div 的 min-width
-->
<template>
  <div class="resize" title="收缩侧边栏">⋮</div>
</template>

<script>
export default {
  name: 'XHandle',
  // props: ['box', 'left',  'right', 'leftMin', 'rightMin'],
  props: {
    // 父元素的class
    box: { type: String },
    // 左边div的class
    left: { type: String },
    // 右边div的class
    right: { type: String },
    // 左边div 的 min-width
    leftMin: { type: Number },
    // 右边div 的 min-width
    rightMin: { type: Number },
  },
  data() {
    return {};
  },
  mounted() {
    this.dragControllerDiv();

    // 监听视口变化，变了的话重新跑函数，【因为 left_screen 会变】
    window.onresize = () => {
      return (() => {
        this.$nextTick(() => {
          console.log(window.innerWidth);
          this.dragControllerDiv();
        });
      })();
    };
    /*
     * console.log(this.box);
     * console.log(this.left);
     * console.log(this.right);
     * console.log(this.leftMin);
     * console.log(this.rightMin);
     */
  },
  methods: {
    dragControllerDiv() {
      const resize = document.getElementsByClassName('resize');
      const left = document.getElementsByClassName(String(this.left));
      const right = document.getElementsByClassName(String(this.right));
      const box = document.getElementsByClassName(String(this.box));
      // 左边的div距离屏幕的距离
      const left_screen = document.querySelector(`.${String(this.left)}`).getBoundingClientRect().left;
      //
      const leftMin = this.leftMin;
      const rightMin = this.rightMin;
      const that = this;

      for (let i = 0; i < resize.length; i++) {
        // 鼠标按下事件
        resize[i].onmousedown = function(e) {
          // 颜色改变
          resize[i].style.background = '#818181';
          // console.log(e.clientX);
          const startX = e.clientX;
          resize[i].left = resize[i].offsetLeft;

          // 鼠标拖动事件
          document.onmousemove = function(e) {
            // console.log(e.clientX);
            const endX = e.clientX;
            /*
             *  (endx-startx)=移动的距离。resize[i].left+移动的距离=左边区域最后的宽度
             *  todo: 留意【leftMin】的值，或许可能会随者父组件设置的left得min-width不同而受到影响
             */
            let moveLen = resize[i].left + (endX - startX) - left_screen;
            // console.log(resize[i].left, '+', endX, '-', startX, '-', left_screen, '=', moveLen);
            // 容器宽度 - 左边区域的宽度 = 右边区域的宽度
            const maxT = box[i].clientWidth - resize[i].offsetWidth;
            // 左边区域的最小宽度
            if (moveLen < leftMin) moveLen = leftMin;
            // 右边区域的最小宽度
            if (moveLen > maxT - rightMin) moveLen = maxT - rightMin;
            // 设置左侧区域的宽度
            resize[i].style.left = moveLen;

            for (let j = 0; j < left.length; j++) {
              left[j].style.width = moveLen + 'px';
              right[j].style.width = box[i].clientWidth - moveLen - 10 + 'px';
            }
          };
          // 鼠标松开事件
          document.onmouseup = function(evt) {
            // 颜色恢复
            resize[i].style.background = '#d6d6d6';
            document.onmousemove = null;
            document.onmouseup = null;
            resize[i].releaseCapture && resize[i].releaseCapture(); // 当你不在需要继续获得鼠标消息就要应该调用ReleaseCapture()释放掉
            that.$emit('finishMove');
          };
          resize[i].setCapture && resize[i].setCapture(); // 该函数在属于当前线程的指定窗口里设置鼠标捕获
          return false;
        };
      }
    },
  },
};
</script>

<style>
/* 拖拽相关样式 */
/*包围div样式
.box {
  width: 100%;
  height: 100%;
  margin: 1% 0px;
  overflow: hidden;
  box-shadow: -1px 9px 10px 3px rgba(0, 0, 0, 0.11);
}*/
/*左侧div样式*/
/* .left {
  //左侧初始化宽度
  width: calc(32% - 10px);
  height: 100%;
  background: pink;
  float: left;
} */
/*右侧div'样式*/
/* .right {
  float: left;
  //右侧初始化宽度
  width: 68%;
  height: 100%;
  background: #fff;
  box-shadow: -1px 4px 5px 3px rgba(0, 0, 0, 0.11);
} */
/*拖拽区div样式*/
.resize {
  cursor: col-resize;
  float: left;
  position: relative;
  top: 45%;
  background-color: #d6d6d6;
  border-radius: 5px;
  margin-top: -10px;
  width: 10px;
  height: 50px;
  background-size: cover;
  background-position: center;
  /*z-index: 99999;*/
  font-size: 32px;
  color: white;
}
/*拖拽区鼠标悬停样式*/
.resize:hover {
  color: #444444;
}
</style>
