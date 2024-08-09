import { splitChiEng, json2Table, json2Table_2, formatOutputHtml_ } from './tool.js'

export function json2Html(json) {
  let html = '';
  console.log(json);
  // 处理 structure 字段
  const structure = formatStructure(json?.structure);
  // 处理 step1.summary 字段
  const summary = formatSummary(json?.enhance_content?.step1.summary);
  // 处理 step1.para_analysis 字段
  const paraAnalysis = formatParaAnalysis(json?.enhance_content?.step1?.para_analysis);
  // 处理 step1.story_timeline 字段
  const storyLine = formatStoryLine(json?.enhance_content?.step1?.story_timeline);
  // 处理 step2 字段 
  const enhanceStep2 = formatEnhanceStep2(json?.enhance_content?.step2);
  const enhanceCorpus = formatEnhanceStep2Quests(json?.enhance_content?.step2);
  // 处理 sample_essay 字段
  const sampleEssay = formatSampleEssay(json?.sample_essay);
  // 处理 analysis 字段
  const analysis = formatAnalysis(json?.analysis);
  const extra = formatExtra(json?.analysis);
  

  html = 
    structure + 
    `<div class="b-s-font">StepI 审故事情节</div>` +
    `<div class="b-font">一、审故事大意</div>` +
    summary + 
    `<div class="b-font">二、审篇章段落</div>` + 
    paraAnalysis +
    `<div class="b-font">三、定叙事结构</div>` + 
    `${json2Table(storyLine)}` +
    `<div class="b-s-font">StepⅡ 构写作思路</div>` +
    `${json2Table_2(enhanceStep2)}` +
    `<div class="b-font">二、问题链式激活语料</div>` +
    enhanceCorpus +
    `<div class="b-s-font">Step Ⅲ 梦笔生花</div>` +
    '【答案】' + sampleEssay +
    '【详解】' + analysis +
    (extra ? ('【点睛】' + extra) : '')
    
    
  // console.log(html);
  return html;
}

// `<div></div>`
function formatStructure(data) {
  let res = data
    .split('\n')
    .filter(item => Boolean(item.trim()))
    .map((item, index) => 
      `<div class="b-font">Paragraph ${index+1}：</div> 
      <div>${item}______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______ ______
      </div>
    `)
    .join('');

  res = `<div>请按照如下格式在相应位置作答:</div>` + res;

  return res;
}

function formatSummary(data) {
  let res = data;

  return res;
}

function formatParaAnalysis(data) {
  let res = data
  .map((item, index) => `
    <div class="b-font">${item.para}</div>
    <div>${splitChiEng(item.analysis).map(it => `<div>${it}</div>`).join('')}</div>
  `)
  .join('');

  return res;
}

function formatStoryLine(data) {
  let res = Object.keys(data).map(key => {
    return { title: key, ...data[key] };
  });

  return res;
}

function formatEnhanceStep2(data) {
  let res = data.map(item => {
    return {
      para: {
        para: 'Para. ' + item.para,
        start_sentence: formatOutputHtml_(item.start_sentence)
      },
      continueQuestions: item.continue_questions.map(it => {
        return { val: formatOutputHtml_(it.question) };
      }),
      analysis: formatOutputHtml_(item.analysis)
    };
  });

  console.log(res);
  return res;
}

function formatEnhanceStep2Quests(data){
  let res = [];
  console.log(data);
  data.forEach(item => {
    const r = item.continue_questions.map(it => it);
    res.push(...r);
  });
  
  res = res
    .map(item => {
      return `
        <div style="margin-bottom: 15px">
          <div><span class="b-font">Question: </span>${item['question']}</div>
          <div><span class="b-font">功能: </span>${item['功能']}</div>
          <div><span class="b-font">语言积累: </span>${item['语言积累']}</div>
        </div>
      `
    }).join('');
  
  return res;
}

function formatSampleEssay(data) {
  let res = data.split('\n').map(item => {
    const ifTitle = item.startsWith('Paragraph');
    let div = '';
    if (ifTitle) {
      div = `<div class="b-font">${item}</div>`
    } else {
      div = `<div>${item}</div>`
    }
    return `${div}`
  }).join('');

  console.log(res);
  return res;
}

function formatAnalysis(data) {
  let res = (data?.split('【点睛】')[0] ?? '').replace('【详解】', '');
  res = res.split('\n').map(item => {
    const r = `
      <div>${item}</div>
    `
    return r
  }).join('');

  return res;
}

function formatExtra(data) {
  let res = '';
  if (data.includes('点睛')) {
    res = '【点睛】' + data?.split('【点睛】')[1] ?? '';
  }
  return res;
}