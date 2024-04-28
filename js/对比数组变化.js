
function compareArrays(array1, array2){
  // 假设 array1 是原数组，array2 是要比较的数组
  const diff = {};
  if (array1?.length > array2?.length) {
      const Element = array1.find(elem => !array2.includes(elem));
      if (Element) {
          diff.element = Element;
          diff.type = 'removed';
      }
  }
  else if (array1?.length < array2?.length) {
      const Element = array2.find(elem => !array1.includes(elem));
      if (Element) {
          diff.element = Element;
          diff.type = 'added';
      }
  }
  return diff;
}

console.log( compareArrays([1,2], [1,2,3]) );  // { element: 3, type: 'added' }
console.log( compareArrays([1,2], [1]) );  // { element: 2, type: 'removed' }