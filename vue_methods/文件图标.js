// 还没测试不知道好不好用

<i :class="getFileIcon(item.name)"></i>

getFileIcon (fileName) {
  const type = fileName.split('.').slice(-1)[0].toLowerCase();
  switch (type) {
  case 'pdf': return 'fa fa-file-pdf-o fa-fw';
  case 'xlsx': return 'fa fa-file-excel-o fa-fw';
  case 'doc': return 'fa fa-file-word-o fa-fw';
  case 'docx': return 'fa fa-file-word-o fa-fw';
  case 'jpg': return 'fa fa-file-image-o fa-fw';
  case 'png': return 'fa fa-file-image-o fa-fw';
  case 'ppt': return 'fa fa-file-powerpoint-o fa-fw';
  case 'pptx': return 'fa fa-file-powerpoint-o fa-fw';
  default: return 'fa fa-file-o fa-fw';
  }
},