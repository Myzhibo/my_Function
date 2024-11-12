<template>
  <div style="width: 300px; height: 200px; background-color: wheat">
    <el-button @click="handleClick">b1 + 1</el-button>
    <br><br>
    {{ json }}
  </div>
</template>

<script>
export default {
  name: 'Child2Son',
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
      // 4. 深拷贝后修改并触发事件（推荐）
      const jj = JSON.parse(JSON.stringify(this.json));
      jj.a2.b1 += 1;
      this.$emit('changeJson', jj);
    },
  }
};
</script>