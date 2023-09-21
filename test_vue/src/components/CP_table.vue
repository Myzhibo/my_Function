<template>
  <div>
    <el-table ref="myTable" :data="tableData" style="width: 100%" :border="true" fit>
      <el-table-column type="index" width="50" label="No" fixed> </el-table-column>
      <el-table-column prop="date" label="日期" width="150" fixed> </el-table-column>
      <el-table-column prop="name" label="姓名" width="120"> </el-table-column>
      <el-table-column prop="province" label="省份" width="120"> </el-table-column>
      <el-table-column prop="address" label="地址" minWidth="260"> </el-table-column>
      <el-table-column prop="zip" label="邮编" minWidth="120"> </el-table-column>

      <el-table-column label="操作" fixed="right" :render-header="renderHeader" :key="Math.random()">
        <template slot-scope="scope">
          <div class="optionDiv" style="white-space: nowrap; display: inline-block">
            <el-button type="text" size="small"> 新增 </el-button>
            <el-button type="text" size="small"> 编辑 </el-button>
            <el-button v-if="scope.row.uid == 3" type="text" size="small" @click="deleteData(scope.row)"> 移除 </el-button>
            <el-button v-if="scope.row.uid == 3" type="text" size="small"> 详情 </el-button>
            <el-button v-if="scope.row.uid == 3" type="text" size="small"> 下发 </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          uid: 1
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          uid: 2
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333,
          uid: 3
        }
      ]
    };
  },
  methods: {
    // 表头部重新渲染
    renderHeader(h, { column }) {
      let opts =[] 
      // this.$nextTick(()=>{
      // 获取操作按钮组的元素
      opts = document.getElementsByClassName('optionDiv');
      let widthArr = [];
      // 取操作组的最大宽度
      Array.prototype.forEach.call(opts, function (item) {
        if (item.innerText) {
          widthArr.push(item.offsetWidth);
        }
      });
      // 重新设置列标题及宽度属性
      if (widthArr.length > 0) {
        column.width = Math.max(...widthArr) + 24;
          // // 刷新一下表格
          // this.$nextTick(() => {
          //   this.$refs.myTable.doLayout();
          // });
        return h('span', column.label);
      } else {
        column.width = 0;
        return h('span', column.label);
      }
    // });
    },

    // 测试删除后表头重新渲染
    deleteData(row){
      console.log(row);
      //假删(删除数组中指定的元素)   // 正常要拿到这个row.uid调用删除数据的接口
      const uids = this.tableData.map(item => {
        return item.uid
      })
      const index = uids.indexOf(row.uid);
      console.log(index);
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
      // 主要为了测一下刷新表格重新渲染列宽
      this.$nextTick(() => {
        console.log(1);
        this.$refs.myTable.doLayout();
      this.renderHeader()
      });
    }
  }
};
</script>

