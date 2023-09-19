<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <TestSass/>
    <hr>
    <!-- FUNCTION: fixed组件 -->
    fixed组件
    <TextBasket style="z-index: 999"/>
    <hr>
    <!-- FUNCTION: table组件 + 假分页 -->
    table组件 + 假分页
    <CP_table_fakePaging :ListData="ListData" />
    <hr>
    <!-- FUNCTION: 表单弹窗 -->
    表单弹窗组件
    <el-button  size="mini" type="primary"  @click="isShows=true">打开弹窗</el-button>
    <CP_MyForm :isShows="isShows" title="添加机器" @getShow="getShow">
        <!-- 向子组件的插槽中插入 -->
        <div slot="option">
                    <div style="display: flex ;align-items: center; justify-content: center;">
                        <div>
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
                            <el-button  size="mini" style="width:295px;margin-left: 5px;" type="primary" >开始扩容</el-button>
                            <br><br>
                        </div>
                    </div>
                  </div>
    </CP_MyForm>
    
  </div>
</template>

<script>
import TestSass from './TestSass.vue'
import TextBasket from './TextBasket.vue';
import CP_table_fakePaging from './CP_table_fakePaging.vue';
import CP_MyForm from './CP_MyForm.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    TestSass,
    TextBasket,
    CP_table_fakePaging,
    CP_MyForm
  },
  data(){
    return{
      // FUNCTION: table组件假分页 - 相关
      ListData:[
    {
        "uid": "i-uf6escxsuu828ael9x35",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.224",
        "id": 1
    },
    {
        "uid": "i-uf6escxsuu828ael9x32",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.221",
        "id": 2
    },
    {
        "uid": "i-uf6escxsuu828ael9x36",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.223",
        "id": 3
    },
    {
        "uid": "i-uf6escxsuu828ael9x31",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.225",
        "id": 4
    },
    {
        "uid": "i-uf6escxsuu828ael9x2z",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.226",
        "id": 5
    },
    {
        "uid": "i-uf6escxsuu828ael9x33",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.217",
        "id": 6
    },
    {
        "uid": "i-uf6escxsuu828ael9x37",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.219",
        "id": 7
    },
    {
        "uid": "i-uf6escxsuu828ael9x2y",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.218",
        "id": 8
    },
    {
        "uid": "i-uf6escxsuu828ael9x34",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.220",
        "id": 9
    },
    {
        "uid": "i-uf6escxsuu828ael9x30",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:49 ",
        "ip": "192.168.8.222",
        "id": 10
    },
    {
        "uid": "i-uf6i392ncxf4jfpsrysi",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:47 ",
        "ip": "192.168.8.216",
        "id": 11
    },
      ],
      // FUNCTION: 表单弹窗 - 相关
      isShows: false,
      dynamicExpansion:{
        type:'PPT_AUTO_VBA_J2PPT',
        time: '1',
        num: '1'
      },
      expanding:false
    }
  },
  methods:{
    getShow(val){
      this.isShows = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
