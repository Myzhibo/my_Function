// 带下标地遍历
function * enumerate (iterable) {
  let i = 0
  for (const item of iterable) {
    yield [item, i]
    i += 1
  }
}

// 倒序遍历
function * backIterate (list) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    yield list[i]
  }
}

// 遍历树
function * iterateNode (
  nodes,
  {
    level = 0,
    parent = {},
    parentItem = {},
    back = false,
    order = 'pre',
    getChildren = (n) => n.children
  } = {},
) {
  const iter = back ? backIterate(nodes) : nodes // 正向or反向
  for (const [node, index] of enumerate(iter)) {
    let stop = false
    const stopIterateChildren = () => { // 停止遍历（当前节点的）子节点
      stop = true
    }
    if (order === 'pre') { // 先序 dfs
      yield { node, index, parent, siblings: nodes, level, stopIterateChildren, parentItem }
    }
    if (!stop) { // 递归遍历子节点
      const children = getChildren(node)
      if (children && children.length) {
        yield * iterateNode(children, { level: level + 1, parent: node, back, order, getChildren, parentItem: { node, index, parent, siblings: nodes, level, stopIterateChildren, parentItem } })
      }
    }
    if (order === 'post') { // 后序 dfs
      yield { node, index, parent, siblings: nodes, level }
    }
  }
}


json = [
  {
    id: 1,
    content: '1第一层',
    children: [
      {
        id: 2,
        content: '1第二层',
        children: [
          {
            id: 3,
            content: '假如这是一个重复对象元素',
            children: [
              {
                tag: {
                  '2b86adaad': {
                    node_name: '通电导线在磁场中的作用力方向',
                    prob: 0.783,
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    content: '假如这是一个重复对象元素',
    children: [
      {
        id: 5,
        content: '2第二层',
        children: [],
      },
    ],
  },
  {
    id: 6,
    content: '3第一层',
    children: [],
  },
]
for (const {  node, index, parent, siblings: nodes, level } of iterateNode(json)){
  console.log(node);
  console.log(index);
  console.log(parent);
  console.log(nodes);
  console.log(level);
  console.log('---------------');
}

// 打平
const Anodes = [...iterateNode(json)]
console.log(Anodes);