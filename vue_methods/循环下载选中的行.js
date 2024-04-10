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

  /** 上面那种写法： a.href赋值一个图片的URL时，浏览器会尝试以默认方式处理这个链接，通常如果链接指向一个图片，浏览器会直接在页面上显示这个图片，而不是下载它。a.download属性是用来告诉浏览器应该下载链接的内容，而不是打开它。但是，如果链接的内容是浏览器可以直接显示的（比如图片），浏览器可能会忽略download属性，直接显示内容。
   * 用下面这个写法 ↓
   */
  this.selectedArr.forEach((theUrl, index) => {
    setTimeout(async () => { // 注意添加了 async 关键字
      try {
        console.log(theUrl);
        const response = await fetch(theUrl); // 使用 fetch 获取资源
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const blob = await response.blob(); // 将响应转换为 Blob 对象
        const url = window.URL.createObjectURL(blob); // 创建 Blob URL
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // 这里提取文件名可能不总是准确的，建议从响应头中获取，如果可用的话
        a.download = theUrl.split("/").pop().split("?")[0]; // 移除查询参数（如果有的话）
        document.body.appendChild(a);
        a.click(); // 触发下载
        window.URL.revokeObjectURL(url); // 释放 URL 对象
        document.body.removeChild(a); // 从 DOM 中移除元素
      } catch (error) {
        console.error("Error downloading file:", error);
      }
    }, 1000 * index); // 设置延迟以避免同时下载多个文件
  });

}