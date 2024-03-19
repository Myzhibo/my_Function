function getSelectedSentence() {  
  let selection = window.getSelection();  
  if (selection.rangeCount > 0) {  
      let range = selection.getRangeAt(0);  
      let selectedText = range.toString();  
      let startContainer = range.startContainer;  
      let endContainer = range.endContainer;  
        
      // 寻找句子开始  
      let sentenceStart = findSentenceStart(startContainer, range.startOffset);  
      // 寻找句子结束  
      let sentenceEnd = findSentenceEnd(endContainer, range.endOffset);  
        
      if (sentenceStart && sentenceEnd) {  
          // 提取句子文本  
          let sentenceRange = document.createRange();  
          sentenceRange.setStart(sentenceStart.node, sentenceStart.offset);  
          sentenceRange.setEnd(sentenceEnd.node, sentenceEnd.offset);  
          let sentenceText = sentenceRange.toString().trim();  
            
          // 输出句子文本和选中的单词  
          console.log('Sentence:', sentenceText);  
          console.log('Selected Word:', selectedText);  
      } else {  
          console.log('Could not find sentence boundaries.');  
      }  
  }  
}  

function findSentenceStart(node, offset) {  
  // 向前查找句子开始的位置  
  // 这里只是一个简单的示例，可能需要更复杂的逻辑来处理多种情况  
  let sentenceStart = { node: null, offset: null };  
  while (node && offset > 0) {  
      if (node.nodeType === Node.TEXT_NODE) {  
          let text = node.textContent;  
          let reverseIndex = offset - 1;  
          let prevChar = text[reverseIndex];  
          // 检查前一个字符是否是句子结束标点符号  
          if (prevChar === '.' || prevChar === '?' || prevChar === '!') {  
              // 如果找到标点符号，则句子开始于此字符之后  
              sentenceStart.node = node;  
              sentenceStart.offset = reverseIndex + 1;  
              break;  
          }  
          offset--;  
      } else {  
          node = node.previousSibling;  
          if (node) {  
              offset = (node.lastChild && node.lastChild.nodeType === Node.TEXT_NODE) ? node.lastChild.length : node.childNodes.length;  
          }  
      }  
  }  
  return sentenceStart;  
}  

function findSentenceEnd(node, offset) {  
  // 向后查找句子结束的位置  
  // 这里只是一个简单的示例，可能需要更复杂的逻辑来处理多种情况  
  let sentenceEnd = { node: null, offset: null };  
  while (node) {  
      if (node.nodeType === Node.TEXT_NODE) {  
          let text = node.textContent;  
          let index = offset;  
          let nextChar = text[index];  
          // 检查下一个字符是否是句子结束标点符号  
          if (nextChar === '.' || nextChar === '?' || nextChar === '!') {  
              // 如果找到标点符号，则句子结束于此字符之前  
              sentenceEnd.node = node;  
              sentenceEnd.offset = index;  
              break;  
          } else if (index < text.length) {  
              // 如果不是标点符号且还有更多文本，则继续向后查找  
              index++;  
          } else {  
              // 如果已经到达文本节点末尾，则查找下一个节点  
              node = node.nextSibling;  
              index = 0;  
          }  
      } else {  
          node = node
          node = node.nextSibling;
        }
        }
        return sentenceEnd;
        }
        
        // 假设你已经在页面上选中了文本，然后调用函数
        // getSelectedSentence();