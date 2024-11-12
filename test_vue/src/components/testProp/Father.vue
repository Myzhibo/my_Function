<template>
  <div style="width: 80%; height: 500px; background-color: pink; ">
    <div>{{ json }}</div>
    <button @click="handleClick">a1 + 1</button>

    <div style="display: flex; justify-content: space-between;">
      <Child :json="json" @changeJson="changeJson" />
      <Child2 :json="json" @changeJson="changeJson" />
    </div>
  </div>
</template>

<script>
import Child from './Child';
import Child2 from './Child2';

export default {
  name: 'Father',
  components: {
    Child, Child2
  },
  data () {
    return {
      json: {
        a1: 1,
        a2: {
          b1: 11,
          b2: 12
        }
      }
    };
  },
  mounted () { },
  methods: {
    handleClick () {
      this.json.a1++;
    },
    changeJson (updatedJson) {
      this.json = updatedJson;
    }
  }
};
</script>