<template>
  <div ref="myChoice">
    <div v-for="(item, index) in data.content.choices" :key="index" class="option">
      <img src="item" alt="">
    </div>
  </div>
</template>

<script>
mounted() {
  this.$nextTick(() => {
    // 创建 ResizeObserver 实例 ： 【 只要监听的size变化了就会触发  ----  即 每张图片加载出来都会触发一次。】
    const resizeObserver = new ResizeObserver(() => {
      const nodeElement = this.$refs.myChoice?.$el;
      if (!nodeElement) return;
      // 计算图片的个数
      let imgCount = 0;
      for (let item of Array.from(this.data.content.choices)) {
        item.option.replace(/<img /g, () => {
          imgCount++;
        });
      }
      // 图片全部加载完毕再执行 loadedFinish
      if (nodeElement.querySelectorAll('img').length === imgCount) this.loadedFinish();
    });

    // 开启监听
    if (this.$refs.myChoice && this.$refs.myChoice.$el) {
      resizeObserver.observe(this.$refs.myChoice.$el);
    }
  });
},
methods: {
  loadedFinish() {
    console.log(123);
  }
}
</script>