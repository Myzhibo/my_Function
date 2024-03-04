<template>  
  <div>  
    <p ref="clickableText" @mousedown="handleClick">点击获取光标所在位置的文字</p>  
  </div>  
</template>  
  
<script>  
export default {  
  methods: {  
    handleClick(event) {  
      // 获取被点击元素的文本内容和其范围  
      const textContent = this.$refs.clickableText.innerText;  
      const range = document.createRange();  
      range.selectNodeContents(this.$refs.clickableText);  
  
      // 获取鼠标点击相对于元素的位置  
      const rect = this.$refs.clickableText.getBoundingClientRect();  
      const x = event.clientX - rect.left;  
      const y = event.clientY - rect.top;  
  
      // 初始化字符索引  
      let characterIndex = 0;  
  
      // 使用 Range 对象来估算字符索引  
      const textNode = this.$refs.clickableText.firstChild;  
      range.setStart(textNode, 0);  
      range.setEnd(textNode, textNode.length);  
  
      for (; characterIndex < textContent.length; characterIndex++) {  
        const testRange = range.cloneRange();  
        testRange.setStart(textNode, characterIndex);  
        testRange.setEnd(textNode, characterIndex + 1);  
  
        const rectOfChar = testRange.getBoundingClientRect();  
  
        // 检查点击位置是否在字符矩形内  
        if (x > rectOfChar.left && x < rectOfChar.right) {  
          break;  
        }  
      }  
  
      // 获取光标所在位置的字符  
      const clickedChar = textContent[characterIndex];  
      console.log("光标所在位置的字符:", clickedChar);  
    }  
  }  
};  
</script>