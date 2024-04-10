
mounted(){
  // 绑定一个点击事件， 如果target不是span就打印1
  document.addEventListener('click', (event) => {
    if (event.target.tagName.toLowerCase() !== 'span') {
      console.log(1);
    }
  });

  // keydown 监听键盘事件
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      console.log('Esc key pressed!');
    }
  });

  //  scroll 监听全局滚动事件
  document.addEventListener('scroll', function (event) {
    console.log('滚动了');
  });
  // 监听特定的div滚动事件
  const scrollableDiv = document.getElementById('scrollableDivId');
  scrollableDiv.addEventListener('scroll', function (event) {
    console.log('Esc key pressed!');
  });
},