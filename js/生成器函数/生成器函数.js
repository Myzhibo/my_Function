function* backIterate(list) {
  // 使用 for 循环从列表的末尾开始迭代
  for (let i = list.length - 1; i >= 0; i -= 1) {
    // 在每次迭代中，yield 当前索引的元素给调用者
    // 然后暂停执行，等待下一次被调用
    yield list[i]
  }
}

let iterator = backIterate([1, 2, 3, 4, 5]);

// 迭代并获取值
console.log(iterator.next());  // { value: 5, done: false }
console.log(iterator.next());  // { value: 4, done: false }
console.log(iterator.next());  // { value: 3, done: false }
console.log(iterator.next());  // { value: 2, done: false }
console.log(iterator.next());  // { value: 1, done: false }
console.log(iterator.next());  // { value: undefined, done: true }

// 当你完成迭代后，next() 方法会返回一个 {done: true} 的对象
console.log(iterator.next().done);  // 输出 true