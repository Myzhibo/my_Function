<template>  
  <div>  
    <!-- 其他内容 -->  
  
    <!-- 选中文本时显示的菜单 -->  
    <!-- v-if="isTextSelected" -->
    <div  
      
      class="selection-menu"  
      :style="menuStyle"  
    >  
      <button @click="copyText">复制</button>  
      <button @click="hideMenu">取消</button>  
    </div>  
  
    <!-- 用户可以在这里选择文本 -->  
    <div  
      ref="selectableText"  
      class="selectable-text"  
      @mousemove="updateMenuPosition"  
      @mouseup="checkSelection"  
    >  度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$度储备银行行长沙克蒂坎塔·达斯于周四推出了一项名为DAKSH的新的“监管科技”倡议 - 该银行的先进监督监控系统，预计将使监督过程更加健全。印度储备银行在一份声明中表示，他们一直在采取各种举措来加强监督，其中包括采用最新数据和Reserve Bank Governor Shaktikanta Das on Thursday launched a new 'SupTech' initiative DAKSH - the bank's Advanced Supervisory Monitoring System, which is expected to make the supervisory processes more robust. In a statement, __1__, !@##%$&**%()&)&%%()^@(*$#^)$
    </div>  
  </div>  
</template>  
  
<script>  
export default {  
  data() {  
    return {  
      isTextSelected: false,  
      selectedText: '',  
      menuStyle: {  
        top: 0,  
        left: 0,  
        transform: 'translate(-50%, -50%)' // 居中显示菜单  
      },
      menuTop:0,
      menuLeft:0
    };  
  },  
  methods: {
    checkSelection() {  
      const selection = window.getSelection();  
      this.selectedText = selection.toString();  
      this.isTextSelected = this.selectedText.trim().length > 0;
      
      // 更新菜单的样式  
      this.menuStyle.top = `${this.menuTop}px`;  
      this.menuStyle.left = `${this.menuLeft}px`;  
    },  
    copyText() {  
      navigator.clipboard.writeText(this.selectedText).then(() => {  
        console.log('文本已复制到剪贴板');  
        this.hideMenu();  
      }).catch(err => {  
        console.error('无法复制文本:', err);  
      });  
    },  
    hideMenu() {  
      this.isTextSelected = false;  
    },  
    updateMenuPosition(event) {  
      // console.log(event.clientX);
      this.menuTop = event.clientX;
      this.menuLeft = event.clientY;

      // if (!this.isTextSelected) return;  
  
      // // 获取 selectable-text 元素的位置  
      // const rect = this.$refs.selectableText.getBoundingClientRect();  

      // console.log(rect);
  
      // // 计算菜单的位置  
      // // 这里我们假设菜单应该出现在 selectable-text 元素的中心上方  
      // const menuTop = rect.top - 20; // 假设菜单高度为 40px，所以向上偏移 20px  
      // const menuLeft = rect.left + (rect.width / 2) - (100 / 2); // 假设菜单宽度为 100px，所以水平居中  
  
      // // 更新菜单的样式  
      // this.menuStyle.top = `${menuTop}px`;  
      // this.menuStyle.left = `${menuLeft}px`;  
    }  
  },  
  mounted() {  
    // 初始时隐藏菜单  
    this.isTextSelected = false;  
  }  
};  
</script>  
  
<style>  
.selection-menu {  
  position: absolute;  
  z-index: 1000;  
  /* 其他样式，如背景、边框、大小等 */  
  /* 根据需要调整这些值 */  
  width: 100px;  
  height: 40px;  
  display: flex;  
  justify-content: center;  
  align-items: center;  
}  
  
.selectable-text {  
  /* 样式使文本可选 */  
  user-select: text;  
  cursor: text;  
}  
</style>