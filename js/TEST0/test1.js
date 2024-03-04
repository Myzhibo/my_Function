const text = `  
Isatou Ceesay started a project to recycle plastic. She saw a lot of plastic bags causing pollution and <span data-sn="1">__1__</span> to animals.  
Later, people supported her initiative. She collected the plastic bags and turned them into useful products.  
Finally, <span data-sn="3">__3__</span> she was able to turn her recycling activity into a successful business.  <span data-sn="4">__4__</span> she was able to turn her recycling activity into a successful business.
`;  
  
// 找到特定文本结束的位置  
const startIndex = text.indexOf('people supported her initiative. She collected the plastic bags and turned them into useful products.') + 'people supported her initiative. She collected the plastic bags and turned them into useful products.'.length;  
console.log(startIndex)

const regex = /<span data-sn="[^"]*">([^<]*)<\/span>/g;  
let match;  
const spanContentsAfterIndex = [];  
regex.lastIndex = startIndex; // 设置正则表达式的开始位置  
while ((match = regex.exec(text)) !== null) {  
  // match[1]是捕获的<span>标签内容  
  spanContentsAfterIndex.push(match[1]);  
}  
console.log(spanContentsAfterIndex); // 输出: ["__3__"]