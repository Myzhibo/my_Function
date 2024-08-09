<template>
  <div @click="handleClick(item)">
  </div>
</template>

<script>
  data() {
    return {
      debouncedFunc: null
    };
  },
  mounted() {
    // 0. 声明一个防抖函数
    this.debouncedFunc = this.debounceFunc(this.triggerClick, 500).bind(this);
  },
  methods: {
    // 防抖函数
    debounceFunc(func, wait){
      let timeout;
      return function(...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
          func.apply(this, args);
        }, wait);
      };
    },

    // 1. 点击div 触发防抖函数
    handleClick() {
      this.debouncedFunc();
    },
    // 2. 读秒过后触发被保护的函数
    triggerClick(){
      this.selfItemOnClicked();
    },
    // 3. 
    selfItemOnClicked() {
      console.log('触发 目录节点 点击事件');
    },
  }
</script>

