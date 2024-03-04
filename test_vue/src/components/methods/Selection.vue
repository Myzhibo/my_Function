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
    度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      isTextSelected: false,  
      selectedText: '', 
      showFollower: true, // 控制方块是否显示  
      followerSize: 50, // 跟随方块的大小（直径）  
      followerStyle: {  
        position: 'absolute',  
        top: '0px',  
        left: '0px',  
        width: `${this.followerSize}px`,  
        height: `${this.followerSize}px`,  
        backgroundColor: 'red',  
        borderRadius: '50%', // 圆形方块  
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
      this.followerStyle.top = `${relativeY - this.followerSize / 2}px`;  
      this.followerStyle.left = `${relativeX - this.followerSize / 2}px`;  
    },  
    checkSelection() {  
      const selection = window.getSelection();  
      this.selectedText = selection.toString();  
      this.isTextSelected = this.selectedText.trim().length > 0;
      console.log(this.selectedText);
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