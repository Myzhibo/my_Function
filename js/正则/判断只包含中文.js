function isOnlyChinese(str) {  
  // 匹配基本的中文字符（包括一些常见扩展）和标点符号（如果需要排除标点符号，请移除对应的Unicode范围）  
  // 注意：这个正则表达式并没有覆盖所有可能的中文字符和Unicode扩展  
  const regex = /^[\u3400-\u9FFF\uFF00-\uFFEF]+$/;  
  // 如果整个字符串都匹配中文字符，则返回true；否则返回false  
  return regex.test(str);  
}  

// 示例用法  
const str1 = "你好，世界"; // 包含标点符号，所以应该返回false  
const str2 = "你好世界"; // 只包含中文字符，所以应该返回true  
const str3 = "Hello, World!"; // 包含英文字符，所以应该返回false  
const str4 = "Hello, World! 哈哈"; 

console.log(isOnlyChinese(str1)); 
console.log(isOnlyChinese(str2)); 
console.log(isOnlyChinese(str3));
console.log(isOnlyChinese(str4)); 