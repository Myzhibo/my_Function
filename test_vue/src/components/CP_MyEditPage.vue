<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
  export default {
    data(){
      return {
        data: {}
      }
    },
    mounted(){
      console.log(this.$route.params);
      this.data = this.$route.params
    }
  }
</script>

<style lang="scss" scoped>

</style>