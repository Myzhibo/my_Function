const files = [  
  {fileName: '类1111', filesSuffix: 'jpg'},  
  {fileName: '类222', filesSuffix: 'tif'},  
  {fileName: '类3', filesSuffix: 'ai'},  
  {fileName: '类3', filesSuffix: 'eps'}  
];  

// 把数组转换成对象用 reduce
const groupByFieldName = ((arr, FieldName) => {
  const groupedFiles = arr.reduce((groups, file) => {  
    const groupBy = file[FieldName];  
    // 如果分组中还没有这个fileName，则初始化一个空数组  
    if (!groups[groupBy]) {  
      groups[groupBy] = [];  
    }  
    // 将当前文件添加到对应的fileName分组中  
    groups[groupBy].push(file);  
    // 返回更新后的分组对象  
    return groups;  
  }, {}); // 初始值是一个空对象

  return groupedFiles
})
  
console.log(groupByFieldName(files, 'fileName'));