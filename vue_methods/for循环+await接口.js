
// 循环调用 getList 函数， 并且await每次循环
async renderList () {
  async function getNewTabCount (that) {
    for await (const item of that.textTypeList) {
      await that.getList(item.name);
    }
  }
  await getNewTabCount(this);
},