

/**********************  filter 方法 *********************/
function filterObjectProps(obj, condition) {  
  const result = {};  
  for (const key in obj) {  
    if (obj.hasOwnProperty(key) && condition(obj[key])) {  
      result[key] = obj[key];  
    }  
  }  
  return result;  
}  
// 使用这个函数来过滤出值不是 "all" 的属性  
const originalObj = {  
  "type": "all",  
  "year": "all",  
  "area": "all",  
  "grade": "all",  
  "stage": "all",  
  "subject": "123"  
};  
  
const filteredObj = filterObjectProps(originalObj, value => value !== "all");  
console.log(filteredObj); // 输出: { subject: '123' }