// this.selectedArr是被选中的行
batchDown(){
  this.selectedArr.forEach((row, index) => {
    setTimeout(() => {  // 几个下载命令连续执行的时候，浏览器会取消上一个下载，直接下载最后一个文件。所以要加一个定时器，让几个连续的下载请求之间有时间间隔
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = row.url;
      a.download = row.name +'.pptx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }, 1000 * index);
  });
}