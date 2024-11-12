<template>
  <div style="width: 400px; height: 300px; background-color: burlywood">
    <el-button @click="handleClick">修改a1的值</el-button>
    <br><br>
    {{ json }}
  </div>
</template>

<script>
export default {
  name: 'Child',
  props: {
    json: {
      type: Object,
      default: () => { }
    }
  },
  data () {
    return {
    };
  },
  mounted () {
  },
  methods: {
    handleClick () {
      // 1. 直接赋值（不行）： Avoid mutating a prop directly
      // this.json = {};

      // 2. 赋值修改对象属性 (可以, 不推荐) , 但仍然违反了单向数据流的原则。可能会导致父组件的状态变得不可预测。
      // this.json.a1 = 2;

      // 3. 使用 $set （可以, 但通常用于添加新属性）
      // this.$set(this.json, 'a1', 111);
      // this.$set(this.json, 'a3', 111);

      // 4. 深拷贝后修改并触发事件（推荐）
      const jj = JSON.parse(JSON.stringify(this.json));
      jj.a1 = 2;
      this.$emit('changeJson', jj);
    }
  }
};
</script>