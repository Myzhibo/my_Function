<template>
  <div class="ppt-upload bg-white" v-loading="loading">
    <div class="m-b-15">
      <slot name="title"></slot>
      <el-button @click="chooseFile()">选择文件</el-button>
      <el-button type="primary" @click="fileUploadOss()">上传</el-button>
    </div>
    <UploadFileList :list="files" @delete="deleteFile($event)"/>
    <input v-if="multiple" ref="file" type="file" multiple="multiple" :value="fileVal" class="file-input" @change="fileChange">
    <input v-else ref="file" type="file" :value="fileVal" class="file-input" @change="fileChange">
  </div>
</template>

<script>
  // import { getSampleOssToken } from '@/api/sample';
  import UploadFileList from './UploadFileList.vue'
  
  export default {
    components: { UploadFileList },
    name: "BookAuditUpload",
    props: {
      type: {
        type: [String, Array],
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
      cancel_load: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        loading: false,
        files: [],
        ossConfig: null,
        uploading: false,
        fileVal: null,
        process: ''
      }
    },
    methods: {
      chooseFile () {
        this.$refs.file.click()
      },
      initForm () {
        this.files = []
        this.fileVal = ''
      },
      fileChange (evt) {
        this.$emit('process', '0%')
        console.log(evt.target.files)
        const files = evt.target.files
        for (let file of files) {
          let { type, multiple } = this
          const suffixIndex = file.name.lastIndexOf('.')
          const suffix = file.name.substr(suffixIndex + 1)
          if (type) {
            const checkType = [type]
            if (!checkType.includes(suffix)) {
              this.$message.error(`上传文件只能是${checkType.join(',')}格式!`)
              return
            }
          }
          const item = {
            file,
            process: 0,
            index: this.files.length
          }
          if (multiple) {
            this.files.push(item)
          } else {
            this.files = [item]
          }
        }
      },
      async fileUploadOss () {
        this.$guard('uploading', async () => {
          const { files } = this
          if (!files || !files.length) {
            this.$message('请先选择文件')
            return
          }
          const needUploadFile = files.filter(item => item.process === 0)
          console.log(needUploadFile, 11)
          let fileStatus = await Promise.all(
            needUploadFile.map(item => {
              return this.uploadImg(item)
            })
          )
          let isSuccess = true
          fileStatus.forEach(item => {
            if (item.status !== 200) {
              isSuccess = false
            }
          })
          if (!isSuccess) {
            this.$message.error('上传失败~')
            return
          }
          // await this.fileUpload(files)
          this.$emit('upload', needUploadFile)
        })
      },
      async uploadImg (item) {
        const { file } = item
        let { ossConfig } = this
        if (!ossConfig)  {
          const { _id } = this.$route.query
          ossConfig = await getSampleOssToken({
            simple_id: _id,
          })
          this.ossConfig = ossConfig
        }
        const { policy, accessid, signature, dir, host } = ossConfig
        const name = file.name
        const url = `${dir}${name}`
        this.$emit('ImgURL', (host+'/'+url));
        return this.$api.postFile(host, {
          key: url,
          policy,
          OSSAccessKeyId: accessid,
          success_action_status: '200',
          signature,
          file
        }, {
          withCredentials: false,
          onUploadProgress: (event) => {
            let process = event.loaded / event.total
            this.process = Math.floor(process * 100) + '%'
            console.log(this.process)
            this.$emit('process', this.process)
            item.process = this.process
          }
        })
      },
      deleteFile ({ index }) {
        this.$emit('process', 'delete_item')
        this.files.splice(index, 1)
      },
    },
    watch: {
      cancel_load(){
        this.initForm()
      }
    }
  }
</script>

<style lang="scss" scoped>
  $inputW: 600px;
  .ppt-upload {
    &-header {
      border-bottom: 1px solid #cdd4d9;
    }
    .remark {
      max-width: $inputW;
    }
  }
</style>
