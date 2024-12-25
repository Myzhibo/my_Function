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

    // 直接创建并配置 MutationObserver，同时开始观察目标节点
    const mutationObserver = new MutationObserver((mutationsList, observer) => {
      mutationsList.forEach(mutation => {
        console.log(mutation.target);  // 当前被监听的元素

        // type 属性只有三种： 'childList'、'attributes' 或 'characterData'。
        if (mutation.type === 'childList') {
          console.log(`子节点或目标节点或子孙节点 变动`);  // 当设置了 subtree 属性的话，type类型也是childList，也会在这里变动.  mutation.target会具体报告变动的节点
        } else if (mutation.type === 'attributes') {
          console.log(`属性 ${mutation.attributeName} 已修改`);
        } else if (mutation.type === 'characterData') {
          console.log(`文本内容变化`);
        }
        // 根据需要处理其他类型的变动
      });
    })
    if (this.$refs.myChoice && this.$refs.myChoice.$el) {
      const container = this.$refs.myChoice.$el.querySelector('.choices');
      console.log(container);

      const config = {
        childList: true,  // 监听子节点变动
        attributes: true, // 监听属性变动
        subtree: true,     // 监听目标节点及其所有子孙节点变动

        characterData: true,     // 监听文本内容的变化 (通常用于 <text> 节点或设置了 characterData 为 true 的元素）
        attributeOldValue: true,     // 是否在属性变化时记录变化前的属性值。
        characterDataOldValue: true,     // 是否在文本内容变化时记录变化前的文本内容
      }
      mutationObserver.observe(container, config);
    }

  });
},
methods: {
}
</script>