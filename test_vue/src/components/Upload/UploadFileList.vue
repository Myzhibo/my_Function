<template>
  <div>
    <div v-if="!list || !list.length" class="text-light">暂无上传文件</div>
    <template v-else>
      <UploadFileListItem v-for="item in list" :key="item.index" :data="item" @click="deleteFile($event)" @getFileName="getFileName"/>
    </template>
  </div>
</template>

<script>
import UploadFileListItem from './UploadFileListItem'
export default {
  name: 'UploadFileList',
  components: { UploadFileListItem },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  methods: {
    deleteFile (data) {
      this.$emit('delete', data)
    },
    getFileName(val){
      this.$emit('getFileName', val)
    }
  }
}
</script>

<style scoped>

</style>