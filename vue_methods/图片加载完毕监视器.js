/**
 * 前提条件，图片组件有一个loaded条件，当图片加载完毕后才会渲染视图，所以 querySelectorAll('img') 的数量就只是当前已经加载完毕的图片数量(dom中载入的数量)
 * 
 * 1. container: 正在监视的dom
 * 2. imgCount: 应加载图片个数
 * 3. onImagesLoaded: 图片加载完毕后的回调
 * 
 * eg:
    imageObserver(dom, imgCount, () => {
      // 图片加载完毕后 整理图片布局
      this.onImgLoaded();
    });
 */

// 图片加载观察器
export function imageObserver(container, imgCount, onImagesLoaded) {
  if(!imgCount) {
    onImagesLoaded();
    return;
  }

  let hasLoadedImgsCount = 0;
  const mutationObserver = new MutationObserver((mutationsList, observer) => {
    mutationsList.forEach(mutation => {
      if (mutation.type === 'childList') {
        if (!container) return;
        if(hasLoadedImgsCount === container?.querySelectorAll('img').length) return;
        hasLoadedImgsCount = container?.querySelectorAll('img').length
        // 对比 dom 中已加载图片个数和应加载图片个数是否相等
        if (imgCount > 0 && imgCount === hasLoadedImgsCount) {
          mutationObserver.disconnect();
          onImagesLoaded();
        }
      }
    });
  });

  mutationObserver.observe(container, {
    childList: true,
    subtree: true,
  });
 
  // 返回 MutationObserver 实例
  return mutationObserver;
}
  
export default {
  imageObserver
};