
let r1 = /^(?!.*A\.)(?=.*D\.)[\s\S]*$/                // 有D. 没有A.
let text1 = `xxxx B.书面表达 C. xxx D.xxxxx`
console.log(r1.test(text1))                           

let r2 = /A\./                                        // 有D. 没有A.
let r22 = /D\./
let text2 = `xxxx B.书面表达 C. xxx D.xxxxx`
console.log(!r2.test(text2) && r22.test(text2))       

let r3 = /^[ABCD]\./                        
let text3 = `A. This is a test.`
console.log(r3.test(text3))       // true  因为以 'A.' 开头
let text33 = `This is a B. test.`
console.log(r3.test(text33))       // false  因为没有以 'B.' 开头  设了^