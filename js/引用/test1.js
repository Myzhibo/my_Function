/**  1. 通过引用传递 item , 直接修改 item.content.serial_number 。 原始 nodes 数组中的对象也会发生变化 */
const sortSerialNumber = (nodes) => {  
  const res = nodes?.map((item, index) => {  
    item.content.serial_number = String(index + 1);  
    return item;  
  });  
  return res;  
};


const testNode = [
  {
    id: '001',
    content: {
      serial_number: '999'
    }
  }
]

const result = sortSerialNumber(testNode);
console.log(testNode);
console.log(result);

console.log('----------------------------------------------');

/** 2. 通过创建新的对象字面量来避免直接修改原始对象。返回的数组 res 包含的是原始对象的浅拷贝，其中 serial_number 已被更新。原始 nodes 数组保持不变。 */
const sortSerialNumber2 = (nodes) => {
  const res = nodes?.map((item, index) => {
    return {
      ...item,
      content: {
        ...item.content,
        serial_number: String(index + 1)
      }
    };
  });
  return res;
};

const testNode2 = [
  {
    id: '001',
    content: {
      serial_number: '999'
    }
  }
]

const result2 = sortSerialNumber2(testNode2);
console.log(testNode2,  '  // 原来的 引用 没有改变');
console.log(result2);