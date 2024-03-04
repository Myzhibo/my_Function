<template>  
  <div 
    class="container"
    @mousemove="onMouseMove">  
    <div
      v-show="showFollower"  
      class="follower"  
      :style="followerStyle"  
    >11</div>
    <!-- 用户可以在这里选择文本 -->  
    <div  
      ref="selectableText"  
      class="selectable-text"  
      @mouseup="checkSelection"  
    >  
    度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __2__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __3__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __4__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __5__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __6__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __7__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __8__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __9__, !@##%$&**%()&)&%%()^@(*$#^)$
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {
      isTextSelected: false,  
      selectedText: '', 
      textBefore:  '',        // 选中内容在本段的 前文本
      textAfter:  '',         // 选中内容在本段的 后文本
      StartIndex: 0, 
      EndIndex: 0, 
      newQuesNumber: '',      // 新题目的题号(选中的文本后面的题号)

      showFollower: true, // 控制方块是否显示  
      followerSize: 50, // 跟随方块的大小（直径）  
      followerStyle: {  
        position: 'absolute',  
        top: '0px',  
        left: '0px',  
        width: `50px`,  
        height: `50px`,  
        backgroundColor: 'red',  
        borderRadius: '50%', // 圆形方块  
        zIndex: '9999',
      },  
    };  
  },  
  methods: {  
    onMouseMove(event) {  
      // 获取鼠标在容器内的位置  
      const containerRect = this.$el.getBoundingClientRect();  
      const containerLeft = containerRect.left;  
      const containerTop = containerRect.top;  
  
      // 计算鼠标在容器内的相对位置  
      const relativeX = event.clientX - containerLeft;  
      const relativeY = event.clientY - containerTop;  
  
      // 设置方块的位置，使其中心与鼠标位置重合  
      this.followerStyle.top = `${relativeY - 100 / 2}px`;  
      this.followerStyle.left = `${relativeX - 100 / 2}px`;  
    },  
    checkSelection() {
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);
      this.StartIndex = selection.anchorOffset;
      this.EndIndex = selection.focusOffset;
      this.selectedText = selection.toString();
      this.textBefore = range.startContainer.textContent.slice(0, range.startOffset);
      this.textAfter = range.endContainer.textContent.slice(range.endOffset);
      this.isTextSelected = this.selectedText.trim().length > 0;
      // console.log(this.selectedText, selection);
      // console.log(this.textBefore);
      const regex = /\_\_(\d+)\_\_/g;
      const matches = this.textAfter.match(regex);
      if(matches){
        const regex2 = /\_\_(\d+)\_\_/;
        this.newQuesNumber = matches[0].match(regex2)[1]
        console.log(this.newQuesNumber);
      }
    },  
  },  
};  
</script>  
  
<style scoped>  
.container {  
  position: relative; /* 使得 .follower 能够相对于它进行定位 */  
  width: 100%;  
  height: 100vh; /* 使得容器占据整个视口高度 */  
}  
  
.follower {  
  /* 样式已经在 data 中定义 */  
}  
</style>