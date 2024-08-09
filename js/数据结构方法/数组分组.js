
// 原数组  ==>>> ARR    分组

const groupedByLevel = ARR.reduce((group, item) => {
  label = item.level    // 如： 按照原数组的 level 字段, 分组.
  if (!group[label]) {
      group[label] = [];
  }
  group[label].push(item);

  return group;
}, {});



// 数组 取和
const data = [  
  {  
      "quest_type": "动词",  
      "quest_num": 1  
  },  
  {  
      "quest_type": "动词短语",  
      "quest_num": 1  
  }  
];  

const sumOfQuestNums = data.reduce((accumulator, currentValue) => {  
  return accumulator + currentValue.quest_num;  
}, 0); // 初始累加器值为0  

console.log(sumOfQuestNums); // 输出: 2