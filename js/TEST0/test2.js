function findSentenceWithPlaceholder(text, placeholder) {  
  // 将文本按句号分割成句子数组  
  const sentences = text.split('.').map(sentence => sentence.trim());  
    
  // 遍历每个句子，检查是否包含占位符  
  for (let i = 0; i < sentences.length; i++) {  
      if (sentences[i].includes(placeholder)) {  
          // 如果找到包含占位符的句子，返回该句子  
          return sentences[i] + '.'; // 添加回分割时去掉的句号  
      }  
  }  
    
  // 如果没有找到包含占位符的句子，返回null  
  return null;  
}  

// 示例文本  
const text = "这是一段文本.其中包含一个__4__占位符.我们需要找到这个占位符所在的句子。这是另一句话。";  

// 调用函数并打印结果  
const sentenceWithPlaceholder = findSentenceWithPlaceholder(text, '__4__');  
console.log(sentenceWithPlaceholder); // 输出：其中包含一个__4__占位符。