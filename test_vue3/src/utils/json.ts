// 带索引遍历
export function* enumerate<T>(data: Iterable<T> | ArrayLike<T>): IterableIterator<[T, number]> {
  const arr = data as ArrayLike<T>;
  if (arr.length != null) {
    for (let i = 0; i < arr.length; i += 1) {
      yield [arr[i], i];
    }
  } else {
    const iterable = data as Iterable<T>;
    let i = 0;
    for (const item of iterable) {
      yield [item, i];
      i += 1;
    }
  }
}

// 倒序遍历
export function* backIterate<T>(list: ArrayLike<T>) {
  for (let i = list.length - 1; i >= 0; i -= 1) {
    yield list[i];
  }
}

export interface IterateNodeCallbackItem<T> {
  node: T;
  index: number;
  parent?: T;
  parentItem?: IterateNodeCallbackItem<T>;
  path?: T[];
  itemPath?: IterateNodeCallbackItem<T>[];
  siblings: T[];
  level: number;
}

export interface IterateNodeCallbackParams<T> extends IterateNodeCallbackItem<T> {
  stopIterateChildren?: () => void;
}

export type IterateNodePredictor<T> = (params: IterateNodeCallbackParams<T>) => boolean;

export interface IterateNodeParams<T> {
  back?: boolean;
  order?: 'pre' | 'post';
  getChildren?: (n: T) => T[] | ArrayLike<T>;
  path?: boolean;
}

// 遍历树
export function* iterateNode<T>(
  nodes: ArrayLike<T>,
  params: IterateNodeParams<T> = {}
): IterableIterator<IterateNodeCallbackParams<T>> {
  const { back = false, order = 'pre', path = false, getChildren = n => (n as any).children } = params;

  function* helper(
    nodes: T[],
    level: number,
    parent?: T,
    parentItem?: IterateNodeCallbackItem<T>,
    path?: T[],
    itemPath?: IterateNodeCallbackItem<T>[]
  ): IterableIterator<IterateNodeCallbackParams<T>> {
    const iter = back ? backIterate(nodes) : nodes; // 正向 or 反向
    const siblings = nodes;
    for (const [node, index] of enumerate(iter)) {
      const item = { node, index, parent, parentItem, siblings, level, path, itemPath };
      const subPath = path ? path.concat([node]) : undefined;
      const subItemPath = itemPath ? itemPath.concat([item]) : undefined;
      item.path = subPath;
      item.itemPath = subItemPath;
      let stop = false;
      if (order === 'pre') {
        // 先序 dfs
        const stopIterateChildren = () => {
          // 停止遍历（当前节点的）子节点
          stop = true;
        };
        yield { ...item, stopIterateChildren };
      }
      if (!stop) {
        // 递归遍历子节点
        const subs = getChildren(node);
        if (subs && subs.length) {
          yield* helper(subs as T[], level + 1, node, item, subPath, subItemPath);
        }
      }
      if (order === 'post') {
        // 后序 dfs
        yield item;
      }
    }
  }

  yield* helper(nodes as T[], 0, undefined, undefined, path ? [] : undefined, path ? [] : undefined);
}

// 遍历叶子节点
export function* iterateLeaf<T>(nodes: ArrayLike<T>, options: IterateNodeParams<T> = {}) {
  for (const item of iterateNode(nodes, options)) {
    if (!item.parent) {
      yield item;
    }
  }
}

// 查找满足条件的节点
export function findNode<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> = {}
) {
  for (const item of iterateNode(nodes, options)) {
    if (predictor(item)) {
      return item.node;
    }
  }
}

export function findWrappedNode<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> = {}
) {
  for (const item of iterateNode(nodes, options)) {
    if (predictor(item)) {
      return item;
    }
  }
}

// 查找所有满足条件的节点
export function* findNodeIterate<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> & { stopFindChildren?: boolean } = {}
) {
  for (const item of iterateNode(nodes, options)) {
    if (predictor(item)) {
      const { stopFindChildren = true } = options;
      if (stopFindChildren) {
        // 是否再查找满足条件的节点的子节点
        item.stopIterateChildren!();
      }
      yield item.node;
    }
  }
}

// 查找所有满足条件的节点
export function findAllNodes<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> & { stopFindChildren?: boolean } = {}
) {
  return [...findNodeIterate(nodes, predictor, options)];
}

// 查找所有满足条件的节点
export function* findWrappedNodeIterate<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> & { stopFindChildren?: boolean } = {}
) {
  for (const item of iterateNode(nodes, options)) {
    if (predictor(item)) {
      const { stopFindChildren = true } = options;
      if (stopFindChildren) {
        // 是否再查找满足条件的节点的子节点
        item.stopIterateChildren!();
      }
      yield item;
    }
  }
}

// 查找所有满足条件的节点
export function findAllWrappedNodes<T>(
  nodes: ArrayLike<T>,
  predictor: IterateNodePredictor<T>,
  options: IterateNodeParams<T> & { stopFindChildren?: boolean } = {}
) {
  return [...findWrappedNodeIterate(nodes, predictor, options)];
}
