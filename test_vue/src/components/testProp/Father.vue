<template>  
  <div style="width: 500px; height: 500px; background-color: pink; display: flex; justify-content: center; align-items: center">
    {{json}}
     <Child 
      :json="json"
     />
  </div>
</template>  
  
<script>  
import Child from './Child';

export default {  
  name: 'Father',
  components: {
    Child
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
  mounted () {},
  methods: {
  }
};
</script>