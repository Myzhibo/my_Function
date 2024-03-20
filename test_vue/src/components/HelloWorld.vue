<template>
  <div class="hello">
    <!-- FUNCTION: 测试sass写法 -->
    <TestSass/>
    <hr>
    <!-- FUNCTION: debug模式 -->
    <span>debug模式下才能看见后面: </span> <span v-if="isDebug" style="color: rgba(0, 217, 255, 0.664);">~~在debug模式里~~</span>
    <hr>
    <!-- FUNCTION: loading -->
    <div v-loading="loading" element-loading-text="识别中,hhhhhh">
        <br>
        v-loading
        <br><br><br><br><br>
    </div>
    <hr>
    <!-- FUNCTION: css filter 蒙层 -->
    <div v-if="loading" style="background-color: rgba(255, 155, 255, 0.2);
                  position: absolute;backdrop-filter: blur(6px);z-index: 999;
                  width: 100%;height: 50px;" >
        <span style="color:#3192f3;">使用css filter蒙层 .... </span>
    </div>
    和css filter蒙层的div同级的内容会被覆盖...和css filter蒙层的div同级的内容会被覆盖...和css filter蒙层的div同级的内容会被覆盖...和css filter蒙层的div同级的内容会被覆盖
        <br><br>
    <hr>
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
        <!-- 批量删除按钮 -->
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
    <span
        v-if="mutiSelected.length > 0"
        style="
          position: relative;
          left: 20px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        "
        ><el-button size="mini" style="color: rgb(145, 138, 138)" @click="cancelAllDelete">
          <span>取消</span>
        </el-button></span
      >
        <!-- 卡片组件 -->
    <div v-if="card_listData.length>0">
      <div v-for="(text, index) of card_listData" :key="'lib' + index">
        <!-- 
              :mode="displayMode"
              :abstractHidden="abstractHidden"
              :keyword="conditions.search"
              :changePage="changePage"
              :key="'lib' + index"
              :unfit="text.unfit"
              :serial_num="serial_num + index + 1"
        -->
          <CP_MyCard
              :data="text"

              :footerHidden="false"

              :deleteHidden="text._id === cardId ? deleteHidden : true"
              :cancelSelected="cancelSelected"    
              :multiDelete="multiDelete"
              @getHidden="getHidden"
              @deleteSingleData="deleteSingleData(text._id)"
              @getId="getId"

              :subscribe = "text.subscribe"
              :unfit = "text.unfit"

            >
              {{ text }}

              <!-- 向子组件CP_MyCard的插槽中插入 -->
              <template slot="option">{{ text._id }}</template>     <!-- 插入 -->

              <!-- 插槽: 卡片按钮 -->
              <template #button_option="{ text }">          <!-- 接收、 插入 -->
                <el-button size="mini" type="primary" @click.stop="changeCardColor('subscribe', text)">订阅</el-button>
                <el-button size="mini" type="primary" @click.stop="changeCardColor('unfit', text)">不合适</el-button>
                <el-button size="mini" type="primary"
                  @click.stop="$router.push({ path: `/cp_myeditpage`, name: 'cp_myeditpage', params: text, query: { id: text._id }})"
                >进入编辑</el-button>
                <!-- <el-button v-if="text.inBasket" size="mini" type="danger" @click.stop="removeTextBasket(text)">移出文章篮</el-button>
                <el-button v-else size="mini" type="success" @click.stop="joinTextBasket(text)">加入文章篮</el-button> -->
              </template>
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
    <el-button @click="download2" size="mini" type="primary" >下载2</el-button>
    <hr>
    <!-- FUNCTION: Tree -->
    Tree组件
    <CP_MyTree
        v-if="treeData.length"
        style="margin-top: 5px"
        :data="treeData"
        :currTag="currentNode"
        :show-menu="true"
        :expanding="true"
        :context-menu-items="menuItems"
        @onCurrChange="handleNode"
        @contextMenuClick="contextMenuClick"
    >
    </CP_MyTree>
    <hr>
    <!-- FUNCTION: 筛选 -->
    筛选组件
    <CP_MyFilter
        :data="filterData"
        :total="total"
        cate="文章"
        :largeTitle="false"
        :noLanguage="false"
        :language="language"
        @handleClick="handleFilterClick"
      >
    </CP_MyFilter>
    <hr>
    <!-- FUNCTION: 点击icon 复制内容 -->
    点击icon 复制内容<br><br>
    <i class="el-icon-copy-document" @click="copy('要复制的内容')" style="cursor: pointer;"></i>
    <br><br>
    <!-- FUNCTION: 复制内容到粘贴板 -->
    <el-button @click="copy2()">复制内容到粘贴板 (可以复制带\n的字符串，即带换行的)</el-button>
    <hr>
    <!-- FUNCTION: localForage -->
    localForage<br><br>
    <el-input v-model="testLocalForage" type="text" style="width:250px;"></el-input>
    <el-button @click="setLocal" size="small" type="primary" >存入localForage</el-button>
    <el-button @click="getLocal" size="small" type="primary" >获取localForage(console)</el-button> 
    <br><br>
    <hr>
    <!-- FUNCTION: el-tag的更多颜色  el-tag - 相关 -->  
    el-tag的更多颜色<br><br>
    <div>
      <el-tag class=""> primary </el-tag>
      <el-tag class="" type="success"> success </el-tag>
      <el-tag class="" type="danger"> danger </el-tag>
      <el-tag class="" type="info"> info </el-tag>
      <el-tag class="" type="warning"> warning </el-tag>
      <br>
      <el-tag class="bg1"> 自定义1 </el-tag>
      <el-tag class="bg2"> 自定义2 </el-tag>
      <el-tag class="bg3"> 自定义3 </el-tag>
      <el-tag class="bg4"> 自定义4 </el-tag>
      <el-tag class="bg5"> 自定义5 </el-tag>
      <el-tag class="bg6"> 自定义6 </el-tag>
      <el-tag class="bg7"> 自定义7 </el-tag>
      <el-tag class="bg8"> 自定义8 </el-tag>
      <el-tag class="bg9"> 自定义9  </el-tag>
      <br><br>
      <br>
      <span style="text-decoration:underline; cursor: pointer;" @click="handleAdd">新增</span>&nbsp;&nbsp;
      <button @click="openDrag = !openDrag">切换是否可以拖拽</button>{{openDrag}}
      <draggable v-model="hobbies" @start="moveTagStart" @end="moveTagEnd" filter=".unDrag">
        <!--filter设置class为unDrag是不可以拖拽的项, 
            当openDrag为true时, 动态为item是篮球的标签加上unDrag为true,此时只有篮球不能拖拽,
            当openDrag为false时, 所有标签都加上unDrag为true,此时就关闭了拖拽功能-->
        <el-tag v-for="(item, index) in hobbies"
              closable @close="handleDelete(item)"
              style="margin-left:10px; cursor: pointer;" 
              @click="handleClickTag(index)"
              :class="{ unDrag:  openDrag ? item === '篮球' : true}"
              :style="{
                  'color': index == currentTagIndex ? '#fff' : '#000',
                  'background-color': index == currentTagIndex ? 'rgba(72, 99, 143, .9)' : '#fff',
              }">
          <span v-if="!editing[item]" @dblclick="handleEdit(item)">{{item}}</span>
          <el-input v-if="editing[item]" autofocus v-model="hobbyInput" :key="item" @blur="closeInput(item)" size='mini' style="width:60px;font-size:12px"></el-input>
        </el-tag>
      </draggable>
    </div>
    <hr>
    <!-- FUNCTION: json变成tree结构 -->
    json变成tree结构<br><br>
    <el-button type="primary" size="mini" @click="packageToolVisible=true">json变成tree结构</el-button>
    <el-dialog
        title="json变成tree结构"
        :visible.sync="packageToolVisible"
        class="package-tool"
        width="600px"
        append-to-body
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <PackagingTool
          type="pptx"
          title="json大文件的名字。。。。。"
          :project-json="projectJson"
          :zip_file_info="{'chapter': 1, 'hidden_spilt_title': true, 'add_prefix_number': true}"
          @cancle="packageToolVisible = false"/>
    </el-dialog>
    &nbsp;
    <el-button type="primary" size="mini" @click="packageToolDragVisible=true">json变成tree结构 + 可拖拽</el-button>
    <el-dialog
        title="json变成tree结构 + 可拖拽"
        :visible.sync="packageToolDragVisible"
        class="package-tool"
        width="600px"
        append-to-body
        :close-on-click-modal="false"
        :destroy-on-close="true"
      >
        <PackagingToolDrag
          type="pptx"
          title="json大文件的名字。。。。。"
          :project-json="projectJson"
          :zip_file_info="{'chapter': 1, 'hidden_spilt_title': true, 'add_prefix_number': true}"
          @cancle="packageToolDragVisible = false"/>
    </el-dialog>
    <hr>
    <!-- FUNCTION: 目录(json)编译器 -->
    目录(json)编译器<br><br>
    <el-button type="primary" size="mini" @click="catalogEditorVisible=true">MyInput</el-button>
    <el-dialog
      :visible.sync="catalogEditorVisible"
      :append-to-body="true"
      :show-close="false"
      width="600px"
      destroy-on-close
      :close-on-click-modal="false">
        <ul class="edit-info">
          <li>一行表示一个条目。</li>
          <li>使用文字前的空格代表层级：1个空格表示2级标题，以此类推。</li>
        </ul>
        <CompileCatalog :data="catalogEditorJson" :book-name="catalogEditorName" @data-change="styleJsonChangeHandle"/>
    </el-dialog>
    <hr>
    <!-- FUNCTION: lodash防抖 -->lodash防抖<br><br>
    <el-input placeholder="请输入内容" prefix-icon="el-icon-search" style="width: 200px" size="mini"  v-model="lodash_search" @input="lodashSearchList" />
    <hr>
    <!-- FUNCTION: 返回上一个路由 -->返回上一个路由<br><br>
    <el-button size="small" @click="$router.back()">返回</el-button>
    <hr>
    <!-- FUNCTION: 上传 -->上传<br><br>
      <!-- 
        uploading: 是否正在上传
        cancel_load: 是否中途取消上传
        multiple: 是否允许多文件上传

        @upload 上传按钮的回调
        @fileURL 上传到oss后返回url的回调
        @process 上传进度的回调

        @getFileName 选择文件时，获取文件name
        allowToUpload 是否允许上传(上传按钮是否允许点击)
      -->
    <Upload v-model="uploading" class="min-400"
      :cancel_load="cancel_load" :multiple="false"
      @upload="uploadHandler" @fileURL="getURL" @process="getProcess"
      @getFileName="getFileName" :allowToUpload="allowToUpload"
      />
    <hr>
    <!-- FUNCTION: this.$notify -->this.$notify<br><br>
    <el-button size="small" @click="openNotify">this.$notify</el-button>
    <hr>
    <br><br>
    <!-- FUNCTION: 标准el-dialog -->
    <el-button size="small" @click="dialog_visible = true">标准el-dialog</el-button>
    <el-dialog
      title="添加文章标签"
      :visible.sync="dialog_visible"
      width="30%"
      append-to-body
      :close-on-click-modal="false"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog_visible = false">取 消</el-button>
        <el-button type="primary" @click="dialog_visible = false">确 定</el-button>
      </span>
    </el-dialog>
    <hr>
    <br><br>
    <!-- FUNCTION: 跳动的icon -->
    <span style="cursor: pointer;position: relative;">
      跳动的icon
      <el-tooltip class="item" effect="light" content="点击添加文章类型" placement="right-start">
        <i class="el-icon-info blinking-text"></i>
      </el-tooltip>
    </span>
    <hr>
    <br><br>
    <!-- FUNCTION: v-for -->
    <div
        v-for="(item, index) in inputContent"
        v-bind:key="index"
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          margin-top: 5px;
        "
      >
      <el-input style="width:95%" v-model="item.content" placeholder="文章标签"></el-input>
      <i class="el-icon-circle-plus" @click="addContent"
          style="font-size: 18px; cursor: pointer;"></i>
    </div>
    <hr>
    <br><br>
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
import CP_MyTree from './CP_MyTree.vue'
import CP_MyFilter from './CP_MyFilter.vue';
import CompileCatalog from './CompileCatalog.vue';
import draggable from 'vuedraggable';
import Upload from '/src/components/Upload/Upload';

import PackagingTool from './packTool/PackagingTool.vue';
import PackagingToolDrag from './packTool/PackagingToolDrag.vue';
import packData from './packTool/data.json';

import _debounce from 'lodash/debounce';


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
    CP_MyCard,
    CP_MyTree,
    CP_MyFilter,
    PackagingTool,
    PackagingToolDrag,
    CompileCatalog,
    draggable,
    Upload,
  },
  data(){
    return{
      /********************* FUNCTION: table组件假分页 - 相关 *********************/
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
      /********************* FUNCTION: loading - 相关 *********************/
      loading: true,
      /********************* FUNCTION: table组件 - 相关 *********************/
      other_table: false,
      /********************* FUNCTION: 弹窗 - 相关 *********************/
      isShows: false,
      /********************* FUNCTION: 卡片 - 相关 *********************/
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
          },
          {
              "_id": "64e2e6de73bfa9f92410aacc",
              "title_en": "Newly named Artemis 2 crew to notch many firsts on historic moon mission",
              "title_ch": "新任命的阿尔忒弥斯2号机组将在历史性的月球任务中取得许多首次突破",
              "summary_en": "The astronauts who will fly on NASA's Artemis 2 mission are set to break records and establish a number of firsts. But for one crew member, being first is less important than what will come next.",
              "summary_ch": "NASA阿尔忒弥斯2号任务的宇航员们即将打破纪录，创造许多第一次。但对于其中一名机组成员来说，比起第一次，更重要的是接下来会发生什么。",
              "url": "https://www.space.com/artemis-2-moon-crew-firsts-records",
              "article_type": "说明文",
              "receive_time": "2023-04-04",
              "published": "2023-04-04 00:00:00",
              "summary_en_md5": "d4800eb8803ca052428d43b414903177",
              "available": true,
              "create_at": "2023-08-21 12:23:58",
              "customer_id": 2,
              "subscribe_status": 0,
              "source_id": "64e2e6de73bfa9f92410aacb",
              "unfit": null,
              "article_source": "Space",
              "tags": [
                  "宇宙探索"
              ]
          }
      ],
      // 卡片序号
      serial_num: 0 ,
      // 删除卡片相关
      deleteHidden: true,       // 是否隐藏删除icon
      cardId:'',
      // 批量删除卡片相关
      multiDelete: false,      // 是否开启批量删除模式
      mutiSelected: [],
      cancelSelected: false,   // 是否取消批量删除选中的卡片
      changePage: 0,

      /********************* FUNCTION: Tree - 相关 *********************/
      treeData: [
          {
              "_id": "64e2db6b088557b377aca3dd",
              "node_level": 1,
              "node_type": "chapter",
              "node_name": "zhibo111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111",
              "content": {
                  "level": 1,
                  "body": "<p>zhibo</p>",
                  "name": "zhibo",
                  "config": {
                      "topic": "zhibo",
                      "count": 1,
                      "method": "人工选择",
                      "sync": "否",
                      "sync_map": "",
                      "intro": "请填写阅读导语"
                  }
              },
              "node_id": "9619ecf6fd1642e9",
              "node_parent_id": "",
              "expand": true,
              "config_data": {
                  "topic": "zhibo",
                  "count": 1,
                  "method": "人工选择",
                  "sync": "否",
                  "sync_map": "",
                  "intro": "请填写阅读导语"
              },
              "isHidden": false,
              "customer_id": 2,
              "available": true,
              "order": 1,
              "create_time": "2023-08-21 11:35:07",
              "project_id": "64e2db6b088557b377aca3dc",
              "text_count": 5,
              "leaf": true,
              "rewrite_count": -3,
              "proposition_count": 0,
              "children": []
          },
          {
              "_id": "64e415ac8aa10af998bd7dfd",
              "node_name": "zhibo2",
              "node_type": "chapter",
              "content": {
                  "name": "zhibo2",
                  "config": {
                      "topic": "zhibo",
                      "count": 1,
                      "method": "人工选择",
                      "sync": "否",
                      "sync_map": "",
                      "intro": "请填写阅读导语"
                  }
              },
              "node_parent_id": "",
              "node_id": "ded304b2c0b9485b",
              "available": true,
              "order": 2,
              "create_time": "2023-08-22 09:55:56",
              "project_id": "64e2db6b088557b377aca3dc",
              "text_count": 0,
              "rewrite_count": 0,
              "proposition_count": 0,
              "leaf": false,
              "children": [
                  {
                      "_id": "64e415b38aa10af998bd7dfe",
                      "node_name": "zhibo22",
                      "node_type": "chapter",
                      "content": {
                          "name": "zhibo22",
                          "config": {
                              "topic": "zhibo",
                              "count": 1,
                              "method": "人工选择",
                              "sync": "否",
                              "sync_map": "",
                              "intro": "请填写阅读导语"
                          }
                      },
                      "node_parent_id": "ded304b2c0b9485b",
                      "node_id": "6542f2e57b004405",
                      "available": true,
                      "order": 1,
                      "create_time": "2023-08-22 09:56:03",
                      "project_id": "64e2db6b088557b377aca3dc",
                      "text_count": 2,
                      "rewrite_count": 0,
                      "proposition_count": 0,
                      "leaf": true,
                      "children": [],
                      "expand": true,
                      "isHidden": false
                  }
              ],
              "expand": true,
              "isHidden": false
          },
          {
              "_id": "64f29d193bf698bb349d31db",
              "node_name": "test",
              "node_type": "chapter",
              "content": {
                  "name": "test",
                  "config": {
                      "topic": "zhibo",
                      "count": 1,
                      "method": "人工选择",
                      "sync": "否",
                      "sync_map": "",
                      "intro": "请填写阅读导语"
                  }
              },
              "node_parent_id": "",
              "node_id": "2f93282e4fd84411",
              "available": true,
              "order": 3,
              "create_time": "2023-09-02 10:25:29",
              "project_id": "64e2db6b088557b377aca3dc",
              "text_count": 3,
              "rewrite_count": 2,
              "proposition_count": 0,
              "leaf": true,
              "children": [],
              "expand": true,
              "isHidden": false
          }
      ],
      currentNode: null,
      // 菜单内容
      menuItems: (...item) => [
        {
          label: '导出章节内容',
          onClick: () => {
            this.contextMenuClick('export', ...item);
          },
        },
        {
          label: '编辑',
          onClick: () => {
            this.contextMenuClick('edit', ...item);
          },
        },
        {
          label: '添加同级目录',
          onClick: () => {
            this.contextMenuClick('addbrother', ...item);
          },
        },
        {
          label: '添加子目录',
          onClick: () => {
            this.contextMenuClick('addchildren', ...item);
          },
        },
        {
          label: '上移',
          onClick: () => {
            this.contextMenuClick('moveup', ...item);
          },
        },
        {
          label: '下移',
          onClick: () => {
            this.contextMenuClick('movedown', ...item);
          },
        },
        {
          label: '删除',
          onClick: () => {
            this.contextMenuClick('delete', ...item);
          },
        }
      ],

      /********************* FUNCTION: 筛选 - 相关 *********************/
      filterData: [
        {
          key: 'year',
          keyName: '年份',
          dataList: this.getYears(),
          value: '全部',
        },
        {
          key: 'article_type',
          keyName: '文体',
          dataList: [
            { id: '全部', label: '全部' },
            { id: '说明文', label: '说明文' },
            { id: '记叙文', label: '记叙文' },
            { id: '议论文', label: '议论文' }
          ],
          value: '全部',
        },
        {
          key: 'word_count',
          keyName: '词数',
          dataList: [
            { id: '全部', label: '全部' },
            { id: '200', label: '200' },
            { id: '250', label: '250' },
            { id: '300', label: '300' },
            { id: '350', label: '350' },
            { id: '400', label: '400' },
            { id: '500+', label: '500+' }
          ],
          value: '全部',
        },
        {
          key: 'lexile',
          keyName: '难度',
          dataList: [
            { id: '全部', label: '全部' },
            { id: '300L', label: '300L' },
            { id: '400L', label: '400L' },
            { id: '500L', label: '500L' },
            { id: '800L', label: '800L' },
            { id: '1000L+', label: '1000L+' }
          ],
          value: '全部',
        },
        {
          key: 'item_status',
          keyName: '操作',
          dataList: [
            { id: '全部', label: '全部' },
            { id: '已用于过改写', label: '已用于过改写' },
            { id: '未用于过改写', label: '未用于过改写' }
            // { id: '最近感兴趣文章', label: '最近感兴趣文章' }
          ],
          value: '全部',
        }
      ],
      total: 0,
      language: '1', // 切换语言  1英文 2中文
      // 分页、筛选相关
      conditions: {
        page: 1,
        limit: 15,
        search: '',
        node_id: undefined,
        source: undefined,
        article_type: undefined,
        rewrite_status: undefined,
        proposition_status: undefined,
        time: undefined,
        words_num: undefined,
        lexile_score: undefined,
      },

      /********************* FUNCTION: 筛选 - 相关 *********************/
      testLocalForage: '',

      /************** FUNCTION: el-tag - 相关 **************/
      hobbies: ['篮球', '足球', '排球'],
      currentTagIndex: 0,
      hobbyInput:'',
      editing: {},
      openDrag: false,

      /************** FUNCTION: 监控页面宽高 - 相关 **************/
      clientWidth : 0,
      clientHeight : 0,

      /************** FUNCTION: json变成tree结构 **************/
      packageToolVisible: false,
      packageToolDragVisible: false,
      projectJson: [],

      /************** FUNCTION: 目录编译器 **************/
      catalogEditorVisible: false,
      catalogEditorName: 'test---',
      catalogEditorJson: 
      [{
        "node_level": 1,
        "node_type": "chapter",
        "node_name": "思维导图 构建体系",
        "content": {
            "level": 1,
            "body": "<p>思维导图 构建体系</p>"
        },
        "children": [],
        "node_id": "0wt9ffa9p397eclsr4rpdfdba",
        "node_parent_id": ""
        },
        {
        "node_level": 1,
        "node_type": "chapter",
        "node_name": "教材梳理 夯实基础",
        "content": {
            "level": 1,
            "body": "<p>教材梳理 夯实基础</p>"
        },
        "children": [
            {
                "node_level": 2,
                "node_type": "chapter",
                "node_name": "考点一 XXXX",
                "content": {
                    "level": 2,
                    "body": "<p>考点一 XXXX</p>"
                },
                "children": [],
                "node_id": "liqvxotyh4v5izfkywcedfdba",
                "node_parent_id": "x62sas45ph37zdvhto64dfdba"
            },
            {
                "node_level": 2,
                "node_type": "chapter",
                "node_name": "考点二 XXXX",
                "content": {
                    "level": 2,
                    "body": "<p>考点二 XXXX</p>"
                },
                "children": [],
                "node_id": "82z1b7tnmiwu116n2vnadfdba",
                "node_parent_id": "x62sas45ph37zdvhto64dfdba"
            }
        ],
        "node_id": "x62sas45ph37zdvhto64dfdba",
        "node_parent_id": ""
      },
      {
          "node_level": 1,
          "node_type": "chapter",
          "node_name": "重难突破 能力提升",
          "content": {
              "level": 1,
              "body": "<p>重难突破 能力提升</p>"
          },
          "children": [
              {
                  "node_level": 2,
                  "node_type": "chapter",
                  "node_name": "重难一 XXXX",
                  "content": {
                      "level": 2,
                      "body": "<p>重难一 XXXX</p>"
                  },
                  "children": [],
                  "node_id": "0jkv7dk3jzr69ecoszyudfdba",
                  "node_parent_id": "d0fvborvfxds1euyvm55dfdba"
              }
          ],
          "node_id": "d0fvborvfxds1euyvm55dfdba",
          "node_parent_id": ""
      },
      {
          "node_level": 1,
          "node_type": "chapter",
          "node_name": "实验突破 素养提升",
          "content": {
              "level": 1,
              "body": "<p>实验突破 素养提升</p>"
          },
          "children": [],
          "node_id": "gnjrh8poexzca7aaa73ndfdba",
          "node_parent_id": ""
      }],

      /************** FUNCTION: lodash防抖 **************/
      lodash_search: '',

      /************** FUNCTION: 上传相关 **************/
      uploading: false,
      fileName: '',
      ossUrl: '',
      process: '',
      cancel_load: 0,  // 取消上传时 this.cancel_load += 1;
      allowToUpload: true,

      /************** FUNCTION: 标准el-dialog **************/
      dialog_visible: false,

      /************** FUNCTION: v-for **************/
      inputContent: [{ content:'' }],
    }
  },
  created(){
    // 监控页面 + 防抖
    let timeID = null
    window.onresize = () => {
      clearTimeout(timeID)
      timeID = setTimeout(() => {
        return (() => {
          this.$nextTick(() => {
            this.clientWidth = document.body.clientWidth 
            this.clientHeight = document.body.clientHeight 
            console.log('clientWidth', this.clientWidth);
            console.log('clientHeight', this.clientHeight);
            // //真实DOM元素的宽度
            // console.log(this.$refs.test.$el.offsetWidth);
          })
        })()
      }, 500)
    }

    /************** FUNCTION: json变成tree结构 **************/
    // 获取打包工具要用的projectJson， 在packTool包下面的json数据
    this.projectJson = packData
  },
  mounted(){
    this.initCardId()
  },
  computed:{
    isDebug(){
      return Object.hasOwnProperty.call(this.$route.query, ['debug'])
    }
  },
  watch: {
    /************** FUNCTION: lodash防抖 (watch) **************/
    filters_test: {
      handler: _debounce(async function (newV, oldV) {
        // await this.getList();
      }, 500),
      deep: true,
      immediate: true
    }
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
    /**** 卡片删除相关 ****/
    // 接收子组件传值: TextCard组件右上角删除icon -  显示、隐藏
    getHidden(bool, id) {
      console.log(bool, id);
      this.deleteHidden = bool;
      this.cardId = id;
    },
    // 接收子组件传值: TextCard组件 -  被选择要删除的id
    async deleteSingleData(id) {
      await this.deleteCard(id);
    },
    // 删除卡片
    async deleteCard(beDelete_id) {
      this.$confirm('确认删除文章？'+beDelete_id, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {

          // 正常要拿到这个beDelete_id调用删除数据的接口
          // await deleteText({
          //   text_ids: [{ _id: beDelete_id }]
          // });
          // await this.getList();   // 删完再调用一次getList接口，视具体项目而定

          //假删(删除数组中指定的元素)   
          const ids = this.card_listData.map(item => {
            return item._id
          })
          const index = ids.indexOf(beDelete_id);
          if (index !== -1) {
            this.card_listData.splice(index, 1);
          }
          this.$message({ type: 'success', message: '删除成功!' });
        })
        .catch(() => {});
    },
    /**** 卡片批量删除相关 ****/
    // 点击红色[批量删除]按钮
    allDelete() {
      this.cancelSelected = false;
      this.multiDelete = !this.multiDelete;
    },
    // 点击红色[确认删除]按钮
    handleAllDelete() {
      const arr = [];
      for (const id of this.mutiSelected) {
        arr.push(id);
      }
      console.log(arr);

      this.$confirm('确认删除文章？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {

          // 正常要拿到这个arr调用删除数据的接口
          // await deleteText({
          //   text_ids: arr
          // });
          // await this.getList();   // 删完再调用一次getList接口，视具体项目而定

          //假删(删除数组中指定的元素)
          this.card_listData = this.card_listData.filter(item =>{
            return arr.includes(item._id) === false
          })
          this.$message({ type: 'success', message: '删除成功!' });
          this.cancelAllDelete();
        })
        .catch(() => {});
    },
    // 点击灰色[取消]按钮
    cancelAllDelete() {
      this.cancelSelected = true;
      this.multiDelete = !this.multiDelete;
      this.mutiSelected = [];
    },
    // 接收子组件传值: TextCard组件 -被选择要删除的id
    getId(id) {
      if (this.mutiSelected.every(val => val !== id)) {
        this.mutiSelected.push(id);
      } else if (this.mutiSelected.some(val => val === id)) {
        this.mutiSelected.splice(this.mutiSelected.indexOf(id), 1);
      }
      // console.log(this.mutiSelected);
    },
    changeCardColor(type, text){
      if(type==='subscribe'){
        this.$set(text, 'subscribe', true)
        this.$set(text, 'unfit', false)
        
        console.log(1);
        console.log(this.$store);
      }else {
        this.$set(text, 'subscribe', false)
        this.$set(text, 'unfit', true)
      }
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
    this.$message.success('下载成功');
    },
    // 下载图片
    download(){
        this.realDownload('https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100', '我的图片' +'.jpg')
    },
    async download2(){
      try {  
          const fileUrl = 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100';  
          const response = await fetch(fileUrl);  
          const blob = await response.blob();  
          const url = window.URL.createObjectURL(blob);  
          const link = document.createElement('a');  
          link.href = url;  
          link.download = '我的图片' +'.jpg';  
          link.style.display = 'none';  
          document.body.appendChild(link);  
          link.click();  
          window.URL.revokeObjectURL(url);  
          document.body.removeChild(link);  
        } catch (error) {  
          console.error('Error downloading file:', error);  
        }  
    },
    /************** FUNCTION: Tree - 相关 **************/
    // 点击目录节点  获取子组件tree传递的值
    async handleNode(data) {
      console.log('点击目录节点', data.node_name);
      if (data.children.length) return; // 目前只有叶子结点可以上传文件
      this.currentNode = data;
      // await this.getList();
    },
    // 点击菜单选项
    async contextMenuClick(action, ...item) {
      // console.log(this.currentNode);
      console.log('选择menu:', action, item, item[0].node_name);
      if (action === 'export') {
        // return await this.downloadBook(item);
      }
      if (action === 'moveup') {
        // return this.handleMoveNode('up', item[0]._id);
      }
      if (action === 'movedown') {
        // return this.handleMoveNode('down', item[0]._id);
      }
      if (action === 'edit') {
        // return this.onNodeEdit(item);
      }
      if (action === 'addbrother') {
        return this.onNodeAdd('brother', item);
      }
      if (action === 'addchildren') {
        return this.onNodeAdd('children', item);
      }
      if (action === 'delete') {
        // return this.handleDeleteNode(item[0]._id);
      }
    },
    // 添加节点
    async onNodeAdd(act, item) {
      this.beSelected = item[0];
      if (act === 'brother') {
        this.beAct = 'brother';
        console.log(item[0]);
        this.addNodeInfo = cloneDeep(item[0]);
        this.displayAddDialog = true;
      }
      if (act === 'children') {
        this.beAct = 'children';
        this.addNodeInfo = cloneDeep(item[0]);
        this.displayAddDialog = true;
      }
    },
    /************** FUNCTION: 筛选 - 相关 **************/
    // 年份
    getYears() {
      const curYear = new Date().getFullYear();
      const years = ['全部', `${curYear}`, `${curYear - 1}`, `${curYear - 2}`, `${curYear - 3}`].map((item) => ({
        label: item,
        id: item,
      }));
      years.push({ label: '最近1个月', id: 'latest_month' });
      years.push({ label: '最近3个月', id: 'latest_three_month' });
      years.push({ label: '最近6个月', id: 'latest_half_year' });
      return years;
    },
    // 点击按钮筛选
    handleFilterClick(data) {
      console.log(data);
      const value = data[0];

      if (data[1].keyName === 'article_type') {
        this.conditions.article_type = data[0];
        if (value === '全部') this.conditions.article_type = undefined;
        this.conditions.currentPage = 1;
        this.conditions.pageSize = 15;
        return;
      }
    },
    /************** FUNCTION: 点击icon 复制内容 - 相关 **************/
    copy(data){
        let url = data;
        let oInput = document.createElement('input');
        oInput.value = url;
        document.body.appendChild(oInput);
        oInput.select(); // 选择对象;
        console.log(oInput.value)
        document.execCommand("Copy"); // 执行浏览器复制命令
        this.$message({
          message: '复制成功',
          type: 'success'
        });
        oInput.remove()
    },
    
    /************** FUNCTION: 保存内容到粘贴板 **************/
    copy2 () {
      if (!navigator.clipboard) {
        // 如果不支持，则使用传统的 document.execCommand("copy") 方式
        const textArea = document.createElement('textarea');
        textArea.value = '这是一段需要复制到剪贴板的文本aaa';
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return;
      }
      // 使用 Clipboard API 复制内容到剪切板
      navigator.clipboard.writeText('这是一段需要复制到剪贴板的文本aaa').then(
        function () {
          console.log('复制成功');
        },
        function () {
          console.log('复制失败');
        }
      );

      this.$message.success(`复制成功`);
    },

    /************** FUNCTION: localForage - 相关 **************/
    setLocal(){
      this.$localForage.setItem(('myData'), this.testLocalForage);
      console.log('存入成功');
    },
    async getLocal(){
      const data = await this.$localForage.getItem(('myData'));
      console.log(data);
      // await this.$localForage.getItem(('myData')).then((data) => {
      //   console.log(data);
      // });
    },
    /************** FUNCTION: el-tag - 相关 **************/
    handleClickTag(index){
      console.log(index);
      this.currentTagIndex = Number(index);
    },
    handleDelete(item) {
      let _this = this;
      for (let i = 0; i < _this.hobbies.length; i++) {
        if (_this.hobbies[i] == item) {
          _this.hobbies.splice(i, 1);
          break;
        }
      }
    },
    handleAdd() {
      let _this = this;
      _this.$prompt('请输入您的爱好', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        _this.hobbies.push(value);
      })
    },
    handleEdit(item){
      this.editing = {}
      this.editing[item] = true
      this.hobbyInput = item
    },
    closeInput(item){
      this.editing = {}
      //修改数据
      const getIndex = this.hobbies.findIndex((h, index) => {
        if (h === item) {
          return index;
        }
      });
      this.hobbies.splice(getIndex, 1,this.hobbyInput);
    },
    moveTagStart(){
      console.log(this.hobbies);
      console.log(this.hobbies[this.currentTagIndex]);
    },
    moveTagEnd(){
      console.log(this.hobbies);
      console.log(this.hobbies[this.currentTagIndex]);
    },
    
    /************** FUNCTION: 目录编译器 **************/
    styleJsonChangeHandle (data) {
      this.catalogEditorJson = data;
      console.log(this.catalogEditorJson);
    },

    
    /************** FUNCTION: lodash防抖 **************/
    lodashSearchList: _debounce(async function (val) {
      console.log(val);
      // await this.getList();
    }, 500, {
      leading: false, // 第一次触发时 是否立即执行函数
      trailing: true  // 最后一次触发后 是否立即执行函数
    }),

    
    /************** FUNCTION: 上传相关 **************/
    // 选择文件时，获取file名称
    getFileName(val){
      console.log(val);
      if(!val.includes('zip')){
        this.allowToUpload = false;
        this.$message.error('请上传zip文件')
      }else{
        this.allowToUpload = true;
      }
    },
    uploadHandler(files) {
      console.log('上传文件');
      console.log(files);
      this.fileName = files[0].file.name;
      console.log(this.fileName);
    },
    // 获取上传的文件的url
    getURL(url) {
      console.log('获取上传的文件的url');
      this.ossUrl = url;
      console.log(this.ossUrl);
    },
    // 获取上传进度
    getProcess(val) {
      console.log('获取上传的进度');
      this.process = val;
      console.log('----', this.process);
    },

    /************** FUNCTION: this.$notify **************/
    openNotify () {
      let notifyObj = this.$notify({
        title: '选材进行中...',
        dangerouslyUseHTMLString: true,
        message: `<strong>
              可以在任务列表中查看选材进度，点击
              <router-link to="/taskList" target="_self" style="color:blue">查看本任务</router-link>
            </strong>`,
        duration: 10000,
        // 使用箭头函数可以拿到this。箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值，自己本身并没有this值。
        onClick: ()=> {
          //跳转到任务列表
          this.$router.push({ path: '/selection', name: 'selection', params: { fromAITopic: true } });
          notifyObj.close();
        }
      });
    },
    
    /************** FUNCTION: v-for **************/
    addContent () {
      this.inputContent.push({content:''});
    },
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

// <!-- FUNCTION: el-tag的更多颜色  相关 -->
.bg1{
    background: #ffffff;
    color: #b38091;
    border-color: #dbb9c4;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg2{
    background: #ffffd7;
    color: #6b6b52;
    border-color: #d1d1bb;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg3{
    background: #0000ff1c;
    color: #0000ff75;
    border-color: #0000ff38;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg4{
    background: #ddffe852;
    color: #6eaf83;
    border-color: #9fd1af;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg5{
    background: #ffeca1;
    color: #b59d3e;
    border-color: #b9a03f;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg6{
    background: #ccefce;
    color: #026106;
    border-color: #77c17a;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg7{
    // background-color: #dbf3f0;
    background-color: #e5f5f3;
    border-color: #a6e9e1;
    color: #378f84;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg8{
    background-color: #fef5ff;
    border-color: #fbd1fd;
    color: #ad7caf;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.bg9{
    background: #f3e9ff;
    color: #8564ab;
    border-color: #c0b1d1;

    height: 32px;
    padding: 0 10px;
    line-height: 30px;
    font-size: 12px;
    border-width: 1px;
    border-style: solid;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}


// <!-- FUNCTION: 目录编译器 -->
.edit-info {
    color: pink;
    list-style: disc;
    margin-bottom: 20px;
    margin-left: 20px;
    li{
      list-style: disc;
    }
  }


// <!-- FUNCTION: 跳动的icon -->
@keyframes blink {
  0%, 100% {
    color: #999; /* 原色 */
    font-size: inherit; /* 原大小 */
  }
  50% {
    color: orange; /* 红色 */
    font-size: 1.1em; /* 变大 */
  }
}

.blinking-text {
  animation: blink 1.5s infinite; /* 应用动画，持续时间为2秒，无限次循环 */
  position: absolute;
  // margin-left: -2px;
}

// <!-- FUNCTION: v-for -->
.el-icon-circle-plus:hover {
  // color: #7a7e9a;
  color: pink;
}
</style>
