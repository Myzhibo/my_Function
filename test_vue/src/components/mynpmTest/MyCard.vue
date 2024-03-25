<template>  
  <div>  
    <MultifuncCard
      shadow="hover"
      :data="text"
      :content="text.name"
      :selectable = "true"
      :deletable = "true"
      keyword = "a"
      keywordColor = "red"
      keywordBackGround = "pink"
      :operable="true"
      :options="[
          {key: 'check', title: '查看'},
          {key: 'edit', title: '编辑'},
          {key: 'delete', title: '删除'},
      ]"
      :subscribe="1"
      :headerable="true"
      :footerable="true"
      @select="getSelect"
      @hoverCard="hoverCard"
      @deleteSingleCard="deleteSingleCard"
      @handleMenu="handleMenu"
    >
      <div slot="header-content"  style="margin-top:2px;display: flex; align-items: center; justify-content: space-between;">
        <div>left</div>
        <div>right</div>
      </div>
      <div slot="footer-content">
        <div>{{ text._id }}</div>
      </div>
      <!-- <template #footer-content-getData="{data}">
        <div>{{data._id}}</div>
      </template> -->
      
    </MultifuncCard>
  </div>  
</template>  
  
<script>  
import MultifuncCard from 'multifunc-card/plugins/MultifuncCard'; // 确保路径正确
export default {  
  name: 'MyCard',
  components: {
    MultifuncCard
  },
  data () {
    return {
      text: {
        _id: "QQQQQQ1",
        name:"I give my kids money through apps, not cash — and I'm not alone"
      },
    };
  },
  mounted () {},
  methods: {
    getSelect(data){
      console.log(data);
    },
    hoverCard(status, data){
      console.log(status, data);
    },
    deleteSingleCard(data){
      console.log(data);
    },
    handleMenu (key, data) {
      console.log(key, data);
    }
  }
};
</script>