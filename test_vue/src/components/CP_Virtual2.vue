<template>  
  <div>  
    <div v-infinite-scroll="loadMoreData" infinite-scroll-disabled="busy" infinite-scroll-distance="50" class="content-lib-list">  
        <span v-for="item of data">{{item}}</span>
    </div>  
  </div>  
</template>

<script>import vInfiniteScroll from 'vue-infinite-scroll'; 
export default {
  components: {
    vInfiniteScroll
  },
  data(){
    return {
      data:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
    }
  },
  methods: {
    loadMoreData(){
      console.log('到底了');
    }
  }
};
</script>

<style lang="scss" scoped>

.content-lib-list {
  width: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100px;
  background: pink;

//   .el-dropdown-link {
//     color: $el_primary;
//     cursor: pointer;
//   }

//   .content-lib-list-nav {
//     flex: none;
//   }

//   .content-lib-list-body {
//     flex: auto;
//     // overflow: auto;
//   }
}

// .text-overflow {
//   width: 270px;
//   height: 30px;
//   line-height: 30px;
//   overflow: auto;
//   text-overflow: ellipsis;
//   white-space: nowrap;

//   /deep/ p {
//     margin: 0px;
//   }
// }
// .none {
//   color: #ccc;
//   text-align: center;
//   width: 100%;
//   font-size: 13px;
//   // 禁止点击
//   cursor: not-allowed;
// }
</style>
