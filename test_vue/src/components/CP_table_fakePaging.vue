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
    <tr v-for="(item,index) of showMechineList" :key="index"  style="height:40px; text-align:center ;">
      <td v-for="(i,index) of item" :key="index">
        {{i}}
      </td>
    </tr>
  </table>  -->
                    <el-table
                      v-loading="expanding" element-loading-text="正在扩容..." 
                      :data="showMechineList"
                      style="width: 100%; z-index: 99">
                          <el-table-column
                            prop="id"
                            label="id"
                            width="70">
                          </el-table-column>
                          <el-table-column
                            prop="uid"
                            label="uid"
                            width="200">
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
                            prop="cpu_mem"
                            label="配置"
                            width="250">
                          </el-table-column>
                          <el-table-column
                            prop="instance_type"
                            label="规格"
                            width="150">
                          </el-table-column>
                          <el-table-column
                            prop="auto_release_time"
                            label="到期时间"
                            width="200">
                          </el-table-column>
                          <el-table-column
                            prop="ip"
                            label="ip"
                            width="170">
                          </el-table-column>
                    </el-table>
                    <br>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="total"
                      :page-size="pagesize"
                      :current-page="currentPage"
                      @current-change="handleCurrentChange"
                      >
                      <!-- v-show="showMechineList.length"  -->
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
      showMechineList: []
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
    // 初始化showData
    initShowData(allData){
      this.showMechineList = allData.slice((this.currentPage-1) * this.pagesize, this.currentPage*this.pagesize);
      this.total = allData.length;

      /* 给每个对象添加id */
      this.showMechineList.forEach((item, index) => {
        item.id = (this.currentPage-1) * this.pagesize + (index + 1);
      });
    },
    // 分页跳转
    async handleCurrentChange(pageId) {
      this.currentPage = pageId
      this.initShowData(this.ListData);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>