
//// 对象 打平成 数组

const obj = {
  "3": [1, 2],
  "4": [3, 4]
};
  
// 使用 reduce 方法将对象的值（数组）合并成一个数组
// const flatArray = Object.values(obj).reduce((acc, val) => acc.concat(val), []);
  
// 或者使用扩展运算符（更简洁的方式，如果环境支持）
// const flatArray = [].concat(...Object.values(obj));

const flatArray = Object.values(obj).flat();
  
console.log(flatArray); // 输出: [1, 2, 3, 4]