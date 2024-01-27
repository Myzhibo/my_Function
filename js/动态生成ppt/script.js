function findAllLeafNodes(elements) {
  var leafNodes = [];

  function findLeafNodes(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      var childNodes = node.childNodes;
      if (childNodes.length === 0) {
        leafNodes.push(node);
      } else {
        childNodes.forEach(function (childNode) {
          findLeafNodes(childNode);
        });
      }
    } else if (
      node.nodeType === Node.TEXT_NODE &&
      node.nodeValue.trim() !== ""
    ) {
      leafNodes.push(node);
    }
  }
  elements.forEach(function (element) {
    findLeafNodes(element);
  });
  return leafNodes;
}

function hideAllNodes(nodes) {
  nodes.forEach(function (node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.classList.add("anim-hidden");
    } else if (node.nodeType === Node.TEXT_NODE) {
      node.parentNode.classList.add("anim-hidden");
    }
  });
}

function addSpan(nodes) {
  return new Promise((resolve) => {
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {  
        const $parent = node.parentNode 
        let span = document.createElement('span');
        span.setAttribute('_c', '');
        $parent.insertBefore(span, node);
        node.previousSibling.appendChild(node)
      }
    });
    resolve()
  })
}

function showNodesSequentially(nodes, index, cb) {
  if (index >= nodes.length) {
    return cb();
  }
  if (nodes[index].nodeType === Node.ELEMENT_NODE) {
    nodes[index].classList.add("anim-dispalyed");
    setTimeout(function () {
      nodes[index].classList.remove("anim-hidden");
      showNodesSequentially(nodes, index + 1, cb);
    }, 100);
  } else if (nodes[index].nodeType === Node.TEXT_NODE) {
    nodes[index].parentNode.classList.add("anim-displayed");
    setTimeout(function () {
      nodes[index].parentNode.classList.remove("anim-hidden");
      showNodesSequentially(nodes, index + 1, cb);
    }, 100);
  }
}

function sleep(t = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), t);
  });
}

window.onload = function () {
  // var allLeafNodes = findAllLeafNodes(document.body.children);
  // hideAllNodes(allLeafNodes);
  // showNodesSequentially(allLeafNodes, 0);

  main();
};

async function main() {
  const $pages = [...document.querySelector("#page-container")?.children] || [];
  const $loading = document.querySelector("#loading");
  const $nodes = findAllLeafNodes($pages);
  // 为文本节点添加<span>标签
  await addSpan($nodes)
  // 隐藏所有内容节点
  hideAllNodes($nodes);
  await sleep(500);
  // 去掉遮盖
  $loading.remove();
  // 1. 隐藏全部页面节点
  // 2. 点击依次页面动画出现，位置放在页面中心
  // 3. 页面后里面的内容逐行动画出现
  // 4. 内容动画结束后自动下一页开始
  let index = 0;
  let t = -1;
  /**
   * 逐页播放动画
   */
  async function nextSlide() {
    const $page = $pages[index++];
    if (!$page) {
      clearInterval(t);
      return;
    }
    $page.scrollIntoView({ block: "center" });
    $page.classList.add("displayed");
    // 开始播放页面里内容的动画
    await animSlideContent($page);
    await sleep(500);
    // 播放下一页动画
    await nextSlide();
  }
  /**
   * 播放页面里内容的动画
   * @param {*} $page
   */
  function animSlideContent($page) {
    return new Promise((resolve) => {
      const $nodes = findAllLeafNodes([...$page.children]);
      showNodesSequentially($nodes, 0, resolve);
    });
  }
  // t = setInterval(nextSlide, 1000);
  await nextSlide(); // 开始播放第一页
}