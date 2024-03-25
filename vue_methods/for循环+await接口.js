
// 循环调用 异步的 getList 函数， 并且await每次循环
async renderList () {
  async function getNewTabCount (that) {
    for await (const item of that.textTypeList) {
      await that.getList(item.name);                  // getList是个异步函数，里面有调用接口的操作
    }
  }
  await getNewTabCount(this);
},