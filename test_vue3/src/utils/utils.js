async function asyncPool(poolLimit, array, iteratorFn) {
  // 最终传给 Promise.all
  const ret = [];
  // 正在执行的任务 -就是还没有被解决的 Promise 数组, 这里的 Promise 处于 pending 状态 -限制最大数量就靠它了
  const executing = [];

  // ES6 迭代 -数组可被 `for of` 迭代, 对象不可以
  for (const item of array) {
    // 每次迭代 都向结果 push 新的 Promise  至于为什么又套了一层 Promise.resolve(), 是为了防止使用的时候没有传入 Promise 导致后续代码执行错误
    const p = Promise.resolve().then(() => iteratorFn(item, array));
    ret.push(p);

    // 限制并发的逻辑
    if (poolLimit <= array.length) {
      /*
                在 then 的回调函数中, 当这个 Promise 被解决后, 由 pending 变为 fulfilled
                已经拿到了服务端数据, 就删除该 Promise，腾出地方添加下一个 Promise，始终保持 executing 内有两个元素
                then 的回调是异步, 别认为 `splice` 在 `executing.push(e)` 的上边很奇怪

                // 感觉这样写也可以呢，为什么要又定义一个变量 e 呢
                p.then(() => executing.splice(executing.indexOf(p), 1))
                executing.push(p)
            */
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);

      /*
                当正在执行的任务到达限制数量的时候, 利用 await 等待执行
                Promise.race 的作用: 假如 poolLimit 是 2, executing 的任务有任意一个被解决,
                Promise.race 就是 fulfilled 状态, 之后进入第 3 次 for 循环
            */
      if (executing.length >= poolLimit) {
        await Promise.race(executing);
      }
    }
  }
  // 最后按顺序返回结果
  return Promise.all(ret);
}

export { asyncPool };
