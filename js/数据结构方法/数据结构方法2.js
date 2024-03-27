const tags= [  
      ["全部", []],  
      ["生活与学习", ["校园生活", "身心健康", "励志故事", "乐学善学", "教育育人"]],  
      ["做人与做事", ["职业启蒙", "劳动教育", "金融理财", "实践创新"]],  
      ["社会与服务", ["志愿服务", "家乡变化"]],  
      ["人际交往与沟通", ["友谊故事", "亲情故事", "团队协作", "文化交际"]],  
      ["文学体育与艺术", ["艺术作品", "艺术人物", "体育活动"]],  
      ["历史文化与社会", ["文化习俗", "杰出人物", "公共秩序", "中国实力与美", "社会热点"]],  
      ["科学与技术", ["科技工程", "发明创新"]],  
      ["人与自然", ["自然生态", "环境保护", "灾害防范", "宇宙探索", "旅游风光"]],  
      ["其他", ["其他"]]  
    ]  
const item = {  
  tag: ["职业启蒙", "环境保护"]  
};  
  
// 映射item.tag到对应的标签分类  
const mappedTags = item.tag.map(tag => {  
  const tagGroup = tags.find(group => group[1].includes(tag));  
  return tagGroup ? tagGroup[0] : null;
}).filter(tagName => tagName !== null);

// 一句话写
// const mappedTags = item.tag.map(tag => tags.find(group => group[1].includes(tag)) ? tags.find(group => group[1].includes(tag))[0] : null).filter(tagName => tagName !== null);

console.log(mappedTags); // 输出: ['做人与做事', '人际交往与沟通']



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const t = "发明创新"
// 查找t对应的标签分类  
const tagGroup = tags.find(group => group[1].includes(t));  
const mappedTag = tagGroup ? tagGroup[0] : null; 
console.log(mappedTag);