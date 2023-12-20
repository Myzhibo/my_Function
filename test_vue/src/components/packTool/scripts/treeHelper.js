// 带下标地遍历
export function * enumerate (iterable) {
  let i = 0
  for (const item of iterable) {
    yield [item, i]
    i += 1
  }
}

// 倒序遍历
export function * backIterate (list) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    yield list[i]
  }
}

// 遍历树
export function * iterateNode (
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
