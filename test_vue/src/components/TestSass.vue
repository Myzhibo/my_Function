<template>
  <div class="export-status">
    <span status="init" class="m-b-100">1111111</span> <br>
    <span status="ing">2222222</span> <br>
    <span status="success">3333333</span> <br>
    <span status="error">4444444</span> <br>
  </div>
</template>

<script>
export default {
  name: 'TestSass',
  props: {
    msg: String
  }
}
</script>

<style lang="scss" scoped>
.export-status {
    font-size: 12px;
    margin-right: 10px;
    text-align: center;
    
    & span {
      display: inline-block;
      width: 70px;
      padding: 1px 0;
    }
    & [status=init] {
    color: #9c8ac9;
    background: #ede9f5;
    }
    & [status=ing] {
      color: #055fe6;
      background: #ddebff;
    }
    & [status=success] {
      color: #198061;
      background: #c3f3cb;
    }
    & [status=error] {
      color: #F56C6C;
      background: #f9e6e6;
    }
}
</style>
