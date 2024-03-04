str = "123456789"

index = str.indexOf('3');
before = str.slice(0, index);
after = str.slice(index+1);
str = str.replace('3','三')

console.log(index);
console.log(before);
console.log(after);
console.log(str);