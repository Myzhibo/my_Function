<template>  
  <div style="width: 300px; height: 300px; background-color: #999">
      {{json}}
      <el-button @click="handleClick">按钮</el-button>
  </div>
</template>  
  
<script>  
import Child from './Child';

export default {  
  name: 'Father',
  props: {
    json: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
    };
  },
  mounted () {},
  methods: {
    handleClick() {
      // this.json = {};                    // 直接赋值（不行）： Avoid mutating a prop directly
      this.json.a1 = 2;                     // 赋值修改对象属性 (可以)
      this.$set(this.json, 'a3', 111);      // 使用 $set （可以）

      console.log(this.json);
    }
  }
};
</script>