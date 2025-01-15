function createImageLoadPromise(img) {
  return new Promise((resolve, reject) => {
    if (img.complete) {
      resolve(img);
    } else {
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`${img.src}`));
    }
  });
}

// 图片加载观察器
export async function imageObserver(container, imgCount, onImagesLoaded) {
  if (!container || imgCount <= 0) {
    setTimeout(() => {
      onImagesLoaded();
    }, 0);
    return;
  }
  const imagePromisesMap = new Map();
  const mutationObserver = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        Array.from(mutation.addedNodes).forEach(async (node) => {
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'img') {
            const imgId = node.getAttribute('img-id');
            if (imgId && !imagePromisesMap.has(imgId)) {
              imagePromisesMap.set(imgId, createImageLoadPromise(node));
              if (imagePromisesMap.size >= imgCount) {
                mutationObserver.disconnect();
                await Promise.all(Array.from(imagePromisesMap.values()));
                setTimeout(() => {
                  onImagesLoaded();
                }, 0);
              }
            }
          }
        });
      }
    });
  });

  mutationObserver.observe(container, {
    childList: true,
    subtree: true
  });

  return mutationObserver;
}

export default {
  imageObserver
};
