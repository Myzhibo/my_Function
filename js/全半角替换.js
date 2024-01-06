const str1 = "Unit7It‍'‍sraining！-SectionB";  
const str2 = "Unit7It'sraining！-SectionB";  
  
const replacedStr = str1.replace(/[\u200d]/g, '');  

console.log(replacedStr === str2);
