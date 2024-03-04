    /** 追踪原文段落 */
    if(Boolean(this.keyword)){
      const dom = document.querySelectorAll('#myArticle_P');
      for (const [index, item] of dom.entries()) {
        if ((item.innerText).includes(this.keyword)) {
          // console.log(item.innerText);
          // console.log(index);
          // 滚到有题眼的段落
          (dom[index] as Element).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'start',
          });
        }
      }
    }