// 只保留【字母数字】
const b = ' After  that, she was named the most valuable athlete(运动员)   -0A9'.replaceAll(/[\W_]/g, '');
console.log(b);

// 检查 word 是否是独立的单词
ifAWord(word, html) {
  let content = html    // html -> string
    .replace(/<\/p>/g, '\n') // 避免多个单词合并在一起
    .replace(/<br[^<>]*>/g, '\n')
    .replace(/<[^<>]+>/g, '') // 过滤掉各种标签
    .replace(/\n+/g, ' ') // 过滤掉换行符
    .replace(/&nbsp;/g, ' '); // 过滤掉换行符;

  //   \\b 表示正则表达式中的单词边界（word boundary），它在匹配时确保 str 的前后都是非单词字符（如空格、标点符号或字符串的开始/结束）
  //   i 表示在匹配时不区分大小写
  const regex = new RegExp(`\\b${word}\\b`, 'i');
  return regex.test(content);
}