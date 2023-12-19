function findMaxLevel(data) {  
  let maxLevel = -Infinity;  

  function traverse(nodes) {  
      for (let node of nodes) {  
          if (node.node_level > maxLevel) {  
              maxLevel = node.node_level;  
          }  
          if (node.children && node.children.length > 0) {  
              traverse(node.children);  
          }  
      }  
  }  

  traverse(data);  
  return maxLevel;  
}  

const jsonData = [  
  {  
    "node_level": 1,  
    "node_type": "chapter",  
    "node_name": "第1章",  
    "children": [  
      {  
        "node_level": 2,  
        "node_type": "chapter",  
        "node_name": "第1节 嘻嘻",  
        "children": [  
          {  
            "node_level": 3,  
            "node_type": "chapter",  
            "node_name": "A 基础题",  
            "children": [  
              {  
                "node_level": 4  
              }  
            ]  
          }  
        ]  
      }  
    ]  
  },  
  {  
    "node_level": 1,  
    "node_type": "chapter",  
    "node_name": "第2章",  
    "children": [  
      {  
        "node_level": 2,  
        "node_type": "chapter",  
        "node_name": "第1节 哈哈",  
        "children": [  
          {  
            "node_level": 3,  
            "node_type": "chapter",  
            "node_name": "B 基础题"  
          }  
        ]  
      }  
    ]  
  }  
];  

console.log(findMaxLevel(jsonData)); // 输出：4

  