<template>
  <div class="myForm">
      <span style="margin-right: 20px;font-size: 15px;">类型</span>  
      <el-select style="width: 250px;" v-model="dynamicExpansion.type" placeholder="请选择">
        <el-option key="PPT_AUTO_VBA_J2PPT" label="PPT_AUTO_VBA_J2PPT" value="PPT_AUTO_VBA_J2PPT"></el-option>
        <el-option key="PPT_AUTO_VBA_W2PPT" label="PPT_AUTO_VBA_W2PPT" value="PPT_AUTO_VBA_W2PPT"></el-option>
        <el-option key="CONTENT_SERVER_NODE" label="CONTENT_SERVER_NODE" value="CONTENT_SERVER_NODE"></el-option>
      </el-select>
      <br><br>
      <span style="margin-right: 20px;font-size: 15px;">数量</span>  
      <el-select style="width: 250px;" v-model="dynamicExpansion.num" placeholder="请选择">
        <el-option v-for="(item,index) in 50"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
        </el-option>
      </el-select>
      <br><br>
      <span style="margin-right: 20px;font-size: 15px;">时间</span>  
        <el-input-number v-model="dynamicExpansion.time" style="width:250px;" @change="handleChange" :min="1" :max="3" label="描述文字"></el-input-number>
        <span style="font-size: 13px; color:gray; position: relative; left: 10px; top:5px">小时</span>
      <br><br><br>
      <el-button @click="startExpand" size="mini" style="width:295px;margin-left: 5px;" type="primary" >开始扩容</el-button>
      <br><br>
      <!-- <img v-if="fileList[0].url" :src="fileList[0].url" style="width: 100px;height: 100px;" >
      <i v-if="fileList[0].url" style="font-size: 16px;margin-left: 10px;cursor: pointer;" class="el-icon-delete" 
              @click="deleteImg"></i>
      <div v-if="fileList.length ===0 " style="margin-top: 10px;" >无封面</div>
      <el-upload
        
      multiple 
      class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
      <br><br> -->
  </div>
</template>

<script>
  export default {
    data(){
      return {
        // 表单相关
        dynamicExpansion:{
          type:'PPT_AUTO_VBA_J2PPT',
          time: '1',
          num: '1'
        },
        // 上传相关
        fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      
      }
    },
    methods:{
        // 计数器
        handleChange(val){
          console.log(val);
        },
        // 提交按钮
        startExpand(){
          this.$emit('getShow',false)
          console.log(this.dynamicExpansion);
          // 初始化数据
          this.dynamicExpansion = {
            type:'PPT_AUTO_VBA_J2PPT',
            time: '1',
            num: '1'
          }
        },
        /** upload相关 */
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          console.log(fileList);
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
  }
</script>

<style lang="scss" scoped>

</style>