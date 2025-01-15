let MyObj = [
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
            content: '1级第三层',
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
    content: '2第一层',
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

const flatData = (obj, parentId = undefined) => {
  return obj.reduce((prev, curr) => {
    if (parentId !== undefined) {
      Object.assign(curr, {
        parentId: parentId,
      })
    }
    prev.push(curr)
    if (curr.children?.length > 0) {
      prev.push(...flatData(curr.children, curr.id))
    }
    return prev
  }, [])
}

let flated = flatData(MyObj)
console.log(flated)
