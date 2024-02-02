<template>
  <div class="file-item" style="display: flex;align-items: center;justify-content: space-between;">
    <span>{{ data.file.name }}</span>
    <i class="el-icon-delete" style="font-size:18px; cursor: pointer;" @click="clickHandler(data)"></i>
    <div v-if="data.process"
      :style="{width: data.process}"
      class="file-process" style="background-color: #28a745 !important"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  name: 'UploadFileItem',
  watch:{
    data:{
      handler(val){
        this.$emit('getFileName', val.file.name)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    clickHandler (data) {
      this.$emit('click', data)
    }
  }
}
</script>

<style lang="scss" scoped>
  $inputW: 600px;
  .file {
    &-process {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      transition: width .2s linear;
      opacity: .3;
      z-index: -1;
    }
    &-item {
       position: relative;
       max-width: $inputW;
       padding: 15px;
       border: 1px solid #cdd4d9;
       border-radius: 4px;
       margin-bottom: 10px;

       z-index: 1;

    &:last-child {
       margin-bottom: 0;
     }
    }
  }
</style>