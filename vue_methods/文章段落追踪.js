    /** 追踪原文段落 */
    if(Boolean(this.keyword)){
      const dom = document.querySelectorAll('#myArticle_P');
      for (const [index, item] of dom.entries()) {
        if ((item.innerText).includes(this.keyword)) {
          // console.log(item.innerText);
          // console.log(index);
          // 滚到有题眼的段落
          (dom[index] as Element).scrollIntoView({
            behavior: 'smooth',  // 如何滚动  instant | smooth.
            block: 'start',  // 定义垂直方向的对齐   start:(默认值)定位页面开头 | center:定位在页面中间 | end:定位在页面结尾
            inline: 'start', // 定义水平方向的对齐   start:(默认值)定位页面开头 | center:定位在页面中间 | end:定位在页面结尾
          });
        }
      }
    }

    // scrollIntoViewIfNeeded ：都是瞬间滚动，没有动画。如果元素在可视区域，那么调用它的时候，页面是不会发生滚动的。