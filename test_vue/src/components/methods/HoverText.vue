<template>  
  <div>  
    <div v-html="qmaterial" />
  </div>  
</template>  
  
<script>  
export default {  
  data(){
    return {
      qmaterial: `<p style="margin-bottom: 12px;" id='myArticle_P'>Isatou Ceesay is an amazing woman who started a project to recycle plastic in her village. She saw a lot of plastic bags everywhere, causing pollution and <span data-sn="1">__1__</span> to animals. Isatou and her friends decided to take action by collecting the plastic bags and turning them into <span data-sn="2">__2__</span> products.</p><p style="margin-bottom: 12px;" id='myArticle_P'>At <span data-sn="3">__3__</span>, many people in her village didn't support her and thought it was useless to collect plastic waste.</p><p style="margin-bottom: 12px;" id='myArticle_P'>But Isatou didn't <span data-sn="4">__4__</span> up. ”</p>`
    }
  },
  mounted(){
    ///////////// 没有下面这段代码的话，css hover 不会生效      ///////////////////////////////////////////////////////////////
    ///////////// 因为使用了【v-html】指令，那么Vue 不会处理该 HTML 中的任何 Vue 特定功能，包括样式绑定和事件监听。     ///////////
    ///////////// 如果没有使用【v-html】指令，css hover应该就可以了(没测试)     ///////////////////////////////////////////////
    const spans = this.$el.querySelectorAll('span[data-sn]');  
    spans.forEach(span => {  
      span.addEventListener('mouseenter', () => {  
        span.style.color = 'white';
        span.style.backgroundColor = 'orange';
        span.style.cursor = 'pointer';
        span.style.borderRadius = '5px';
        span.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.32), 0 0 6px rgba(0, 0, 0, 0.22)';
      });  
      span.addEventListener('mouseleave', () => {  
        span.style.color = '';  
        span.style.backgroundColor = '';  
        span.style.cursor = '';
        span.style.borderRadius = '';
        span.style.boxShadow = '';
      });   
      span.addEventListener('click', () => {  
        console.log(span);
        console.log(span.getAttribute('data-sn'));
        console.log(span.innerText);
      }); 
    });  
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }
};  
</script>

<style scoped lang="scss">
  span[data-sn]:hover {
    color: yellow !important;
    background-color: yellow !important;  /* 或者其他你想要的样式 */
  }
</style>