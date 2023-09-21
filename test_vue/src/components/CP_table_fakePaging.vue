<template>
  <div>
<!-- <table style="align-items: center;" class="w-100 table-bordered">
    <tr class="text-muted" style="height:40px; text-align:center ;">
      <td>uid</td>
      <td>机器名</td>
      <td>配置</td>
      <td>规格</td>
      <td>到期时间</td>
      <td>ip</td>
    </tr>
    <tr v-for="(item,index) of showData" :key="index"  style="height:40px; text-align:center ;">
      <td v-for="(i,index) of item" :key="index">
        {{i}}
      </td>
    </tr>
  </table>  -->
                    <div style="width: 100%; align-items: center;">
                        <el-table
                          ref="myTable"
                          border
                          v-loading="expanding" element-loading-text="正在扩容..." 
                          :row-key="getRowKeys"
                          :data="showData"
                          style="width: 100%; z-index: 99"
                          @selection-change="handleSelectionChange"
                        >
                        <!-- :reserve-selection="true" -->

                              <el-table-column
                              fixed="left"
                              type="selection"
                              width="55"
                              :reserve-selection="true"
                              >
                              </el-table-column>
                              <el-table-column
                                prop="id"
                                label="id"
                                width="70">
                              </el-table-column>
                                  <!-- <template slot-scope="{row}">
                                    {{ row.id }}
                                  </template> -->
                              <el-table-column
                                prop="uid"
                                label="uid"
                                width="200">
                                  <!-- <template slot-scope="{row}">
                                    {{ row.uid }}
                                  </template> -->
                              </el-table-column>
                              <el-table-column
                                prop="name"
                                label="机器名"
                                width="200">
                                  <template slot-scope="{row}">
                                    <el-tag v-if="row.name === 'ali-PPT_AUTO_VBA_J2PPT'" style="height:32px" type="success">
                                      PPT_AUTO_VBA_J2PPT
                                    </el-tag>
                                    <el-tag v-else-if="row.name === 'ali-PPT_AUTO_VBA_W2PPT'" style="height:32px" type="warning">
                                      PPT_AUTO_VBA_W2PPT
                                    </el-tag>
                                    <el-tag v-else-if="row.name === 'ali-CONTENT_SERVER_NODE'"  style="height:32px;" type="danger">
                                      CONTENT_SERVER_NODE
                                    </el-tag>
                                  </template>
                              </el-table-column>
                              <el-table-column
                                prop="auto_release_time"
                                label="到期时间"
                                width="200">
                              </el-table-column>
                              <el-table-column
                                prop="remainder"
                                label="剩余时间"
                                width="120">
                                  <template slot-scope="{row}">
                                    <span v-if="Math.ceil((new Date(row.auto_release_time).getTime() - new Date().getTime()) / 1000 / 60) > -1">
                                      {{ Math.ceil((new Date(row.auto_release_time).getTime() - new Date().getTime()) / 1000 / 60)+ ' mins'}}
                                    </span>
                                    <span v-else>
                                      已过期
                                    </span>
                                  </template>
                              </el-table-column>
                              <el-table-column
                                prop="ip"
                                label="ip"
                                width="170">
                              </el-table-column>
                              <!-- 自适应列宽加一个min-width, 当该列无任何值时, 也能撑起单元格 -->
                              <el-table-column
                                prop="test_renderHeader"
                                label="测试列宽自适应"
                                :render-header="renderHeader"
                                min-width="200"
                              >
                                <template slot-scope="{row}">
                                  <div class="optionDiv" style="white-space: nowrap; display: inline-block">
                                      <el-button type="danger" disabled size="mini" >
                                          生成失败
                                          <el-tooltip class="item" effect="dark" :content="row.test_renderHeader" placement="top-end">
                                            <i class="el-icon-info"></i>
                                          </el-tooltip>
                                          --------
                                          <el-tooltip effect="light" placement="bottom">
                                            <div slot="content" style="width:100px">
                                                {{ row.test_renderHeader }}
                                            </div>
                                            <i class="el-icon-info"></i>
                                          </el-tooltip>
                                      </el-button>
                                      --------
                                      <el-tooltip effect="light" placement="bottom">
                                        <div slot="content" style="width:100px">
                                            {{ row.test_renderHeader }}
                                        </div>
                                        <span>{{ row.test_renderHeader }}</span>
                                      </el-tooltip>
                                  </div>
                                </template>
                              </el-table-column>
                              <el-table-column
                                prop="operate"
                                label="操作"
                                width="170"
                                :render-header="renderHeader2"
                              >
                                  <template slot-scope="{row}">
                                    <el-button size="mini" @click="deleteRow(row)" element-loading-spinner="el-icon-loading">删除</el-button>
                                  </template>
                              </el-table-column>
                        </el-table>
                    </div>
                    <br>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="pagesize"
                      :current-page="currentPage"
                      @current-change="handleCurrentChange"
                      >
                      <!-- v-show="showData.length"  -->
                    </el-pagination>
  </div>
</template>

<script>
export default {
  data(){
    return {
      currentPage: 1,
      pagesize: 5,
      total: 0,
      showData: [],
    }
  },
  props:['ListData','expanding'],
  mounted(){
  },
  watch: {
    ListData: {
      handler(val){
        // 先将当前页初始化回1
        // this.currentPage = 1
        this.initShowData(val);
      },
      immediate:true
    }
  },  
  methods:{
    // 自定义表头样式  ---   列宽自适应
    renderHeader(h, { column }) {
      this.$nextTick(()=>{      //防止getElementsByClassName拿不到值
          // 获取该列的行内元素
          const opts = document.getElementsByClassName('optionDiv');
          // 取该列的最大宽度
          let widthArr = [];
          Array.prototype.forEach.call(opts, function (item) {
            if (item.innerText) {
              widthArr.push(item.offsetWidth);
            }
          });
          // 重新设置列标题及宽度属性
          if (widthArr.length > 0) {
            column.width = Math.max(...widthArr) + 24;
            // 刷新一下表格
            this.$nextTick(() => {
              this.$refs.myTable.doLayout();
            });
            return h('span', column.label);
          } else {
            column.width = 0;
            return h('span', column.label);
          }
      })
      return h('span', column.label);
    },
    // 自定义表头样式  ---   列名内加icon
    renderHeader2(h, { column }) {
      return h(
        'el-tooltip',  //  标签的名称
      {
      props: {  //标签的参数 通过不同的标签 显示不同的文字
          content: (function() {
              //如何拿到 label的文字  通过column.label来拿
              let label = column.label
              console.log('renderHeader啦', column.label);
              switch (label) {
                case label:
                  return "这是操作列~~"
                case '提示2':
                  return '提示文字2'
                case '提示3':
                  return '提示文字3'
              }
          })(),
          placement: 'top',
          // effect: "light",     // tip主题
      },
      ///下面的意思是往el-tooltip  标签里面添加内容  column.label(拿到自己定义的显示内容: 拦截状态)
      domProps: {
          innerHTML: column.label + '<span class="el-icon-question" style="color: #409eff;margin-left:10px "></span>'
          }
      },
      [h('span')]
      )
    },
    getRowKeys(row){
      return row.uid;
    },
    // 获取被选择行的数据
    handleSelectionChange(val){
      console.log(val);
    },
    // 初始化showData
    initShowData(allData){
      this.showData = allData.slice((this.currentPage-1) * this.pagesize, this.currentPage*this.pagesize);
      this.total = allData.length;

      /* 给每个对象添加id */
      this.showData.forEach((item, index) => {
        item.id = (this.currentPage-1) * this.pagesize + (index + 1);
      });
    },
    // 分页跳转
    async handleCurrentChange(pageId) {
      this.currentPage = pageId
      this.initShowData(this.ListData);
    },
    // 删除行
    deleteRow(row){
      console.log(row);
      //假删(删除数组中指定的元素)   // 正常要拿到这个row.uid调用删除数据的接口
      const uids = this.showData.map(item => {
        return item.uid
      })
      const index = uids.indexOf(row.uid);
      console.log(index);
      if (index !== -1) {
        this.showData.splice(index, 1);
      }
      // 重新渲染表格
      this.$nextTick(() => {
        this.$refs.myTable.doLayout();
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>