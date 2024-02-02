// 将一个for循环做成异步的，等全部循环完毕再执行下面的代码

async function processArray(array) {  
  const promises = array.map((item, index) => {  
    return new Promise((resolve, reject) => {  
      // setTimeout模拟异步操作  
      setTimeout(() => {  
        console.log(`处理项 ${index}`);  
        resolve(index); // 异步操作完成后调用resolve()方法。 ## 如果不写这行代码，那么对应的 Promise 对象将不会被标记为已解决状态，其状态仍然为 "pending"。这意味着不会继续执行后续console的代码
      }, 10 * index);  
    });  
  });  
  
  // 使用Promise.all等待所有Promise都解析完成  
  await Promise.all(promises);  
  
  console.log('所有异步操作已完成');  
}  

async function main () {
  console.log('111111111111111111111111111111');
  // 将一个for循环改造成异步的
  await processArray([1, 2, 3, 4, 5]);
  console.log('222222222222222222222222222222');
}

main();