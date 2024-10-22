nextTick(() => {
  const dialogElement = document.querySelector('.el-dialog__body');
  if (dialogElement.requestFullscreen) {
    dialogElement.requestFullscreen();
  } else if (dialogElement.mozRequestFullScreen) { /* Firefox */
    dialogElement.mozRequestFullScreen();
  } else if (dialogElement.webkitRequestFullscreen) { /* Chrome, Safari & Opera */
    dialogElement.webkitRequestFullscreen();
  } else if (dialogElement.msRequestFullscreen) { /* IE/Edge */
    dialogElement.msRequestFullscreen();
  }

  document.addEventListener('fullscreenchange', function (event) {
    if (document.fullscreenElement) {
      // 元素现在处于全屏模式  
      console.log('现在是全屏模式');
    } else {
      // 元素现在已退出全屏模式  
      console.log('现在已退出全屏模式');
      // 在这里执行你想要的“退出全屏”后的操作  
    }
  });
})