<template>
  <div>
      <h1>数字资源服务平台</h1>
      <button @click="isSaved = !isSaved">是否保存了: {{isSaved}}</button>
  </div>
</template>

<script>
import Vue from 'vue';

// Component.registerHooks(['beforeRouteEnter', 'beforeRouteLeave', 'beforeRouteUpdate']);
export default {
  name: 'LoginIndex2',
  data () {
    return {
      isSaved: false,
    };
  },
  // 离开组件时
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      // 阻止用户离开当前页面
      next(false);
      setTimeout(() => {
        this.$confirm('您尚有修改的数据未保存！', '提示', {
          confirmButtonText: '确定',
          type: 'warning',
        }).then(() => {
        // next();
        }).catch(() => {
        // // 当用户点击浏览器后退时，阻止闪屏问题
        // if (window.history && window.history.pushState) {
        //   history.pushState(null, null)
        //   window.addEventListener('popstate', this.originGoBack, false)
        // }
        });
      }, 100);
    } else {
      next();
    }
  },
  mounted () {
    // const that = this;
    // // 当用户刷新页面时
    // window.onbeforeunload = function(e) {
    //   console.log('点击刷新按钮了');
    //   if (that.$route.name ==='不要卡我') {
    //     window.onbeforeunload = null;
    //     return
    //   }
    //   if (that.$route.name === 'leave_route') {
    //     console.log(e);
    //     const message = 'some word';
    //     e = e || window.event;
    //     if (e) {
    //       e.returnValue = message;
    //     }
    //     return message;
    //   }
    // };
    window.addEventListener('beforeunload', function(event) {  
      // 取消事件的默认行为  
      event.preventDefault();  
      // Chrome 需要 returnValue 属性来显示自定义消息  
      event.returnValue = 'aaaaaaaaaaaaaaa';  
    });
  },
};
</script>

<style lang="scss" scoped>
</style>
