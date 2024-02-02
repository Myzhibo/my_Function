json = [
  {
    id: 1,
    result: 'a'
  },
  {
    id: 1,
    result: 'b'
  },
  {
    id: 2,
    result: 'c'
  },
  {
    id: 3,
    result: 'd'
  },
  {
    id: 3,
    result: 'e'
  }
]


const transformedJson = json.reduce((acc, item) => {  
  const existingItem = acc.find(i => i.id === item.id);  
  if (existingItem) {  
    existingItem.result.push(item.result);  
  } else {  
    acc.push({ ...item, result: [item.result] });  
  }  
  return acc;  
}, []);  
  
console.log(transformedJson);
// [
//   { id: 1, result: [ 'a', 'b' ] },
//   { id: 2, result: [ 'c' ] },
//   { id: 3, result: [ 'd', 'e' ] }
// ]