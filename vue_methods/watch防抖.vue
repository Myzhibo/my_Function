<template>
  <div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {};
  },
  computed: {},
  watch: {
    questionsFilter (val) {
      // watch 防抖
      console.log(1);               // 即使执行100次
      this.interObserver();
    },
  },
  methods: {
    // 监听视口
    interObserver: _.debounce(function () {
      this.search1();
    }, 500),
    search1 () {
      console.log(123123);         // 这里也只执行 防抖500ms内 一次
    }
  },
};
</script>

<style lang="scss" scoped></style>
