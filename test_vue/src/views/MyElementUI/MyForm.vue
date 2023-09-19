<template>
  <div>

      <div style="font-size: 20px; ">动态扩容添加机器</div>
      <br><br>
      
    <el-form :model="myForm">
      <!-- <span style="margin-right: 20px;font-size: 15px;">类型</span>  -->
       
      <el-form-item label="模板封面" class="CreateConfig" >
        <el-select style="width: 250px;" v-model="myForm.type" placeholder="请选择">
          <el-option key="PPT_AUTO_VBA_J2PPT" label="PPT_AUTO_VBA_J2PPT" value="PPT_AUTO_VBA_J2PPT"></el-option>
          <el-option key="PPT_AUTO_VBA_W2PPT" label="PPT_AUTO_VBA_W2PPT" value="PPT_AUTO_VBA_W2PPT"></el-option>
          <el-option key="CONTENT_SERVER_NODE" label="CONTENT_SERVER_NODE" value="CONTENT_SERVER_NODE"></el-option>
        </el-select>
      </el-form-item>
      <br><br>
      <span style="margin-right: 20px;font-size: 15px;">数量</span>  
      <el-form-item label="模板封面" class="CreateConfig" >
        <el-select style="width: 250px;" v-model="myForm.num" placeholder="请选择">
          <el-option v-for="(item,index) in 50"
                      :key="index"
                      :label="item"
                      :value="item"
                      >
          </el-option>
        </el-select>
      </el-form-item>
      <br><br>
      <span style="margin-right: 20px;font-size: 15px;">时间</span>  
        <el-input-number v-model="myForm.time" style="width:250px;" @change="handleChange" :min="1" :max="4" label="描述文字"></el-input-number>
        <span style="font-size: 13px; color:gray; position: relative; left: 10px; top:5px">小时</span>
      <br><br><br>
      <!-- 当两个按钮同时用一个if条件取反时， elementUI的disabled属性不生效。 原因是VUE在这两个按钮切换时用的是同一个虚拟DOM元素。所以给其中一个加个key就可以了 -->
      <el-button key="ex" v-if="!expanding" size="mini" style="width:295px;margin-left: 5px;" type="primary"  @click="expansion">开始扩容</el-button>
      <el-button v-if="expanding"  size="mini" style="width:295px;margin-left: 5px;" type="primary"  disabled><i class="el-icon-loading"></i> 扩容中...</el-button>
      <br><br>

      
        <!-- <el-form-item
          label="样例配置名称"
          class="CreateConfig"
          :required="true"
        >
          <el-input v-model="CreateSampleName" autocomplete="off"></el-input>
        </el-form-item> -->
        
       <!-- v-if="CreateOrEdit==='edit' && thumbnail_url" -->
        <!-- <el-form-item label="模板封面" class="CreateConfig" >
          <br>
          <img :src="thumbnail_url" style="width: 100px;height: 100px; ">
          <Upload v-model="uploading" class="min-400" 
                    :cancel_load="cancel_load" :multiple="false" 
                    @upload="uploadHandler" @ImgURL="getImgURL" @process="getProcess">
          </Upload>
        </el-form-item> -->
      </el-form>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        myForm:{
          type:'PPT_AUTO_VBA_J2PPT',
          time: '1',
          num: '1'
        },
        expanding:false
      };
    },
    components: {},
    methods: {
      handleChange(value) {
        console.log(value);
      },
    // 开始扩容
    async expansion(){
      this.expanding = true
      console.log(this.myForm);
      // await Expansion('/'+this.myForm.type+'/'+this.myForm.time+'/'+this.myForm.num+'/'+'hS6pO6lE2yR5')
      this.expanding = false
      console.log('扩容完毕');
    }
    }
  };
</script>