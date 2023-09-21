<template>
  <div class="hello">
    <TestSass/>
    <hr>
    <!-- FUNCTION: fixed组件 -->
    fixed组件
    <CP_MyTextBasket style="z-index: 999"/>
    <hr>
    <!-- FUNCTION: table组件 + 假分页 -->
    table组件 + 假分页  <el-button size="mini" @click="other_table=!other_table">{{other_table ? '切换为全列表格': '切换为表格2'}}</el-button>
    <CP_table_fakePaging v-if="!other_table" :ListData="ListData" />
    <CP_table v-if="other_table" />
    <hr>
    <!-- FUNCTION: 弹窗 -->
    弹窗组件
    <el-button  size="mini" type="primary"  @click="isShows=true">打开弹窗</el-button>
    <CP_MyDialog :isShows="isShows" title="添加机器" @getShow="getShow">
        <!-- 向子组件的插槽中插入 -->
        <div slot="option">
          <div style="display: flex ;align-items: center; justify-content: center;">
              <CP_MyForm @getShow="getShow"/>
          </div>
        </div>
    </CP_MyDialog>
    <hr>
    <!-- FUNCTION: 卡片组 -->
    卡片组件
    <span
      style="
        position: relative;
        left: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      "
    >
      <el-button v-if="mutiSelected.length === 0" size="mini" type="danger" @click="allDelete"
        >批量删除</el-button
      >
      <el-button v-else @click="handleAllDelete" size="mini" type="danger">确认删除</el-button>
    </span>
    <div v-if="card_listData.length>0">
      <div v-for="(text, index) of card_listData" :key="'lib' + index">

        <!-- 
          :mode="displayMode"
              :abstractHidden="abstractHidden"
              :keyword="conditions.search"
              :multiDelete="multiDelete"
              :cancelSelected="cancelSelected"
              :changePage="changePage"
              @getId="getId"
              @handle-delete="handleDelete(text._id)"
              :key="'lib' + index"
              :unfit="text.unfit"
              :deleteHidden="text._id === cardId ? deleteHidden : true"
              :serial_num="serial_num + index + 1"
        
        -->
          <CP_MyCard
              :data="text"
              @getHidden="getHidden"
            >
            {{ text }}
              <!-- 向子组件TextCard的插槽中插入 -->
              <div slot="option"  style="margin-top:2px">
                <!-- 为父组件放置一个插槽 -->
                <slot name="button_option" :text="text"></slot>
              </div>
          </CP_MyCard>
      </div>
    </div>
    <div v-if="card_listData.length === 0" class="flex-center">
      <el-empty description="暂无数据"></el-empty>
    </div>
    <hr>
    <!-- FUNCTION: 下载 -->
    下载<br>
    <img style="width: 100px;height:100px" src="https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100" alt="">
    <el-button @click="download" size="mini" type="primary" >下载</el-button>
  </div>
</template>

<script>
import TestSass from './TestSass.vue'
import CP_MyTextBasket from './CP_MyTextBasket.vue';
import CP_table_fakePaging from './CP_table_fakePaging.vue';
import CP_table from './CP_table.vue';
import CP_MyDialog from './CP_MyDialog.vue'
import CP_MyForm from './CP_MyForm.vue'
import CP_MyCard from './CP_MyCard.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    TestSass,
    CP_MyTextBasket,
    CP_table_fakePaging,
    CP_table,
    CP_MyDialog,
    CP_MyForm,
    CP_MyCard
  },
  data(){
    return{
      /************** FUNCTION: table组件假分页 - 相关 **************/
      ListData:[
    {
        "uid": "i-uf6escxsuu828ael9x35",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2024-09-19 14:49 ",
        "ip": "192.168.8.224",
        "id": 1,
        "test_renderHeader": '11111111111111111111111111111111111111111111'
    },
    {
        "uid": "i-uf6escxsuu828ael9x32",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:23 ",
        "ip": "192.168.8.221",
        "id": 2,
        "test_renderHeader": '22222222222222222222'
    },
    {
        "uid": "i-uf6escxsuu828ael9x36",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:34 ",
        "ip": "192.168.8.223",
        "id": 3,
        "test_renderHeader": '333333333333333'
    },
    {
        "uid": "i-uf6escxsuu828ael9x31",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:33 ",
        "ip": "192.168.8.225",
        "id": 4,
        "test_renderHeader": '4444444444'
    },
    {
        "uid": "i-uf6escxsuu828ael9x2z",
        "name": "ali-CONTENT_SERVER_NODE",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:33 ",
        "ip": "192.168.8.226",
        "id": 5,
        "test_renderHeader": '55'
    },
    {
        "uid": "i-uf6escxsuu828ael9x33",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:56 ",
        "ip": "192.168.8.217",
        "id": 6
    },
    {
        "uid": "i-uf6escxsuu828ael9x37",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:21 ",
        "ip": "192.168.8.219",
        "id": 7
    },
    {
        "uid": "i-uf6escxsuu828ael9x2y",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:22 ",
        "ip": "192.168.8.218",
        "id": 8
    },
    {
        "uid": "i-uf6escxsuu828ael9x34",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:32 ",
        "ip": "192.168.8.220",
        "id": 9
    },
    {
        "uid": "i-uf6escxsuu828ael9x30",
        "name": "ali-PPT_AUTO_VBA_J2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 16:34 ",
        "ip": "192.168.8.222",
        "id": 10
    },
    {
        "uid": "i-uf6i392ncxf4jfpsrysi",
        "name": "ali-PPT_AUTO_VBA_W2PPT",
        "cpu_mem": "cpu: 2  |  mem: 4096",
        "instance_type": "ecs.c7.large",
        "auto_release_time": "2023-09-19 18:22 ",
        "ip": "192.168.8.216",
        "id": 11
    },
      ],
      other_table: false,
      /************** FUNCTION: 弹窗 - 相关 **************/
      isShows: false,
      /************** FUNCTION: 卡片 - 相关 **************/
      card_listData:[
          {
              "_id": "64e2e6df73bfa9f92410ab27",
              "title_en": "'Crawling to my seat': Some travel experiences can be avoided with better technology",
              "title_ch": "爬行到我的座位",
              "summary_en": "Smartphones and technology have alleviated some of the stress of transportation for disabled travelers. Google and Microsoft are among the top apps.",
              "summary_ch": "智能手机和技术为残疾旅行者减轻了一些交通压力。谷歌和微软是最受欢迎的应用程序。",
              "url": "http://rssfeeds.usatoday.com/~/687252790/0/usatodaycomtravel-topstories~Crawling-to-my-seat-Some-travel-experiences-can-be-avoided-with-better-technology/",
              "article_type": "说明文",
              "receive_time": "2022-03-23",
              "published": "2022-03-23 00:00:00",
              "summary_en_md5": "932fa2655ca9479d61e444445cd8fb71",
              "available": true,
              "create_at": "2023-08-21 12:23:59",
              "customer_id": 2,
              "source_id": "64e2e6df73bfa9f92410ab26",
              "article_source": "USATODAY - Travel Top Stories",
              "tags": [
                  "科技工程",
                  "其他"
              ]
          },
          {
              "_id": "64e2e6df73bfa9f92410ab20",
              "title_en": "RBI Guv Das launches advanced supervisory monitoring system DAKSH",
              "title_ch": "印度央行行长达斯推出先进的监督监控系统DAKSH",
              "summary_en": "Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, the Reserve Bank of India (RBI) said it has been taking various initiatives in strengthening supervision, which among other initiatives include adoption of latest data and an",
              "summary_ch": "印度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和",
              "url": "https://www.business-standard.com/article/finance/rbi-guv-das-launches-advanced-supervisory-monitoring-system-daksh-122100601120_1.html",
              "article_type": "说明文",
              "receive_time": "2022-10-07",
              "published": "2022-10-07 00:00:00",
              "summary_en_md5": "925347a03b2ab9b091d9ac7eb7fb4282",
              "available": true,
              "create_at": "2023-08-21 12:23:59",
              "customer_id": 2,
              "source_id": "64e2e6df73bfa9f92410ab1f",
              "article_source": "Finance",
              "tags": [
                  "金融理财"
              ]
          }
      ],
      // 卡片序号
      serial_num: 0 ,
      // 删除卡片相关
      deleteHidden: true,
      cardId:'',
      // 批量删除卡片相关
      multiDelete: false,
      mutiSelected: [],
      cancelSelected: false,
      changePage: 0,
    }
  },
  mounted(){
    this.initCardId()
  },
  methods:{
    /************** FUNCTION: 弹窗 - 相关 **************/
    // 获取关闭弹窗变量
    getShow(val){
      this.isShows = val
    },
    /************** FUNCTION: 卡片 - 相关 **************/
    // 卡片初始化动态标记序号
    initCardId(){
        this.serial_num = 0;
        // for (const [index, item] of this.catalog.entries()) {
        //   if (data.node_name === item.node_name) {
        //     // console.log(item.text_count, index);
        //     if (index > 0) {
        //       for (let i = 0; i < index; i++) {
        //         this.serial_num = this.serial_num + this.catalog[i].text_count;
        //       }
        //     } else { this.serial_num = 0; }
        //   } else {
        //     for (const [ind, child] of item.children.entries()) {
        //       if (data.node_name === child.node_name) {
        //         for (let i = 0; i < ind; i++) {
        //           this.serial_num = this.serial_num + item.children[i].text_count;
        //         }
        //       }
        //     }
        //   }
        // }
    },
    getHidden(val){
      console.log(val);
    },




    
    /************** FUNCTION: 下载 - 相关 **************/
    // 下载
    async realDownload(path,name){
      var image = new Image()
    // 解决跨域 Canvas 污染问题
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function() {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')
        a.download = name
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event)
    }
    image.src = path;
    this.$Message.success('下载成功');
    },
    // 下载图片
    download(){
        this.realDownload('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', '我的图片' +'.jpg')
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
