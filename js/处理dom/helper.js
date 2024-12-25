/* eslint-env browser */
window.utils = (function () {
  /**
   * @typedef {{
   *   level?: number,
   *   parent?: T,
   *   order?: 'pre' | 'post',
   *   back?: boolean,
   *   path?: boolean | T[],
   *   getChildren?: (T): (T[] | ArrayLike<T>),
   * }} IIterateNodeParams
   * @template T
   */

  /**
   * @typedef {{
   *   node: T,
   *   index: number,
   *   parent?: number,
   *   path?: T[],
   *   siblings: T[],
   *   level: number,
   *   stopIterateChildren?: function(): void,
   * }} IIterateNodeCallbackParams
   * @template T
   */
  /**
   * 遍历树
   * @generator
   * @param {ArrayLike<T>|T[]|HTMLCollection} nodes 目标树
   * @param {IIterateNodeParams<T>} [options] 遍历参数
   * @yields {IIterateNodeCallbackParams<T>} 每个节点信息
   * @template T
   */
  function* iterateNode(
    nodes,
    options = {},
  ) {
    const {
      level = 0,
      parent,
      order = 'pre',
      path = false,
      back = false,
      getChildren = (n) => n.children,
    } = options;
    const siblings = Array.prototype.slice.call(nodes, 0);
    if (back) siblings.reverse();
    let index = 0;
    for (const node of siblings) {
      const subPath = path ? (Array.isArray(path) ? (/** @type Array */path).concat([node]) : [node]) : false;
      let stop = false;
      if (order === 'pre') { // 先序 dfs
        const stopIterateChildren = () => { // 停止遍历（当前节点的）子节点
          stop = true;
        };
        yield { node, index, parent, path: subPath || undefined, siblings, level, stopIterateChildren };
      }
      if (!stop) { // 递归遍历子节点
        const subs = getChildren(node);
        if (subs && subs.length) {
          yield* iterateNode(subs, { level: level + 1, parent: node, path: subPath, order, back, getChildren });
        }
      }
      if (order === 'post') { // 后序 dfs
        yield { node, index, parent, path: subPath || undefined, siblings, level };
      }
      index++;
    }
  }

  /**
   * @typedef {function (param: IIterateNodeCallbackParams<T>): boolean} IIterateNodePredictor
   * @template T
   */
  /**
   * 查找所有满足条件的节点
   * @param {ArrayLike<T>|T[]|HTMLCollection} nodes 目标树
   * @param {IIterateNodePredictor<T>} predictor 条件回调
   * @param {IIterateNodeParams<T> & { stopFindChildren?: boolean }} options 遍历参数
   * @yields {T}
   * @template T
   */
  function* findNodeIterate(
    nodes,
    predictor,
    options = {},
  ) {
    for (const item of iterateNode(nodes, options)) {
      if (predictor(item)) {
        const { stopFindChildren = true } = options;
        if (stopFindChildren) { // 是否再查找满足条件的节点的子节点
          item.stopIterateChildren();
        }
        yield item.node;
      }
    }
  }

  function* findWrappedNodeIterate(
    nodes,
    predictor,
    options = {},
  ) {
    for (const item of iterateNode(nodes, options)) {
      if (predictor(item)) {
        const { stopFindChildren = false } = options;
        if (stopFindChildren) { // 是否再查找满足条件的节点的子节点
          item.stopIterateChildren();
        }
        yield item;
      }
    }
  }

  function findAllNodes(nodes, predictor, options = {}) {
    options = options || {};
    if (options.stopFindChildren === undefined) {
      options.stopFindChildren = false;
    }
    return [...findNodeIterate(nodes, predictor, options)];
  }

  function findAllWrappedNodes(nodes, predictor, options = {}) {
    return [...findWrappedNodeIterate(nodes, predictor, options)];
  }

  function findParentNode($node, callback) {
    if (!$node) {
      return null;
    }
    let $parentNode = $node.parentElement;
    while ($parentNode) {
      if (callback($parentNode)) {
        break;
      }
      $parentNode = $parentNode.parentElement;
    }
    return $parentNode;
  }

  /**
   * 查找一个满足条件的节点
   * @param {ArrayLike<T>|T[]|HTMLCollection} nodes 目标树
   * @param {IIterateNodePredictor<T>} predictor 条件回调
   * @param {IIterateNodeParams<T>} options 遍历参数
   * @return {T} 查找到的节点
   * @template T
   */
  function findNode(
    nodes,
    predictor,
    options = {},
  ) {
    for (const item of iterateNode(nodes, options)) {
      if (predictor(item)) {
        return item.node;
      }
    }
  }

  /**
   * 判断节点是否为文本节点
   * @param {Node} node 目标节点
   * @return {boolean} node is {Text}
   */
  function isText(node) {
    return node && node.nodeType === Node.TEXT_NODE;
  }

  /**
   * 判断节点是否为公式节点
   * @param {Node} node 目标节点
   * @return {boolean} node is {Latex}
   */
  function isLatex(node) {
    return node && node.dataset?.label === 'latex' && node.dataset?.latexId;
  }

  /**
   * 判断节点是否为元素节点
   * @param {Node} node 目标节点
   * @return {boolean} node is {HTMLElement}
   */
  function isElement(node) {
    return node && node.nodeType === Node.ELEMENT_NODE;
  }

  /**
   * 设置延迟
   * @param {number} timeout 毫秒
   * @return {Promise<void>} 使用then或await等待
   */
  function sleep(timeout) {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  /**
   * 最小值的项
   * @param {(T)[]}arr 目标数组
   * @param {string|function(T, number):V}[key] 属性名或回调
   * @param {function(V, V): boolean} [isLt] 比较函数
   * @return {T|undefined} 最小值的项
   * @template T
   * @template V
   */
  function min(arr, key, isLt) {
    const len = arr.length;

    function get(i) {
      if (len <= i) return;
      const item = arr[i];
      return key ? (typeof key === 'function' ? key(item, i) : item[key]) : item;
    }

    let m = get(0);
    let r = arr[0];
    for (let i = 1; i < len; i++) {
      const v = get(i);
      if (isLt ? isLt(v, m) : v < m) {
        m = v;
        r = arr[i];
      }
    }
    return r;
  }

  /**
   * 最小值
   * @param {(number|T)[]}arr 目标数组
   * @param {string|function(T, number):V}[key] 属性名或回调
   * @param {function(V, V): boolean} [isLt] 比较函数
   * @return {number|V|undefined} 最小值
   * @template T
   * @template V
   */
  function minBy(arr, key, isLt) {
    const len = arr.length;

    function get(i) {
      if (len <= i) return;
      const item = arr[i];
      return key ? (typeof key === 'function' ? key(item, i) : item[key]) : item;
    }

    let m = get(0);
    for (let i = 1; i < len; i++) {
      const v = get(i);
      if (isLt ? isLt(v, m) : v < m) m = v;
    }
    return m;
  }

  /**
   * 最大值的项
   * @param {(T)[]}arr 目标数组
   * @param {string|function(T, number):V}[key] 属性名或回调
   * @param {function(V, V): boolean} [isGt] 比较函数
   * @return {T|undefined} 最大值的项
   * @template T
   * @template V
   */
  function max(arr, key, isGt) {
    const len = arr.length;

    function get(i) {
      if (len <= i) return;
      const item = arr[i];
      return key ? (typeof key === 'function' ? key(item, i) : item[key]) : item;
    }

    let m = get(0);
    let r = arr[0];
    for (let i = 1; i < len; i++) {
      const v = get(i);
      if (isGt ? isGt(v, m) : v > m) {
        m = v;
        r = arr[i];
      }
    }
    return r;
  }

  /**
   * 最大值
   * @param {(number|T)[]}arr 目标数组
   * @param {string|function(T, number):V}[key] 属性名或回调
   * @param {function(V, V): boolean} [isGt] 比较函数
   * @return {number|V|undefined} 最大值
   * @template T
   * @template V
   */
  function maxBy(arr, key, isGt) {
    const len = arr.length;

    function get(i) {
      if (len <= i) return;
      const item = arr[i];
      return key ? (typeof key === 'function' ? key(item, i) : item[key]) : item;
    }

    let m = get(0);
    for (let i = 1; i < len; i++) {
      const v = get(i);
      if (isGt ? isGt(v, m) : v > m) m = v;
    }
    return m;
  }

  /**
   * 求和
   * @param {ArrayLike<number|T>|(number|T)[]}arr 目标数组
   * @param {string|function(T, number):number}[key] 属性名或回调
   * @return {number} 和
   * @template T
   */
  function sum(arr, key) {
    let s = 0;
    for (let i = 0, len = arr.length; i < len; i++) {
      const item = arr[i];
      s += key ? (typeof key === 'function' ? key(item, i) : item[key]) : item;
    }
    return s;
  }

  const hasOwnProperty = Object.prototype.hasOwnProperty;

  /**
   * @param {Object} val 目标对象
   * @param {string} key 属性名
   * @return {boolean} 对象是否包含属性
   */
  function hasOwn(val, key) {
    return hasOwnProperty.call(val, key);
  }

  /**
   * @param {*} a 比较值a
   * @param {*} b 比较值b
   * @return {boolean} 是否深度相等
   */
  function isEqual(a, b) {
    if (a === b) return true;
    if (!a || !b) return false;
    const ta = typeof a;
    const tb = typeof b;
    if (ta !== tb || ta !== 'object') return false;
    const aIsA = Array.isArray(a);
    const bIsA = Array.isArray(b);
    if (aIsA || bIsA) return false;
    if (aIsA && bIsA) {
      if (a.length !== b.length) return false;
      return a.every((aV, i) => isEqual(aV, b[i]));
    }
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) return false;
    if (aKeys.some(aK => !hasOwn(b, aK))) return false;
    return aKeys.every(k => isEqual(a[k], b[k]));
  }

  /**
   * 加载字体
   * @param {*} fonts document.fonts 字体对象
   * @return {Promise<*>} 加载完成或失败
   */
  function loadFonts(fonts) {
    if (!fonts) return Promise.resolve();
    if (fonts.ready) return fonts.ready;
    const promises = [];
    fonts.forEach((fontFace) => { // fonts is not array
      if (fontFace.status !== 'loaded') {
        promises.push(fontFace.load().catch(() => {
          // ignore error
        }));
      }
    });
    return Promise.all(promises);
  }

  /**
   * 加载图片
   * @param {ArrayLike<HTMLImageElement>} images 图片元素
   * @return {Promise<*>} 加载完成或失败
   */
  function loadImages(images) {
    const promises = Array.prototype.slice.call(images, 0).map(/** @type HTMLImageElement */ image => {
      const src_ = image.getAttribute('src');
      if (!src_ || (!src_.includes(';base64,') && !/^http/.test(src_))) {
        image.setAttribute('load-image', 'failed');
        return Promise.resolve();
      }
      if (image.complete !== true) {
        return new Promise(resolve => {
          image.onload = () => {
            image.setAttribute('load-image', 'successed');
            resolve();
          };
          image.onerror = () => {
            image.setAttribute('load-image', 'failed');
            resolve();
          };
        });
      }
      image.setAttribute('load-image', 'complete');
    });
    return Promise.all(promises);
  }

  /**
   * 移除对象的空属性（修改原对象）
   * @param {T} d 目标对象
   * @param {string} keys 属性名
   * @return {T} 移除空属性后的原对象
   * @template T
   */
  function removePropIfEmpty(d, ...keys) {
    if (!d) return d;
    const props = keys.length ? keys : Object.keys(d);
    props.forEach(key => {
      const v = removeIfEmpty(d[key]);
      if (v === undefined) {
        delete d[key];
      }
    });
    return d;
  }

  /**
   * 递归地移除对象的所有空属性。（深度拷贝，不修改原对象）
   * @param {T} d 目标对象
   * @return {T|undefined} 移除空属性后的新对象
   * @template T
   */
  function removeIfEmpty(d) {
    if (d === undefined) return;
    if (!d || typeof d !== 'object') return d;
    if (Array.isArray(d)) {
      const res = d.map(i => removeIfEmpty(i)).filter(i => i !== undefined);
      if (!res.length) return;
      return res;
    }
    const entities = [];
    Object.keys(d).forEach(k => {
      const v = removeIfEmpty(d[k]);
      if (v === undefined) return;
      entities.push([k, v]);
    });
    if (!entities.length) return;
    const res = {};
    entities.forEach(([k, v]) => {
      res[k] = v;
    });
    return res;
  }

  /**
   * 合并对象（可能会深度克隆，也可能不会）
   * @param {T} args 目标对象
   * @return {T} 合并后对象
   * @template T
   */
  function merge(...args) {
    if (args.length < 2) return args[0];
    if (args.length === 2) {
      const [obj, other] = args;
      if (!obj || !other) return other;
      if (typeof obj !== typeof other) return other;
      if (Array.isArray(obj) || Array.isArray(other)) return other;
      if (typeof obj !== 'object') return other;
      const res = {};
      Object.keys(obj).forEach(key => {
        if (!hasOwn(other, key)) {
          res[key] = obj[key];
        } else {
          res[key] = merge(obj[key], other[key]);
        }
      });
      Object.keys(other).forEach(key => {
        if (!hasOwn(obj, key)) {
          res[key] = other[key];
        }
      });
      return res;
    }
    const [obj, other, ...rest] = args;
    let res = merge(obj, other);
    for (const arg of rest) {
      res = merge(res, arg);
    }
    return res;
  }

  /**
   * 格式dom中的公式
   * @param {HTMLElement} page 目标元素
   */
  function formatLatex(page) {
    for (const item of iterateNode(page.children)) {
      if (item.node.dataset.label === 'latex') {
        item.node.parentElement.replaceChild(document.createTextNode(`$$${item.node.dataset.value}$$`), item.node);
        item.stopIterateChildren();
      }
    }
  }

  const units = {
    pt: 400 / 3,
    px: 100,
    mm: 48000 / 127,
    cm: 480000 / 127,
    in: 9600,
    inc: 9600,
    inch: 9600,
  };

  /**
   * 单位转换
   * 如果单位为%，则不进行任何转换，原样返回
   * 原始单位可以包含在值中，如value='10px', 表示value=10 fromType='px'
   * 原始单位默认为'px'
   * @param  {number|string} value 值
   * @param {'px' | 'mm' | 'inc' | 'pt' | '%' | string | undefined} fromType 原始单位
   * @param {'px' | 'mm' | 'inc' | 'pt' | '%' | string} toType 目标单位
   * @return {number|string|undefined} 单位转换后的值
   */
  function unitConvert(value, fromType, toType) {
    if (!value) return value;
    if (fromType === toType || fromType === '%' || toType === '%') return value;
    fromType = fromType || 'px';
    if (typeof value === 'string') {
      const match = value.match(/^([+\-]?((\d+\.?\d*)|(\d*\.?\d+)))(pt|px|mm|cm|in|inch?|%)?$/);
      if (!match) return;
      value = match[1];
      fromType = match[5] || fromType;
      if (fromType === '%') return value + fromType;
      if (fromType === toType) return +value;
    }
    if (!units[toType] || !units[fromType]) return;
    return value * units[fromType] / units[toType];
  }

  /**
   * @param {string} body 富文本
   * @param {Object} opt 参数
   * @param {number} [opt.size=2] 空格大小
   * @return {string} 富文本
   */
  function formatBodyBlank(body, { size = 2, spaceChar = '&nbsp;' } = {}) {
    const result = `${body}`.replace(
      /<(\w+) ([^>]*?data-label="blank"[^>]*?)>([\s\S]*?)<\/\1>/g,
      (match, _tag, attrs, content) => {
        if (content && !/^(&nbsp;|&emsp;|\s)*$/.test(content)) return match;
        const countMatch = attrs.match(/data-blank-length="(\d+)"/);
        const count = countMatch ? +countMatch[1] : undefined;
        if (!count) return match;
        const spaceContent = spaceChar.repeat(count * size);
        return `<span ${attrs}>${spaceContent}</span>`;
      },
    );
    return result;
  }

  /**
   * @param {string} body 富文本
   * @return {string} 富文本
   */
  function addBodyBracket(body) {
    const result = `${body}`.replace(/(<span [^>]*?data-label="bracket"[^>]*?>)([\s\S]*?)(<\/span>)/g, '$1(&nbsp;$2&nbsp;)$3');
    return result;
  }

  /**
   * 排序
   * @param {T[]} arr 数组
   * @param {function(T, number): any} v 比较值
   * @return {T[]} 排序后数组
   * @template T
   */
  function orderBy(arr, v) {
    return arr.map((item, index) => ({ item, index, v: v(item, index) }))
      .sort((a, b) => {
        if (a.v < b.v) return -1;
        if (a.v > b.v) return 1;
        return a.index - b.index;
      })
      .map(d => d.item);
  }

  /**
   * 最大公约数
   * @param {number} a 整数
   * @param {number} b 整数
   * @return {number} 最大公约数
   */
  function gcd(a, b) {
    [a, b] = [Math.floor(a), Math.floor(b)];
    while (b) [a, b] = [b, a % b];
    return a;
  }

  /**
   * @param {number} n 数字
   * @param {number} [d] 精度
   * @return {number} 数字
   */
  function round(n, d) {
    if (!d) return n;
    if (d === 1) return Math.round(n);
    return Math.round(n * d) / d;
  }

  /**
   * @param {number} n 数字
   * @param {number} [d] 精度
   * @return {number} 数字
   */
  function ceil(n, d) {
    if (!d) return n;
    if (d === 1) return Math.ceil(n);
    return Math.ceil(n * d) / d;
  }

  /**
   * @param {number} n 数字
   * @param {number} [d] 精度
   * @return {number} 数字
   */
  function floor(n, d) {
    if (!d) return n;
    if (d === 1) return Math.floor(n);
    return Math.floor(n * d) / d;
  }

  /**
   * 分页数据
   * @param {T[] | ArrayLike<T>} a 数组
   * @param {number} size 每组个数
   * @yields {T[]} 每组元素
   * @template T
   */
  function* chunk(a, size) {
    const arr = Array.from(a);
    const total = arr.length;
    for (let i = 0, m = Math.floor((total + size - 1) / size); i < m; i++) {
      const [start, end] = [i * size, Math.min((i + 1) * size, total)];
      yield arr.slice(start, end);
    }
  }

  /**
   * @param {HTMLElement} el 元素
   * @param {string} selector 选择器
   * @return {HTMLElement[]} 结果
   */
  function query(el, selector) {
    return el ? /** @type HTMLElement[]*/Array.from(el.querySelectorAll(selector)) : [];
  }

  /**
   * @param {Element} el 元素
   * @return {HTMLElement[]} 子元素
   */
  function getChildren(el) {
    return el ? /** @type HTMLElement[]*/Array.from(el.children) : [];
  }

  /**
   *
   * @param {HTMLElement} el 元素
   * @param {number} index 坐标
   * @return {HTMLElement} 子元素
   */
  function getChild(el, index) {
    return el ? /** @type HTMLElement*/el.children[index] : undefined;
  }

  /**
   * @typedef {{x: number, y: number, w: number, h: number}} IRect
   */
  /**
   * @param {Text|HTMLElement} element 目标元素
   * @param {Range} [range] Range 对象
   * @return {IRect|undefined} 位置大小对象
   */
  function getRect(element, range = document.createRange()) {
    const { x, y, width, height } = getBoundingClientRect(element, range);
    if (!width) return;
    return { x, y, w: width, h: height, bottom: y + height, top: y };
  }

  /**
   * @typedef {{x: number, y: number, w: number, h: number}} IRect
   */
  /**
   * @param {Text|HTMLElement} element 目标元素
   * @param {Range} [range] Range 对象
   * @return {IRect|undefined} 位置大小对象
   */
  function getRect2(element, range = document.createRange()) {
    const { x, y, width, height } = getBoundingClientRect(element, range);
    return { x, y, w: width, h: height };
  }

  /**
   * @param {Text|HTMLElement} element 目标元素
   * @param {Range} [range] Range 对象
   * @return {DOMRect} 位置大小对象
   */
  function getBoundingClientRect(element, range = document.createRange()) {
    try {
      if (element.getBoundingClientRect) {
        return element.getBoundingClientRect();
      }
      range.selectNode(element);
      return range.getBoundingClientRect();
    } catch (e) {
      return {};
    }
  }

  const getDomsRect = (doms) => {
    const rects = doms.map(d => getRect(d)).filter(r => !!r);
    if (!rects.length) {
      return;
    }
    const top = Math.min(...rects.map(r => r.y));
    const left = Math.min(...rects.map(r => r.x));
    const right = Math.max(...rects.map(r => r.x + r.w));
    const bottom = Math.max(...rects.map(r => r.y + r.h));
    const width = right - left;
    const height = bottom - top;
    return { x: left, y: top, w: width, h: height, top, left, right, bottom, width, height };
  };

  /**
   * 合并多位置大小对象
   * @param {IRect[]} rects 位置大小对象
   * @return {IRect | undefined} 合并后的位置大小对象
   */
  function mergeRect(rects) {
    rects = rects.filter(r => r);
    if (!rects.length) return;
    // @tips：兼容可能出现 undefined 的情况。
    let left = minBy(rects, r => r.x !== undefined ? r.x : Infinity);
    let top = minBy(rects, r => r.y !== undefined ? r.y : Infinity);
    let right = maxBy(rects, r => (r.x !== undefined && r.w !== undefined) ? (r.x + r.w) : -Infinity);
    let bottom = maxBy(rects, r => (r.y !== undefined && r.h !== undefined) ? (r.y + r.h) : -Infinity);
    if (left === Infinity) left = undefined;
    if (top === Infinity) top = undefined;
    if (right === -Infinity) right = undefined;
    if (bottom === -Infinity) bottom = undefined;
    const x = left;
    const y = top;
    let w = undefined;
    if (right - left > 0) w = right - left;
    let h = undefined;
    if (bottom - top > 0) h = bottom - top;
    return { x, y, w, h };
  }

  /**
   * @param {HTMLElement} e 元素
   */
  function trimNode(e) {
    for (const item of iterateNode(e.childNodes, { getChildren: n => n.childNodes })) {
      if (isText(item.node)) {
        item.node.textContent = item.node.textContent.replace(/^\s+/, '');
        if (item.node.textContent) break;
      } else if (item.node.tagName === 'IMG') {
        break;
      }
    }
    for (const item of iterateNode(e.childNodes, { getChildren: n => n.childNodes, back: true })) {
      if (isText(item.node)) {
        item.node.textContent = item.node.textContent.replace(/\s+$/, '');
        if (item.node.textContent) break;
      } else if (item.node.tagName === 'IMG') {
        break;
      }
    }
  }

  /**
   * @param {HTMLElement} e 元素
   * @param {string} p 样式字段
   * @return {string} 值
   */
  function getStyle(e, p) {
    while (e) {
      if (e.dataset?.[p]) {
        return e.dataset[p];
      }
      if (e.style?.[p]) {
        return e.style[p];
      }
      e = e.parentElement;
    }
  }

  function getImageSize(src) {
    return new Promise(resolve => {
      if (!src) {
        resolve([0, 0]);
      }
      const $img = new Image();
      $img.src = src;
      $img.onload = function () {
        resolve([$img.width, $img.height]);
      };
      $img.onerror = function () {
        resolve([0, 0]);
      }
    });
  }

  function parseColor(c) {
    const color = c.replace(/\s+/g, '');
    const match = color.match(/rgba?\((\d+),(\d+),(\d+)(,(\d+))?\)/);
    if (match) {
      const [, r, g, b] = match;
      return [r, g, b].map(i => (+i).toString(16).padStart(2, '0')).join('');
    } else if (/^#?[\da-f]{6}$/.test(c)) {
      return c.replace(/^#/g, '');
    } else if (/^#?[\da-f]{3}$/.test(c)) {
      return c.replace(/^#/g, '').split('').map(i => i + i).join('');
    }
    return undefined;
  }

  /**
   * 计算公式的实际尺寸
   * @param {*} $formula
   * @returns
   */
  function computeFormulaRect($formula) {
    let minY = -1;
    let maxY = -1;
    let minX = -1;
    let maxX = -1;
    for (const item of iterateNode([$formula])) {
      const rect = getRect(item.node);
      if (!rect) {
        continue;
      }
      const { x, y, w, h } = rect;
      if (h <= 0) {
        continue;
      }
      if (minY === -1 || y < minY) {
        minY = y;
      }
      if (maxY === -1 || y + h > maxY) {
        maxY = y + h;
      }
      if (minX === -1 || x < minX) {
        minX = x;
      }
      if (maxX === -1 || x + w > maxX) {
        maxX = x + w;
      }
    }
    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
    };
  }

  /**
   * 计算答案的展开尺寸
   * @param {HTMLElement} $node
   * @returns
   */
  function getExpandedRect(node) {
    let w = 0;
    let h = 0;
    if (!node) {
      return { w, h };
    }
    const originDisplay = window.getComputedStyle(node).display;
    const originWhiteSpace = window.getComputedStyle(node).display.whiteSpace || 'normal';
    const originWidth = node.style.width || 'auto';
    node.style.display = 'block';
    node.style.whiteSpace = 'nowrap';
    node.style.width = '10000px';
    w = getDomsRect([...node.childNodes])?.w;
    h = getRect(node)?.h;
    node.style.display = originDisplay;
    node.style.whiteSpace = originWhiteSpace;
    node.style.width = originWidth;
    return { w, h };
  }

  /**
     * 估算节点的行数
     * @param {*} node
     * @returns
     */
  const computeLineCount = (node) => {
    const content = findNode(
      [node],
      item => isElement(item.node) && !['DIV', 'SECTION'].includes(item.node.tagName),
    );
    if (!content) {
      return 1;
    }
    const rect = getRect(node);
    if (!rect) {
      return 1;
    }
    const { h } = rect;
    const { lineHeight } = window.getComputedStyle(content);
    return Math.round(Math.round(h) / Math.round(parseFloat(lineHeight)));
  };

  const computeImageAreaFontCount = $img => {
    return ($img.offsetWidth * $img.offsetHeight) / Math.pow(parseFloat(getComputedStyle($img).fontSize), 2);
  };

  /**
   * block 转为 inline
   * @param {string} html 富文本
   * @return {string} 富文本
   */
  function convertBlockToInline(html) {
    return html.replace(/<(p|section|div)([^>]*)>/g, '<span$2>')
      .replace(/<\/(p|section|div)>/g, '</span>')
      .replace(/indent-\d+/g, '') // 删除缩进, 行内元素不应该有缩进
      .replace(/seg-point="seg"/g, '') // 删除 seg-point, 行内元素不应该有分页
      .replace(/text-align:center;?/g, '') // 行内元素去掉居中
      .replace(/align-center?/g, '') // 去除居中的 class 样式
  }

  /**
   * 判断图片是否较小
   * @param {HTMLElement} img 图片
   * @return {boolean}
   */
  function isSmallImage(img) {
    // - 过滤掉例如：一些行内的某段字的截图
    // - 图片有图说认为不需要过滤
    if (img.dataset.imageTip) return false;
    const { height: rectHeight, width: rectWidth } = img.getBoundingClientRect();
    const fontSize = unitConvert(getStyle(img, 'fontSize'), undefined, 'px');
    const lineHeight = getStyle(img, 'lineHeight');
    const E = 1.3;
    if (rectHeight * rectWidth > fontSize * fontSize * 10) { // 调整一下阈值
      return false;
    }
    if (rectHeight < fontSize * lineHeight * 1.2 * E || rectWidth < fontSize * 2 * E) {
      return true;
    }
    return false;
  }

  /**
   * 判断图片是否是块级图片
   * @param {HTMLElement} img 图片
   * @return {boolean}
   */
  function isBlockImage(node) {
    // - 有序号的图片认为是行内
    if (
      node.previousElementSibling &&
      node.previousElementSibling.tagName === 'SPAN' &&
      !node.previousElementSibling.dataset.imageTip &&
      /\d.\s*/.test(node.previousElementSibling.innerText)
    ) {
      return false;
    }
    // - 答案的图片认为是行内
    if (findParentNode(node, n => n.dataset?._label === 'answer-block')) {
      return false;
    }
    // - 有图说容器的图片认为是行内
    if (node.parentElement?.classList.contains('image-tip-container')) {
      return false;
    }
    // - 有图说的图片认为是块级
    if (node.dataset?.imageTip) {
      return true;
    }
    // - 该节点没有兄弟节点
    // - 该节点的祖先节点是行内元素，但是祖先节点存在兄弟节点，并且兄弟节点是块级元素
    if (
      ((!node.nextElementSibling && !node.nextSibling) || node.nextElementSibling?.nodeName === 'BR') &&
      ((!node.previousElementSibling && !node.previousSibling) || node.previousElementSibling?.nodeName === 'BR')
    ) { // element、textNode
      let targetNode = node.parentElement;
      let curNode = node;
      if (!targetNode) {
        return true;
      }
      const blockTags = ['SECTION', 'P', 'TD'];
      while ( // 行内元素、子节点的个数是 1
        targetNode &&
        !blockTags.includes(targetNode.tagName) &&
        getComputedStyle(targetNode)?.display?.includes('inline') &&
        targetNode.childNodes.length === 1
      ) {
        curNode = targetNode;
        targetNode = targetNode.parentElement;
      }
      targetNode = curNode;
      if (targetNode.nextElementSibling && targetNode.nextSibling === targetNode.nextElementSibling) { // 祖先节点不是块级元素，但它的兄弟节点是块级元素
        const display = getComputedStyle(targetNode.nextElementSibling)?.display;
        if (display && !display.includes('inline')) {
          return true;
        }
      }
      if (targetNode.previousElementSibling && targetNode.previousSibling === targetNode.previousElementSibling) {
        const display = getComputedStyle(targetNode.previousElementSibling)?.display;
        if (display && !display.includes('inline')) {
          return true;
        }
      }
      if (
        (
          (
            !targetNode.nextElementSibling &&
            !targetNode.nextSibling
          ) ||
          targetNode.nextElementSibling?.nodeName === 'BR'
        ) &&
        (
          (!targetNode.previousElementSibling && !targetNode.previousSibling) ||
          targetNode.previousElementSibling?.nodeName === 'BR'
        )
      ) { // 没有兄弟节点、兄弟节点是 BR
        return true;
      }
      return false;
    }
    const is_display_not_inline_and_float_none = (node) => {
      const style = window.getComputedStyle(node);
      return !style.display.includes('inline') && style.float === 'none';
    };
    const is_section_with_prop = (node) => {
      return node.parentElement?.tagName === 'SECTION' && node.parentElement.dataset?.prop;
    };
    const is_single_child_in_p = (node) => {
      return node.parentElement?.tagName === 'P' && node.parentElement.childNodes.length === 1;
    };
    const has_no_adjacent_non_empty_text_node = (node) => {
      const isPrevTextNodeEmpty = node.previousSibling?.nodeType === 3 && node.previousSibling.nodeValue.trim() === '';
      const isNextTextNodeEmpty = node.nextSibling?.nodeType === 3 && node.nextSibling.nodeValue.trim() === '';
      return (node.previousSibling?.nodeType !== 3 || isPrevTextNodeEmpty) && (node.nextSibling?.nodeType !== 3 || isNextTextNodeEmpty);
    };
    const is_alone_or_adjacent_to_block = (node) => {
      const isNextSiblingBlock =
        !node.nextElementSibling ||
        !window.getComputedStyle(node.nextElementSibling).display.includes('inline') ||
        isImageContainer(node.nextElementSibling);
      const isPrevSiblingBlock =
        !node.previousElementSibling ||
        !window.getComputedStyle(node.previousElementSibling).display.includes('inline') ||
        isImageContainer(node.previousElementSibling);
      return node.parentElement.childNodes.length === 1 || (isNextSiblingBlock && isPrevSiblingBlock);
    };
    const is_block = (node) => {
      return is_display_not_inline_and_float_none(node) ||
        is_section_with_prop(node) ||
        is_single_child_in_p(node) ||
        (
          node.parentElement && is_display_not_inline_and_float_none(node.parentElement) &&
          has_no_adjacent_non_empty_text_node(node) &&
          is_alone_or_adjacent_to_block(node)
        );
    };
    return is_block(node);
  }

  /**
   * 找到可以进行尺寸缩放的图片列表
   * @param {*} doms
   * @returns
   */
  function findBlockImages(doms) {
    const block$imgs = [];
    doms.forEach(node => { // 整个节点同比例缩放
      block$imgs.push(...[
        ...node.querySelectorAll('img')].filter(img => canIResizeThisImage(img)),
      );
    });
    return block$imgs;
  }

  /**
   * 判断元素是否为图片容器(只含有图片, 图说和空文本节点)
   * @param {HTMLElement} element 元素
   */
  function isImageContainer(element) {
    return (
      element.childNodes.length > 0 && // 子集元素全部为 图片 或 图说 或 空文本节点
      element.querySelector('img') && // 含有图片
      [...element.childNodes].every(children =>
        (children.nodeName === 'IMG' && isBlockImage(children)) || // 图片
        (children.dataset && children.dataset?.imageTip) || // 图说
        (children.nodeType === 3 && children.nodeValue.trim() === '')) // 空文本节点
    );
  }

  /**
   * 判断节点是否是单行文本
   * @param {HTMLElement} element 元素
   */
  const checkSingleLine = node => {
    if (!['P', 'SECTION'].includes(node.tagName)) {
      return false;
    }
    return computeLineCount(node) === 1;
  };

  /**
   * 检查是否是像正文的扁图
   * @param img
   * @return {boolean}
   */
  const isLikeTextLineImage = img => {
    // 若有图说，则是false
    if (img.getAttribute('data-image-tip')) {
      return false;
    }
    return img.offsetHeight < getNormalLineHeight() * 2.1;
  };

  /**
   * 判断图片是否可以进行缩放
   * @param {*} $img
   * @returns
   */
  const canIResizeThisImage = $img => {
    // - 忽略标题图
    if (findParentNode($img, node => node.dataset.nodeType === 'chapter')) {
      return false;
    }
    // - 块级图片
    // - 很大的行内图片（那些可能应该标成块级、但是没标的行内图片，或者只有 1 行、主要内容是一张横图的情况
    if (
      isBlockImage($img) ||
      $img.getAttribute('data-display') === 'block' ||
      $img.dataset.objectLabel === 'choice_image'
    ) {
      return true;
    }
    if (
      !isLikeTextLineImage($img) && // 不是单行文本一样的图片
      computeImageAreaFontCount($img) > 100 // 面积很大
    ) {
      return true;
    }
    // @todo：不要误伤素材图。
    return false;
  };

  // - -2 超小图（文本级别
  // - -1 小图（常见的行内图
  // - 0 正常图（常见的块级图
  // - 1 大图（更大一点的图，即使是行内图也需要进行缩放的程度
  // - 2 超大图（几乎占满整个页面的图，e.g. 思维导图、一些地理图
  const checkImageSize = $img => {
    if (computeImageAreaFontCount($img) > 100) {
      return 2;
    }
    if (computeImageAreaFontCount($img) > 50) {
      return 1;
    }
    if (computeImageAreaFontCount($img) > 30) {
      return 0;
    }
    if (computeImageAreaFontCount($img) > 10) {
      return -1;
    }
    return -2;
  };

  const checkImageShape = $img => {
    // - 窄图：-2
    // - 竖图：-1
    // - 方图：0
    // - 横图：1
    // - 扁图：2
    const width = $img.offsetWidth;
    const height = $img.offsetHeight;
    if (width / height > 2.5) {
      // 扁图
      return 2;
    }
    if (width / height > 1.5) {
      // 横图
      return 1;
    }
    if (height / width > 2.5) {
      // 窄图
      return -2;
    }
    if (height / width > 1.5) {
      // 竖图
      return -1;
    }
    return 0;
  };

  /**
   * 获取所有相关的 region
   * @param nodeId
   * @return {T[]}
   */
  const get$regions = (nodeId) => {
    // 清理空节点，注意需要保留占位节点
    return [...document.querySelectorAll('section[data-region-id]')]
      .filter((n) => [n.dataset?.nodeId].includes(nodeId))
      .filter((n) => {
        if (
          !getRect(n)?.h &&
          !n.getAttribute('placeholder-img-id') &&
          n.innerText === ''
        ) {
          n.remove();
          return false;
        }
        return true;
      });
  };

  /**
   * 判断当前的图片是否是一个看起来是块级，却可以被认为是行内的图片
   * @param node 图片
   * @param params
   * @return {boolean}
   */
  const isBlockInlineImage = (node, params = {}) => {
    // - 限定一下学科：math
    // - 若存在像是正文一样的图片（单行）的图片，e.g.扁的公式
    // - 有超过 2 个面积不大、且相似的图片（块级+行内所有图片一起判断，e.g.方程组
    if (params.subject !== 'math') {
      return false;
    }
    const img$region = findParentNode(node, p => p.dataset?.regionId);
    const blockTag = img$region?.dataset?.blockTag?.split('#').shift();
    const $regions = get$regions(img$region?.dataset?.nodeId);
    let $blocks = null;
    if (blockTag) {
      $blocks = $regions.filter(r => r.dataset?.blockTag?.split('#').shift() === blockTag);
    } else { // 没有 block 就找所在的 prop
      const prop = getRegionMainProp(img$region);
      $blocks = $regions.filter(r => getRegionMainProp(r) === prop);
    }
    const $imgs = $blocks.map(r => [...r.querySelectorAll('img')]).flat();
    // - 像正文的块级图
    if (isLikeTextLineImage(node)) {
      return true;
    }
    // - 有多个面积不大、且相似的图片（块级+行内所有图片一起判断)
    const similar$imgs = $imgs.filter($img => {
      const area1 = node.offsetHeight * node.offsetWidth;
      const area2 = $img.offsetHeight * $img.offsetWidth;
      if (
        computeImageAreaFontCount($img) <= 10 &&
        (
          (area1 > area2 && area1 <= 1.5 * area2) ||
          (area1 < area2 && area1 >= area2 / 1.5) ||
          area1 === area2
        )
      ) {
        return true;
      }
      return false;
    });
    return similar$imgs.length >= 2;
  };

  /**
   * 判定图片是否是、样式为行内、但是应该当作块级图片处理的、图片
   * @param {*} $img
   * @returns
   */
  const isInlineBlockImg = ($img) => {
    let targetNode = $img.parentElement;
    let curNode = $img;
    if (!targetNode) {
      return true;
    }
    const blockTags = ['SECTION', 'P', 'TD'];
    while ( // 行内元素、子节点的个数是 1
      targetNode &&
      !blockTags.includes(targetNode.tagName) &&
      getComputedStyle(targetNode)?.display?.includes('inline') &&
      targetNode.childNodes.length === 1
    ) {
      curNode = targetNode;
      targetNode = targetNode.parentElement;
    }
    targetNode = curNode;
    return !!(
      !isSmallImage($img) &&
      !targetNode.nextSibling &&
      targetNode.previousSibling // 在段落的最后
    );
  };

  /**
   * 判断当前 node 是否只包含扁扁的图
   * @param {*} node
   * @returns
   */
  const checkFlatImage = node => {
    const $imgs = [...node.querySelectorAll('img') || []];
    if ($imgs.length > 1) {
      return false;
    }
    let $img = $imgs[0];
    if (node.tagName === 'IMG') {
      $img = node;
    }
    if (!$img) {
      return false;
    }
    const rect$img = getRect($img);
    const rect$node = getRect(node);
    if (!rect$img || !rect$img) {
      return false;
    }
    if (
      Math.abs(rect$img.y - rect$node.y) < 20 &&
      Math.abs(rect$img.bottom - rect$node.bottom) < 10 &&
      rect$img.w / rect$img.h > 3.3
    ) {
      return true;
    }
    return false;
  };

  // - 含有 b 标签的段落 -------- <b>材料一</b>
  // - xxx：-------- 例：答: 小标题
  // -【****】 -------- 例：【小标题】
  // - 1.、2. -------- 例：1.小标题
  // - 第一步： -------- 例：第一步：
  // -（1） -------- 例：(1)小标题
  // -（甲）、[甲] -------- 例：(甲)小标题
  // - ①② -------- 例：①小标题
  const rrules = [
    // @tips：样式级别的规则。

    // - 全部都是加粗样式的文本
    {
      reg: /<b>(.+)<\/b>$/,
      name: 'b_tag',
      testContent: 'html',
      type: 'style',
      checker: node => {
        if (/<b>(.+)<\/b>$/.test(node.innerHTML.trim())) {
          return true;
        }
        const $clone = node.cloneNode(true);
        [...$clone.querySelectorAll('B')].forEach(b => b.remove());
        if ($clone.querySelector('IMG') || $clone.querySelector('TABLE')) {
          return false;
        }
        if (!$clone.innerText.trim()) {
          return true;
        }
        return false;
      },
    },
    // - 全部都是特别颜色的文本
    {
      reg: /<span[^<>]*inline_color[^<>]*>(.+)<\/span>$/,
      name: 'inline_color',
      testContent: 'html',
      type: 'style',
      checker: node => {
        if (/<span[^<>]*inline_color[^<>]*>(.+)<\/span>$/.test(node.innerHTML.trim())) {
          return true;
        }
        const $clone = node.cloneNode(true);
        [...$clone.querySelectorAll('[data-label="inline_color"]')].forEach(span => span.remove());
        if ($clone.querySelector('IMG') || $clone.querySelector('TABLE')) {
          return false;
        }
        if (!$clone.innerText.trim()) {
          return true;
        }
        return false;
      },
    },
    // - 不包含“答案”“解析”关键词的、包含 B 标签的文本，并且通常在加粗文本后面还有其他内容（e.g. 材料一 xxxxx，史料2 xxxxx
    { reg: /<b>((?!(答案|解析)).)+<\/b>(.+)/, name: 'b_tag2', testContent: 'html', type: 'style' },
    // - <b>朱德：<\/b>①定出自习读书计划
    // { reg: /^\s*<b>[^:：]{2,10}[:：](.*)<\/b>(.+)/, name: 'b_tag2', testContent: 'html' },

    // @tips：结构级别的规则。

    // - 知识点/步骤类
    { reg: /^◆/, name: '◆', testContent: 'text', type: 'struct' },
    { reg: /^第[一二三四五六七八九]步?(:|：|,|，)/, name: 'step', testContent: 'text', type: 'struct' },
    { reg: /^任务[一二三四五六七八九](:|：)/, name: 'mission', testContent: 'text', type: 'struct' },
    {
      reg: /^([A-Z])\./,
      name: 'letter_dot',
      testContent: 'text',
      type: 'struct',
      checker: node => /^[A-Z]\./.test(node.innerText) && node.innerText.match(/[A-Z]\./g).length < 2, // 不要误伤形似选项的文本
    },
    { reg: /^(（|\()( )?[i]+( )?(）|\))/, name: 'i_bracket', testContent: 'text', type: 'struct' },

    // - 题号类
    { reg: /^([ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩⅪⅫ])\./, name: 'roman_number_dot', testContent: 'text', type: 'struct' },
    { reg: /^((.{1,10})(:|：))?(（|\()(\d)(）|\))/, name: 'number_bracket', testContent: 'text', type: 'struct' },
    { reg: /^(\d{1,3})(\.|°)[^\d]/, name: 'number_dot', testContent: 'text', type: 'struct' },
    // - “故xxxxx”更像是解析里的结论，不要误伤
    // - "xxxx①②xxxx"更像是答案序号，不要误伤
    { reg: /^(([^故].{1,10})(:|：))?([①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳])([^①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳㉑㉒㉓㉔㉕㉖㉗㉘㉙㉚㉛㉜㉝㉞㉟㊱㊲㊳]+)/, name: 'serial_number', testContent: 'text', type: 'struct' },
    { reg: /^(材料|方案|方法|实验)[一二三四五六七八九]/, name: 'material_number', testContent: 'text', type: 'struct' },

    // - 小标题类
    { reg: /^[一二三四五六七八九]\、/, name: 'cn_number', testContent: 'text', type: 'struct' },
    { reg: /^\s*考点[一二三四五六七八九]/, name: 'cn_number', testContent: 'text', type: 'struct' },
    // - (二)气候特征
    { reg: /^(（|\(|\[|［)[甲乙丙丁一二三四五六七八九](）|\)|\]|］)/, name: 'string_bracket', testContent: 'text', type: 'struct' },
    { reg: /^【(分析与思考)】$/, name: 'sub_title', testContent: 'text', type: 'struct' },
    { reg: /^(知识归纳|知识拓展|辨析比较|图解历史|概念阐释|方法指导)/, name: 'sub_title', testContent: 'text', type: 'struct' },

    // - 语义化 block 的边界类
    { reg: /^Dear(.+)\,$/, name: 'dear_comma', testContent: 'text', type: 'struct' },
    // e.g. "【解析】"单独一行不可以被单独分页的 case
    // http://publish.hexinedu.com/api/third/task/get/info?task_type=word_ppt&ticket_id=66126b21ac78adc012ddbf4b
    { reg: /^(\[|【)(答案|解析)(\]|】)/, name: '答案解析', testContent: 'text', type: 'struct' },
    { reg: /^(答案|解析|答)[\:\：]/, name: '答案解析', testContent: 'text', type: 'struct' },
    // - “示例：”，“示例”
    // - 包含标点符号的可能是语文中的对话
    { reg: /^\s*示例\s*$/, name: 'attention', testContent: 'text', type: 'struct' },
    { reg: /^([^\"\“\”\,\，]{1,20})(:|：)$/, name: 'attention', testContent: 'text', type: 'struct' },
    { name: 'attention', checker: node => /(:|：)$/.test(node.innerText) && checkSingleLine(node), type: 'struct' },
    // - 范文
    { reg: /^\s*(范文)[:：]*\s*$/, name: 'example', testContent: 'text', type: 'struct' },
    // - 可能会有全角符号［］
    { reg: /^([［【\[])((?!答案|解析|解答|分析|点评|详解).)+([】\]］])/, name: '【_】', testContent: 'text', type: 'struct' },
    // - 可能有最后一行是总结、倒数第二行是归纳的情况
    // e.g.
    // '归纳：xxxxxx'
    // '总结：xxxxxx'
    {
      name: 'summarize',
      checker: node => /^\s*总结(:|：)/.test(node.innerText) &&
        !node.nextElementSibling && // 最后一行
        !/^\s*[\u4e00-\u9fa5]{1,5}(:|：)/.test(node.previousElementSibling?.innerText ?? ''), // 上一行不是相似的结构
      type: 'struct',
    },

    // - 标注类
    { reg: /设计实验(：|:)$/, name: 'colon', testContent: 'text', type: 'struct' },

    // @tips：说明级别的规则。

    // - 图注/表注
    { reg: /(如图|下图)(：|:)?$/, name: 'caption', testContent: 'html', type: 'text' },
  ];

  function getMatchedRules(node, nodes = []) {
    const $region = findParentNode(node, p => p.dataset?.nodeId && p.dataset.regionId);
    const nodeId = node?.dataset?.nodeId || $region?.dataset?.nodeId;
    if (!nodeId) {
      return [];
    }
    const rules = rrules.filter(r => {
      // @todo：有些行内分页点策略需要站在内容整体的角度去看。
      if (r.checker) {
        return r.checker(node);
      }
      if (r.reg) {
        if (!r.reg.test(r.testContent === 'html' ? node.innerHTML.trim() : node.innerText.trim())) {
          return false;
        }
      }
      // - 若当前节点（prop）中包含大量的加粗节点，则忽略 b_tag、b_tag2 类型的判定
      // - 这里本来用包含 B 标签的 P 节点数量和当前 node_id 全部 P 节点数量来比较、容易误伤，可能存在除 b_tag 外是很多 b_tag2 的情况
      // - 这里目前改成用加粗的字符数来判定（@todo：需要根据中文还是英文做更精细的判定
      if (r.name.includes('b_tag')) {
        const $ps = nodes.map(n => [...n.querySelectorAll(`[data-node-id="${nodeId}"] P`)]).reduce((a, b) => a.concat(b), []);
        const $bs = $ps.map(p => [...p.querySelectorAll('B')]).reduce((a, b) => a.concat(b), []);
        let caniuseb = false;
        if ($ps.filter($p => $p.querySelector('B')).length / $ps.length < 0.66) { // 2/3
          caniuseb = true;
        }
        if ($bs.map(b => b.innerText).join('').length / $ps.map(b => b.innerText).join('').length < 0.2) { // 1/5
          caniuseb = true;
        }
        if (!caniuseb) {
          return false;
        }
      }
      // - 若判定某个 P 是知识点或者小题号类型，则应该上下文中也存在其他同规则的节点
      if (r.name === 'serial_number' && !!r.reg) { // @todo：目前这里只判定三级小题号 ①②③④⑤
        const siblings = [...iterateNode(nodes)].filter(n => n.node.tagName === node.tagName);
        const ci = siblings.findIndex(n => n.node === node);
        const sn = (r.testContent === 'html' ? node.innerHTML.trim() : node.innerText.trim()).match(r.reg)[4];
        let caniuse = true;
        if (ci > 0) { // 若上面的兄弟节点里存在比当前题号小的题号、则可以使用
          if (siblings.slice(0, ci).some(sibling => {
            const content = r.testContent === 'html' ? sibling.node.innerHTML.trim() : sibling.node.innerText.trim();
            if (r.reg.test(content)) {
              const psn = content.match(r.reg)[4];
              return psn < sn;
            }
            return false;
          })) {
            return true;
          }
          caniuse = false;
        }
        if (ci > 0 && ci < siblings.length - 1) { // 若下面的兄弟节点里存在比当前题号大的题号、则可以使用
          if (siblings.slice(ci + 1).some(sibling => {
            const content = r.testContent === 'html' ? sibling.node.innerHTML.trim() : sibling.node.innerText.trim();
            if (r.reg.test(content)) {
              const psn = content.match(r.reg)[4];
              return psn > sn;
            }
            return false;
          })) {
            return true;
          }
          caniuse = false;
        }
        if (!caniuse) { // 若没有相同类型的兄弟节点，则不当作一个题号/知识点的分页点
          console.log('[取消分页点] 若判定某个 P 是知识点或者小题号类型，则应该上下文中也存在其他同规则的节点');
          console.log(node.innerText);
          return false;
        }
      }
      // - 单行的"【答案/解析】"才判定是 rule_based 的分页点（@todo：这个规则看起来并不正确、待调整
      if (r.name === '答案解析') {
        return checkSingleLine(node);
      }
      return true;
    });
    return rules;
  }

  /**
   * 判断元素是否为 RuleBase 小标题
   * @param {HTMLElement} element 元素
   */
  function findPreviousRuleBaseChapter(element) {
    let sibling = element;
    while (sibling) {
      if (isRuleBaseBlock(sibling)) {
        return sibling;
      }
      sibling = sibling.previousElementSibling;
    }
    return null;
  }

  function isRuleBaseBlock(element) {
    if (!element) {
      return false;
    }
    if (element.tagName !== 'P') {
      return false;
    }
    if (element.querySelector('[data-prop="serial_number"]')) {
      return false;
    }
    let rules = rrules.filter(r => {
      if (r.checker) {
        if (r.checker(element)) {
          return true;
        }
      } else if (r.reg) {
        if (
          r.reg.test(r.testContent === 'html'
            ? element.innerHTML.trim()
            : element.innerText.trim())
        ) {
          return true;
        }
      }
      return false;
    });
    if (!rules.length) {
      return false;
    }
    const $region = findParentNode(element, $p => $p.dataset?.regionId);
    const nodeId = $region?.dataset?.nodeId;
    const prop = getRegionMainProp($region);
    const $ps = nodeId ? [...document.querySelectorAll(`[data-node-id="${nodeId}"]${prop ? `[data-prop="${prop}"]` : ''} P`)] : [];
    // - 若当前节点（prop）中包含大量的加粗节点，则忽略 b_tag 类型的判定（@todo：若加粗的只是很少的文本、e.g. 题号，那这个判断是不对的，可以调整成判断加粗的字符数
    if ($ps.filter($p => $p.querySelector('B')).length / $ps.length > 0.66) { // 2/3
      rules = rules.filter(r => !r.name.includes('b_tag'));
    }
    if (!rules.length) {
      return false;
    }
    if (rules.find(rule =>
      [
        'number_bracket',
        'number_dot',
        'serial_number',
        'i_bracket',
        'roman_number_dot',
        'caption',
        'b_tag',
      ].includes(rule.name))
    ) {
      return checkSingleLine(element);
    }
    return true;
  }

  /**
   * 将节点提取到 region 级别
   * @param {*} node
   * @param {*} rootNode
   * @param {*} type
   */
  function extractPartToRegion(node, rootNode, type) {
    let parentNode = node.parentElement;
    let cloneNode = node;
    const siblingNode = [];
    while (parentNode !== rootNode.parentElement) {
      const index = Array.from(parentNode.childNodes).findIndex(i => i === node);
      const clone = parentNode.cloneNode();
      if (type === 'split') {
        [...Array.from(parentNode.childNodes).splice(index)].forEach(node => {
          clone.appendChild(node);
        });
      } else {
        if (index !== parentNode.childNodes.length - 1) {
          siblingNode.push([...Array.from(parentNode.childNodes).splice(index + 1)]);
        }
        clone.appendChild(cloneNode);
      }
      cloneNode = clone;
      if (parentNode === rootNode) {
        if (parentNode.dataset?.breakAfter) {
          parentNode.dataset.breakAfter = false; // 防止拆分选项导致一页一题分页太碎
        }
        if (parentNode.parentElement?.classList.contains('layout-container')) {
          parentNode.parentElement.after(cloneNode);
        } else {
          parentNode.after(cloneNode);
        }
        parentNode = cloneNode;
        if (parentNode.dataset?.breakBefore) {
          parentNode.dataset.breakBefore = false; // 防止拆分选项导致一页一题分页太碎
        }
        // @tips：清理一下拆出来节点的 attr 们。
        parentNode.removeAttribute('break-token');
        parentNode.removeAttribute('break-token-from');
        break;
      }
      node = parentNode;
      parentNode = node.parentElement;
    }
    // 处理兄弟节点
    if (siblingNode.length) {
      siblingNode.forEach(sibling => {
        let siblingParentNode = sibling[0].parentElement;
        let siblingCloneNode = sibling;
        while (siblingParentNode !== rootNode.parentElement) {
          const clone = siblingParentNode.cloneNode();
          if (Array.isArray(siblingCloneNode)) {
            siblingCloneNode.forEach(c => {
              clone.appendChild(c);
            });
          } else {
            clone.appendChild(siblingCloneNode);
          }
          siblingCloneNode = clone;
          if (siblingParentNode === rootNode) {
            parentNode.after(siblingCloneNode);
            parentNode = siblingCloneNode;
            // @tips：清理一下拆出来节点的 attr 们。
            siblingCloneNode.removeAttribute('break-token');
            siblingCloneNode.removeAttribute('break-token-from');
            break;
          }
          siblingParentNode = siblingParentNode.parentElement;
        }
      });
    }
  }

  /**
   * 获取当前节点可以使用的分页线高度
   * @param {*} node
   * @param {*} params
   * @param {*} isChoice
   * @returns
   */
  function computeAcceptHeight(node, params, isChoice = false) {
    let height = params.height; // 版心
    if (document.body.querySelector('[data-catalog-type="question"]') && !!node) {
      if (node.dataset?.masterHeight) { // 若存在题号目录、则使用动态版心
        height = parseFloat(node.dataset?.masterHeight);
      } else if (findParentNode(node, p => p.dataset?.masterHeight)) {
        height = parseFloat(findParentNode(node, p => p.dataset?.masterHeight).dataset.masterHeight);
      }
    } else if (params?.config) {
      height = params.height + parseFloat(unitConvert(params.config.page_cfg.page_margin.bottom, '', 'px')) - 15; // 稍微给个 15px 的间隙、不能直接触底
    }
    // - 对于选择题的题干来说，接受度可以大一些
    if (isChoice && params?.config) {
      height = params.height + parseFloat(unitConvert(params.config.page_cfg.page_margin.bottom, '', 'px')) - 15;
    }
    return height;
  }

  /**
   * 替换嵌套的<p>标签为<div>
   * @param htmlString
   * @return {*}
   */
  function replaceNestedPWithDiv(html) {
    let result = '';
    let depth = 0;
    const tagPositions = [];
    let cursor = 0;
    while (cursor < html.length) {
      if (html.substr(cursor, 2) === '<p') {
        if (depth === 0) {
          tagPositions.push(cursor);
        }
        depth++;
        cursor = html.indexOf('>', cursor) + 1;
      } else if (html.substr(cursor, 3) === '</p') {
        depth--;
        if (depth === 0) {
          tagPositions.push(cursor);
        }
        cursor = html.indexOf('>', cursor) + 1;
      } else {
        cursor++;
      }
    }
    cursor = 0;
    for (let i = 0; i < tagPositions.length; i += 2) {
      result += html.substring(cursor, tagPositions[i]);
      const pTagEnd = html.indexOf('>', tagPositions[i]) + 1;
      const attributes = html.substring(tagPositions[i] + 2, pTagEnd - 1);
      result += `<div${attributes} data-origin-tagname="P">`;
      const innerHTML = html.substring(pTagEnd, tagPositions[i + 1]);
      result += innerHTML.includes('<p') ? replaceNestedPWithDiv(innerHTML) : innerHTML;
      result += '</div>';
      cursor = html.indexOf('>', tagPositions[i + 1]) + 1;
    }
    result += html.substr(cursor);
    return result;
  }

  /**
   * 判断 node 中是否只存在 img 标签
   * @param node
   */
  function containsOnlyImgTag(node) {
    if (
      node.querySelectorAll('img').length === 1 &&
      !node.innerText
    ) {
      const $imgs = node.querySelectorAll('img');
      // 找到对应节点下的所有图片标签，隐藏它们，通过 offsetHeight 判断是否存在其它标签
      const tempImageDisplay = [];
      $imgs.forEach(v => {
        tempImageDisplay.push(v.style.display);
        v.style.display = 'none';
      });
      const noneOffsetHeight = node.offsetHeight === 0;
      $imgs.forEach((v, i) => {
        v.style.display = tempImageDisplay[i];
      });
      if (noneOffsetHeight) { // 说明只有图片节点。
        return $imgs.length;
      }
    }
    return 0;
  }

  /**
   * 寻找指定的祖先节点，找不到就返回父节点
   * @param node
   * @param tagName
   * @return {HTMLElement}
   */
  function findParentWithTag(node, tagName) {
    let current = node;
    while (current && current.nodeName !== 'SECTION') {
      if (current.nodeName === tagName) {
        return current;
      }
      current = current.parentElement;
    }
    return node.parentElement; // 当前节点的父节点
  }

  /**
   * 找到 node 的所有有内容的子孙节点并打平
   * @param nodeArray
   * @return {*[]}
   */
  function getValidChildNodes(nodeArray) {
    let deepChildren = [];

    function traverse(currentNode) {
      // 同时检查是否存在非空文本节点并确保所有子节点都不是元素节点
      const shouldPushChild = (child) => {
        let hasNonEmptyTextNode = false;

        if (child.nodeType !== Node.ELEMENT_NODE) {
          return false;
        }

        for (const node of child.childNodes) {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
            hasNonEmptyTextNode = true;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            return false;
          }
        }

        return hasNonEmptyTextNode;
      }
      Array.from(currentNode.childNodes).forEach(child => {
        if (child.tagName === 'IMG') {
          deepChildren.push(child);
        }
        if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
          deepChildren.push(child);
        } else if (shouldPushChild(child)) {
          // 需要考虑到标签上携带的样式的问题，如果 childNodes 既有元素又有文本，就直接push， 但是需要忽略掉 空格 文本的情况
          deepChildren.push(child);
        } else {
          traverse(child);
        }
      });
    }
    nodeArray.forEach(node => {
      traverse(node);
    })
    return deepChildren;
  }

  /**
   * 截取节点
   * @param childNode 子节点
   * @param templateNode 生成节点的模板
   * @param {'up' | 'down' } type 截取上方的还是下方
   */
  function generateRegion (childNode, templateNode, type) {
    if (!templateNode.parentElement) {
      return null;
    }
    if (!childNode && type === 'up') {
      const rangeUp = document.createRange();
      rangeUp.setStartBefore(templateNode);
      rangeUp.setEndAfter(templateNode);
      return rangeUp.cloneContents();
    }
    if (!childNode && type === 'down') {
      const rangeDown = document.createRange();
      rangeDown.setStartBefore(templateNode);
      rangeDown.setEndAfter(templateNode);
      return rangeDown.cloneContents();
    }
    if (!type || type === 'up') {
      const rangeUp = document.createRange();
      rangeUp.setStartBefore(templateNode);
      rangeUp.setEndBefore(childNode);
      return rangeUp.cloneContents();
    }
    const rangeDown = document.createRange();
    rangeDown.setStartAfter(childNode);
    rangeDown.setEndAfter(templateNode);
    return rangeDown.cloneContents();
  }

  /**
   * 获取 box 的 prop
   * @param box
   * @return {*|string}
   */
  function getBoxProp(box) {
    return box.style?.prop || box.children?.map(p => p.style?.prop).filter(i => i)[0] || ''
  }

  /**
   * 判断节点主要的 prop
   * @param {*} node
   */
  function getRegionMainProp(node) {
    if (!node) {
      return '';
    }
    if (!isElement(node)) {
      return '';
    }
    const children = Array.from(node.querySelectorAll('[data-prop]'));
    // 有答案就是答案，有解析就是解析，有extra就是extra，有sn、source、body、choices就是body。
    const bodyProps = ['serial_number', 'source', 'body', 'choices'];
    if (children.some(c => c.dataset.prop === 'answer')) {
      return 'answer';
    }
    if (children.some(c => c.dataset.prop === 'analysis')) {
      return 'analysis';
    }
    if (children.some(c => c.dataset.prop.includes('extra'))) { // 返回具体的 extra1 这种
      return children.find(c => c.dataset.prop.includes('extra'))?.dataset.prop;
    }
    if (children.some(c => bodyProps.includes(c.dataset.prop))) {
      return 'body';
    }
    return ''
  }

  /**
   * 获取相同 nodeId 和 prop 的节点
   * @param {HTMLElement} element
   * @param nodeId
   * @param prop
   * @return {T[]}
   */
  function getNodeParts(element, nodeId, prop) {
    return [...element.querySelectorAll('section[data-region-id]')]
      .filter(r => r.dataset?.nodeId === nodeId)
      .filter(r => getRegionMainProp(r) === prop && getBoundingClientRect(r).height !== 0);
  }

  /**
   * 获取行高
   * @return {number}
   */
  function getNormalLineHeight() {
    // 排除 container 中 data-fixed-items="true" 的 region
    const regions = Array.from(document.querySelectorAll('section[data-region-id]')).filter(r => !r.dataset.fixedItems);
    // 然后找到 [data-line-height]:not([data-node-type="chapter"]) 的节点
    for (let region of regions) {
      const nodes = Array.from(region.querySelectorAll('[data-line-height]:not([data-node-type="chapter"])'));
      if (nodes.length) {
        // 通过 getComputedStyle 获取 line-height
        return Math.round(parseFloat((getComputedStyle(nodes[0])?.lineHeight) || 50));
      }
    }
    return 50;
  }

  function getValidElementPrevNode(node) {
    if (!node) return null;
    let prevSibling = node.previousSibling;
    while (prevSibling && prevSibling.nodeType !== Element.ELEMENT_NODE && !prevSibling.textContent.trim()) {
      prevSibling = prevSibling.previousSibling;
    }
    return prevSibling;
  }

  function getTotalPadding(element, stopElement) {
    const totalPadding = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    while (element && element !== document) {
      const style = getComputedStyle(element);
      totalPadding.top += parseFloat(style.paddingTop);
      totalPadding.right += parseFloat(style.paddingRight);
      totalPadding.bottom += parseFloat(style.paddingBottom);
      totalPadding.left += parseFloat(style.paddingLeft);
      if (element === stopElement) {
        break;
      }
      element = element.parentNode;
    }
    return totalPadding;
  }

  function hexToRgb(hex) {
    if (!hex) {
      return null;
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function (_, r, g, b) {
      return r + r + g + g + b + b;
    });
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    } : null;
  }

  function debug_info(s) {
    console.log(s);
    if (window?.debug_info) window.debug_info += `${s}\n`;
  }

  function isAutoPipeline(params) {
    return params.stage === 'generatePptxFromHtml' || params.taskType === 'json2ppt';
  }

  /**
   * 计算一个空格的宽度
   * @return {(function(*): (null))|*}
   */
  function createSpaceWidthCalculator() {
    let cachedWidth = null;

    return function calculateSpaceWidth(e) {
      if (cachedWidth !== null) {
        return cachedWidth;
      }

      let text = 'A B';
      const $tempSpan = document.createElement('span');
      $tempSpan.textContent = text;
      $tempSpan.style.fontFamily = 'SimSun';
      e.appendChild($tempSpan);
      const tempSpanWidthWithASpace = $tempSpan.offsetWidth; // 假设 getContentWidth 等同于 offsetWidth
      text = 'AB';
      $tempSpan.textContent = text;
      const tempSpanWidthWithoutASpace = $tempSpan.offsetWidth;
      cachedWidth = tempSpanWidthWithASpace - tempSpanWidthWithoutASpace;
      $tempSpan.remove();

      return cachedWidth;
    };
  }
  const calculateSpaceWidth = createSpaceWidthCalculator();

  /**
   * 计算内容宽度
   * @param {HTMLElement} e 元素
   * @return {number} 内容宽度
   */
  function getContentWidth(e) {
    if (!e) {
      return 0;
    }
    /** @type IRect[]*/
    const rects = [];
    for (const item of iterateNode(e.childNodes, { getChildren: n => n.childNodes })) {
      if (item.node.tagName === 'P' || item.node.tagName === 'SECTION') {
        continue;
      }
      item.stopIterateChildren();
      const rect = getRect(item.node);
      if (rect) {
        rects.push(rect);
      }
    }
    const rect = mergeRect(rects);
    return rect?.w ?? 0;
  }

  /**
   * 判断两个节点之间是否存在有效内容
   * @param childElement
   * @param ancestorElement
   * @return {boolean}
   */
  function hasValidContent(childElement, ancestorElement) {
    const range = document.createRange();
    range.setStartBefore(ancestorElement);
    range.setEndBefore(childElement);
    const fragment = range.cloneContents();
    return !!(fragment.querySelector('img') || fragment.textContent.trim().length);
  }

  /**
   * 寻找连续并且与目标 node 相同 prop 的 region 节点
   * @param nodes region 节点的数组
   * @param targetNode 指定的 node
   */
  function findContinuesPropNodes(nodes, targetNode) {
    if (!nodes || !nodes.length || !targetNode) {
      return [];
    }
    let curNodeIndex = nodes.findIndex(n => n === targetNode);
    if (curNodeIndex === -1) {
      return [];
    }
    // 必须是 region 节点
    if (!nodes.every(node => node.dataset?.regionId)) {
      return [];
    }
    const curNodeProp = getRegionMainProp(targetNode);
    // 向上找和向下找到连续的，prop 相同的组成新节点
    let newNodes = [targetNode];
    while (curNodeIndex > 0 && getRegionMainProp(nodes[curNodeIndex - 1]) === curNodeProp) {
      curNodeIndex--;
      newNodes.unshift(nodes[curNodeIndex]);
    }
    curNodeIndex = nodes.findIndex(n => n === targetNode);
    while (curNodeIndex < nodes.length - 1 && getRegionMainProp(nodes[curNodeIndex + 1]) === curNodeProp) {
      curNodeIndex++;
      newNodes.push(nodes[curNodeIndex]);
    }
    return newNodes;
  }

  /**
   * 寻找当前 nodeId 下的所有 prop 相同的 region 节点
   * @param nodeId
   * @param prop
   */
  function findSamePropNodes(nodeId, prop) {
    if (!prop || !nodeId) {
      return [];
    }
    const regions = Array.from(document.querySelectorAll(`section[data-region-id][data-node-id="${nodeId}"]`));
    return regions.filter(r => getRegionMainProp(r) === prop);
  }

  /**
   * 判定图说是否包含敏感信息
   * @returns boolean
   * @param node 假图说节点
   * @param img 图片节点
   */
  const checkImageTip = (node, img = null) => {
    const innerText = node.innerText.trim();
    if (
      !innerText ||
      !checkSingleLine(node) ||
      node.querySelector('img, table')
    ) {
      return false;
    }
    //只有段落和图片之间没有其他内容时，才可以进行下一步判断
    const range = document.createRange();
    if (img) {
      range.setStartAfter(img);
      range.setEndBefore(node);
    }
    if (!img || !range.cloneContents()?.textContent?.trim()) {
      return /blank/.test(innerText) || // 脏数据
        /^\s*$/.test(innerText) ||
        /^\s*（\d+）\s*$/.test(innerText) ||
        /第\s*\d+\s*题图/.test(innerText) ||
        /第\s*\d+\s*题/.test(innerText) ||
        /第\s*\d+\s*小题图/.test(innerText) ||
        /第\s*\d+\s*小题/.test(innerText) ||
        /（\d+）题图/.test(innerText) ||
        /第（\d+）题/.test(innerText) ||
        /\d+题/.test(innerText) ||
        /题\d+/.test(innerText) ||
        /图\s*[A-Z]?\s*\d+\.\d+[-−]\d+/.test(innerText) ||
        /图\s*\d+[-−]\d+\.\d+[-−]\d+/.test(innerText) ||
        /图\s*\d+[-−][A-Z][-−]\d+/.test(innerText) ||
        /图\s*\d+\.\d+\.\d+[-−]\d+/.test(innerText) ||
        /图\s*[A-Z]+\s*\d+\.\d+\.\d+[-−]\d+/.test(innerText) ||
        /图\s*\d+[-−]\d+/.test(innerText) ||
        /图\s*\d+[-−]\d+[-−]\d+/.test(innerText) ||
        /图\s*[A-Z]+\d*[-−]\d+[-−]\d+/.test(innerText) ||
        /图\s*[A-Z][-−]\d+[-−]\d+[-−]\d+/.test(innerText) ||
        /图\s*[A-Z][-−]\d+/.test(innerText) ||
        /图\s*[A-Z]\d+[-−]/.test(innerText) ||
        /图\s*[A-Z]\s*\d+/.test(innerText) ||
        /图\s*[A-Z]+\s*\d*[-−]\d+/.test(innerText) ||
        /图\s*[A-Z]\s*\d+\.\d+[-−]\d+/.test(innerText) ||
        /图\s*[A-Z]\d+\.\d+[-−]\d+（\d+）/.test(innerText) ||
        /图\s*\d+\s*[-−]\s*\d+\s*[A-Z]\s*[-−]\s*\d+/.test(innerText) ||
        /图\s*[A-Z]\s*\d+\s*[-−]\s*\d+\s*[A-Z]\s*[-−]\s*\d+/.test(innerText) ||
        /图\s*[-−]\d+/.test(innerText) ||
        /^\s*[A-Z]\d+[-−]\d+/.test(innerText) ||
        /^\s*图\d+/.test(innerText) ||
        /^\s*图（\d+）/.test(innerText) ||
        /^\s*图（[a-z]）/.test(innerText) ||
        /题图/.test(innerText) ||
        /答图/.test(innerText) ||
        /答案图/.test(innerText) ||
        /解图/.test(innerText) ||
        /备用图/.test(innerText) ||
        /训练图/.test(innerText) ||
        /例题图/.test(innerText) ||
        /分析图/.test(innerText) ||
        /典例图/.test(innerText) ||
        /^\s*选项\s*$/.test(innerText) ||
        /^\s*图\s*$/.test(innerText) ||
        /^\s*（\d+\s*$/.test(innerText) ||
        /（\d+）图/.test(innerText);
    }
    return false;
  };

  /**
   * 在同一个 SECTION 中找到下一个符合条件的兄弟元素
   * @param node
   * @param cb
   */
  function findNextSiblingElementInSection (node, cb = next => true) {
    let curNode = node;
    let nextSiblingElement = null;
    while (true) {
      if (!curNode) {
        break;
      }
      nextSiblingElement = curNode.nextElementSibling;
      curNode = curNode.parentElement;
      if (nextSiblingElement?.tagName === 'SECTION') { // 直接 break 掉
        nextSiblingElement = null;
        break;
      }
      if (!nextSiblingElement) {
        continue;
      }
      if (cb(nextSiblingElement)) {
        break;
      }
    }
    return nextSiblingElement;
  }

  /**
   * 获取元素中第一个文字距离左侧的值
   * @param node
   */
  function getFirstTextLeft(node) {
    // 检查node是否为有效的DOM节点
    if (!(node instanceof HTMLElement)) {
      return -1;
    }
    // 检查node是否有文本内容
    if (!node.textContent) {
      return -1;
    }
    const firstText = node.textContent[0];
    if (!firstText) {
      return -1;
    }
    const span = document.createElement('span');
    span.textContent = firstText;
    node.firstChild.before(span);
    const firstTextLeft = span.offsetLeft;
    span.remove();

    return firstTextLeft;
  }

  return {
    debug_info,
    iterateNode,
    findNodeIterate,
    findNode,
    findParentNode,
    findAllNodes,
    findAllWrappedNodes,
    isText,
    isElement,
    sleep,
    min,
    minBy,
    max,
    maxBy,
    sum,
    hasOwn,
    isEqual,
    orderBy,
    loadFonts,
    loadImages,
    merge,
    removePropIfEmpty,
    removeIfEmpty,
    formatLatex,
    unitConvert,
    addBodyBracket,
    formatBodyBlank,
    gcd,
    round,
    ceil,
    floor,
    chunk,
    query,
    mergeRect,
    trimNode,
    parseColor,
    computeFormulaRect,
    computeLineCount,
    computeImageAreaFontCount,
    getExpandedRect,
    getDomsRect,
    getChildren,
    getChild,
    getRect,
    getRect2,
    getBoundingClientRect,
    getStyle,
    getImageSize,
    convertBlockToInline,
    isSmallImage,
    isBlockImage,
    findBlockImages,
    isImageContainer,
    checkSingleLine,
    isLikeTextLineImage,
    rrules,
    getMatchedRules,
    isRuleBaseBlock,
    findPreviousRuleBaseChapter,
    extractPartToRegion,
    computeAcceptHeight,
    replaceNestedPWithDiv,
    containsOnlyImgTag,
    findParentWithTag,
    getValidChildNodes,
    generateRegion,
    getBoxProp,
    getRegionMainProp,
    getNodeParts,
    getNormalLineHeight,
    isLatex,
    getValidElementPrevNode,
    getTotalPadding,
    hexToRgb,
    isAutoPipeline,
    checkFlatImage,
    calculateSpaceWidth,
    getContentWidth,
    hasValidContent,
    findContinuesPropNodes,
    findSamePropNodes,
    checkImageTip,
    findNextSiblingElementInSection,
    checkImageShape,
    checkImageSize,
    isBlockInlineImage,
    isInlineBlockImg,
    canIResizeThisImage,
    getFirstTextLeft,
  };
})();
