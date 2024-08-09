// 从一段话中拆出 中英文两段 (最后一个汉字开始)
export function splitChiEng(str) {
  // 从后往前遍历字符串，找到第一个中文字符的位置  
  let chineseIndex = -1;  
  for (let i = str.length - 1; i >= 0; i--) {  
    // 检查当前字符是否在中文Unicode范围内  
    if (str.charCodeAt(i) >= 0x4e00 && str.charCodeAt(i) <= 0x9fa5) {  
      chineseIndex = i;  
      break;  
    }  
  }  
  // 如果找到了中文字符，就在那里拆分文本  
  if (chineseIndex !== -1) {  
    let chinese = str.substring(0, chineseIndex + 1)
    let english = str.substring(chineseIndex + 1);

    // 检查第二段的起始字符是否为句号，并相应地调整字符串
    if (english.startsWith('。')) {  
      chinese += '。';
      english = english.substring(1);
  } 
    return [chinese, english];
  } else {  
    return false;
  }
}

// json 拼成 table
export function json2Table(json) {
  console.log(json);
  const trs = json.map(item => {
    const td1 = splitChiEng(item.title).map(item => `<div>${item}</div>`).join('');
    const td2 = item['Time/Place'];
    const td3 = item['What happened?'];
    const td4 = item['How did the character respond?(reaction/feeling)'];
    return `
      <tr>
        <!-- contenteditable="true" -->
        <td>${td1}</td>
        <td>${td2}</td>
        <td>${td3}</td>
        <td>${td4}</td>
      </tr>  
    `
  }).join('');
  const tableHtml = `
    <table class="storyline">  
        <thead>  
            <tr>  
                <th rowspan="2">情节发展</th>  
                <th colspan="3">细节</th>  
            </tr>  
            <tr>  
                <th>Time/Place</th>  
                <th>What happened?</th>  
                <th>How did the character respond?</th>  
            </tr>  
        </thead>  
        <tbody>  
            ${trs}
        </tbody>  
    </table>  
  `; 

  return tableHtml;
}

export function json2Table_2(json) {
  console.log(json);
  const trs = json.map(item => {
    console.log(item);
    const td1 = item.para.para;
    const td2 = item.para.start_sentence;
    const td3 = item.analysis;
    const td4 = item.continueQuestions.map(it => `<div>${it.val}</div>`).join('');
    return `
      <tr>
        <!-- contenteditable="true" -->
        <td class="b-font">${td1}</td>
        <td>${td2}</td>
        <td>${td3}</td>
        <td>${td4}</td>
      </tr>  
    `
  }).join('');
  const tableHtml = `
    <table class="storyline">  
        <thead>  
            <tr>  
                <th>段落</th>  
                <th>续写段落首句</th>  
                <th>首句分析</th>  
                <th>续写思路</th>  
            </tr>
        </thead>  
        <tbody>  
            ${trs}
        </tbody>  
    </table>  
  `; 

  return tableHtml;
}

// html -> str
export function formatOutputHtml_(data) {
  if (!data) return '';
  // data = data.replace(/【(篇章导读|待选单词|提纲|答案|详解|点睛)】/, '');
  data = data.replace(/<[^<>]+>/g, '');
  return data;
}