<template>
  <div style="width: 400px; height: 400px; background-color: powderblue">
    <el-button @click="handleClick">a2加新字段</el-button>
    <br><br>
    {{ json }}
    <br><br> <br><br>
    <Child2Son :json="json" @changeJson="changeJson" />
  </div>
</template>

<script>
import Child2Son from './Child2Son';

export default {
  name: 'Child2',
  components: {
    Child2Son
  },
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
      jj.a1 = 2;
      jj.a2.b3 = 2;
      this.$emit('changeJson', jj);
    },

    changeJson (val) {
      this.$emit('changeJson', val);
    }
  }
};
</script>