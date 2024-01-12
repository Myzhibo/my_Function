import _ from 'lodash';

export function hasOwn (val, key) {
  return hasOwnProperty.call(val, key);
}

export function mergeDefault (target, ...sources) { // 合并默认数据
  Object.keys(target).forEach(item => {
    if (target[item] !== null && typeof target[item] === 'object' && !Array.isArray(target[item])) { // value是对象的递归向下
      mergeDefault(target[item], ...sources.map(source => source && source[item] ? source[item] : source));
    } else { // 其它的替换
      sources.forEach(source => { // 替换的对象不是对象，并且存在进行替换
        if (source && source[item] !== undefined && source[item] !== null && source[item] !== '' && Object.prototype.toString.call(source[item]) !== '[object Object]') target[item] = source[item];
      });
    }
  });
  return target;
}

export function mergePeer (target, ...sources) { // 合并多个相同数据结构的数据
  Object.keys(target).forEach(item => {
    if (target[item] !== null && typeof target[item] === 'object' && !Array.isArray(target[item])) { // value是对象的递归向下
      mergePeer(target[item], ...sources.map(source => {
        if (source && source[item]) {
          return source[item];
        }
      }).filter(item => item !== undefined));
    } else { // 其它的替换
      sources.forEach(source => { // 替换的对象不是对象，并且存在进行替换
        if (source && source[item] !== undefined && source[item] !== null && source[item] !== '' && Object.prototype.toString.call(source[item]) !== '[object Object]') target[item] = source[item];
      });
    }
  });
  return target;
}

export function checkType (value) { // 保存前进行一次类型检查
  if (Array.isArray(value)) {
    value.forEach(item => {
      if (typeof item === 'object') { // value是对象的递归向下
        checkType(item);
      }
    });
  } else {
    Object.keys(value).forEach(item => {
      if (typeof value[item] === 'object') { // value是对象的递归向下
        checkType(value[item]);
      } else { // 其它的替换
        if (item === 'level' || item === 'node_level') {
          value[item] = checkLevel(value[item]);
        }
        if (item === 'line_height' || item === 'indent_unit_length' || item === 'bracket_length') {
          value[item] = Number(value[item]);
        }
        if (item === 'color' && !checkColor(value[item])) {
          value[item] = '000000';
        }
      }
    });
  }
  return value;
}

export const checkLevel = (node_level) => {
  if (typeof node_level !== 'string') node_level = node_level.toString().trim();
  if (node_level === '') return '';
  if (/^([0-9]|(1[0-5])){1}$/.test(node_level)) return +node_level;
  if (/^(([0-9]|(1[0-5])),\s*)(([0-9]|(1[0-5])),\s*)*([0-9]|(1[0-5]))$/.test(node_level)) {
    return node_level.replaceAll(' ', '').split(',').map(item => +item);
  }
  if (/^([0-9]|(1[0-5]))\s*-\s*([0-9]|(1[0-5]))$/.test(node_level)) {
    const startLevel = +node_level.split('-')[0];
    const arr = [+startLevel];
    const endLevel = +node_level.split('-')[1];
    while (arr[arr.length - 1] < endLevel) {
      arr.push(arr[arr.length - 1] + 1);
    }
    return arr;
  }
  return '';
};

export function checkColor (color) {
  if (color.length < 3) {
    return true;
  }
  color = `#${color}`;
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  return reg.test(color);
}

export function findKey (value, obj, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value));
}

export function removeIfEmpty (d) { // 移除对象内的空数组，undefined, null, ''
  if (!d || typeof d !== 'object') return d;
  if (Array.isArray(d)) {
    const res = d.map(i => removeIfEmpty(i)).filter(i => i !== null || i !== '');
    const filterRes = res.filter(item => item !== null);
    if (!filterRes.length) return;
    return filterRes;
  }
  const entities = [];
  Object.keys(d).forEach(k => {
    const v = removeIfEmpty(d[k]);
    if (v == null || v === '') return;
    entities.push([k, v]);
  });
  if (!entities.length) return;
  const res = {};
  entities.forEach(([k, v]) => {
    res[k] = v;
  });
  return res;
}

export function merge (...args) {
  if (args.length < 2) return args[0];
  if (args.length === 2) {
    const [obj, other] = args;
    if (!obj || !other) return other;
    if (typeof obj !== typeof other) return other;
    if (Array.isArray(obj) || Array.isArray(other)) return other;
    if (typeof obj !== 'object') return other;
    const res = {};
    Object.keys(obj).forEach(key => {
      if (!hasOwn(other, key)) {
        res[key] = obj[key];
      } else {
        res[key] = merge((obj)[key], (other)[key]);
      }
    });
    Object.keys(other).forEach(key => {
      if (!hasOwn(obj, key)) {
        res[key] = other[key];
      }
    });
    return res;
  }
  const [obj, other, ...rest] = args;
  let res = merge(obj, other);
  for (const arg of rest) {
    res = merge(res, arg);
  }
  return res;
}

export function setVal (obj, target, val) {
  // setVal({}, 'a.b.c', 'aa') => {a: {b: {c: 'aa'}}}
  const targetList = target.split('.');
  targetList.forEach((item, index) => {
    if (index === targetList.length - 1) {
      obj[item] = val;
    } else {
      if (!obj[item]) obj[item] = {};
      obj = obj[item];
    }
  });
}
export function getVal (obj, target) {
  // setVal({}, 'a.b.c', 'aa') => {a: {b: {c: 'aa'}}}
  const targetList = target.split('.');
  let result;
  targetList.forEach((item, index) => {
    if (index === targetList.length - 1) {
      result = obj[item];
    } else {
      if (!obj[item]) {
        obj = {};
        return;
      }
      obj = obj[item];
    }
  });
  return result;
}
export function setId () {
  return Number(Math.random().toString().substr(3, 12) + Date.now()).toString(36);
}

export function getDPI () {
  var DPI = {};
  if (window.screen.deviceXDPI !== undefined) {
    DPI.x = window.screen.deviceXDPI;
    DPI.y = window.screen.deviceYDPI;
  } else {
    var tmpNode = document.createElement('DIV');
    tmpNode.style.cssText = 'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden';
    document.body.appendChild(tmpNode);
    DPI.x = parseInt(tmpNode.offsetWidth);
    DPI.y = parseInt(tmpNode.offsetHeight);
    tmpNode.parentNode.removeChild(tmpNode);
  }
  return DPI;
}
// 去除空属性(不包括对象中的对象)
export const removeEmpty = (obj) => {
  const o = _.cloneDeep(obj);
  for (const i in o) {
    if (o[i] === '' || o[i] === null) {
      delete o[i];
    }
  }
  return o;
};

// 中英文转换
export const getSubjectChineseName = (subEngName) => {
  if (subEngName === 'English' || subEngName === 'english') {
    return '英语';
  } else if (subEngName === 'Math' || subEngName === 'math') {
    return '数学';
  } else if (subEngName === 'Chinese' || subEngName === 'chinese') {
    return '语文';
  } else if (subEngName === 'Physics' || subEngName === 'physics') {
    return '物理';
  } else if (subEngName === 'Chemistry' || subEngName === 'chemistry') {
    return '化学';
  } else if (subEngName === 'Biology' || subEngName === 'biology') {
    return '生物';
  } else if (subEngName === 'Geography' || subEngName === 'geography') {
    return '地理';
  } else if (subEngName === 'History' || subEngName === 'history') {
    return '历史';
  } else if (subEngName === 'Politics' || subEngName === 'politics') {
    return '政治';
  } else if (subEngName === 'Art' || subEngName === 'art') {
    return '艺术';
  } else if (subEngName === 'Science' || subEngName === 'science') {
    return '科学';
  } else if (subEngName === 'Others' || subEngName === 'others') {
    return '其他';
  } else if (subEngName === 'music') {
    return '音乐';
  } else if (subEngName === 'li') {
    return '理综';
  } else if (subEngName === 'wen') {
    return '文综';
  } else if (subEngName === 'computer_science') {
    return '信息技术';
  } else if (subEngName === 'math_wen') {
    return '文数';
  } else if (subEngName === 'math_li') {
    return '理数';
  } else if (subEngName === 'japanese') {
    return '日语';
  } else if (subEngName === 'russian') {
    return '俄语';
  } else if (subEngName === 'daode_fazhi') {
    return '道德与法治';
  } else if (subEngName === 'shufa') {
    return '书法';
  } else if (subEngName === 'fine_art') {
    return '美术';
  } else if (subEngName === 'administrative_aptitude_test') {
    return '行测';
  } else {
    return subEngName;
  }
};

export const getSubjectEnglishName = (chnName) => {
  if (chnName === '语文') return 'chinese';
  else if (chnName === '数学') return 'math';
  else if (chnName === '英语') return 'english';
  else if (chnName === '物理') return 'physics';
  else if (chnName === '化学') return 'chemistry';
  else if (chnName === '生物') return 'biology';
  else if (chnName === '地理') return 'geography';
  else if (chnName === '历史') return 'history';
  else if (chnName === '政治') return 'politics';
  else if (chnName === '艺术') return 'art';
  else if (chnName === '科学') return 'science';
  else if (chnName === '其他') return 'others';
  else if (chnName === '音乐') return 'music';
  else if (chnName === '理综') return 'li';
  else if (chnName === '文综') return 'wen';
  else if (chnName === '信息技术') return 'computer_science';
  else if (chnName === '文数') return 'math_wen';
  else if (chnName === '理数') return 'math_li';
  else if (chnName === '日语') return 'japanese';
  else if (chnName === '俄语') return 'russian';
  else if (chnName === '道德与法治') return 'daode_fazhi';
  else if (chnName === '书法') return 'shufa';
  else if (chnName === '美术') return 'fine_art';
  else if (chnName === '行测') return 'administrative_aptitude_test';
  else {
    return chnName;
  }
};

export const getStageChineseName = (stageEngName) => {
  if (stageEngName === 'Primary' || stageEngName === 'primary') {
    return '小学';
  } else if (stageEngName === 'Junior' || stageEngName === 'junior') {
    return '初中';
  } else if (stageEngName === 'Senior' || stageEngName === 'senior') {
    return '高中';
  } else if (stageEngName === 'civil_servant_examination') {
    return '公务员考试';
  } else {
    return stageEngName;
  }
};

export const getStageEnglishName = (stageChName) => {
  if (stageChName === '小学') return 'primary';
  else if (stageChName === '初中') return 'junior';
  else if (stageChName === '高中') return 'senior';
  else if (stageChName === '公务员考试') return 'civil_servant_examination';
  else {
    return stageChName;
  } 
};

export const getWorkers = (workers) => {
  const all = {
    task_edit_reviser: {},
    task_check_reviser: {}
  }
  workers.forEach(item => {
    if (item.step.match('task_edit_reviser') !== null) {
      all.task_edit_reviser[item.step] = []
    } else if (item.step.match('task_check_reviser') !== null) {
      all.task_check_reviser[item.step] = []
    } else {
      all[item.step] = []
    }
  })
  workers.forEach(item => {
    if (item.step.match('task_edit_reviser') !== null) {
      if (item.ower_name !== '' && !all.task_edit_reviser[item.step].includes(item.ower_name)) {
        all.task_edit_reviser[item.step].push(item.ower_name);
      }
    } else if (item.step.match('task_check_reviser') !== null) {
      if (item.ower_name !== '' && !all.task_check_reviser[item.step].includes(item.ower_name)) {
        all.task_check_reviser[item.step].push(item.ower_name);
      }
    } else {
      if (item.ower_name !== '' && !all[item.step].includes(item.ower_name)) {
        all[item.step].push(item.ower_name)
      }
    }
  })
  return all;
}

/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
export const toChinesNum = (num) => {
  let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
  let unit = ['', '十', '百', '千', '万']
  num = parseInt(num)
  let getWan = (temp) => {
    let strArr = temp.toString().split('').reverse()
    let newNum = ''
    let newArr = []
    strArr.forEach((item, index) => {
      if (item === '0') newArr.unshift(changeNum[item]);
      if (item === '1' && index === 1 && strArr.length === 2) newArr.unshift(unit[index]);
      else newArr.unshift(changeNum[item] + unit[index]);
    })
    let numArr = []
    newArr.forEach((m, n) => {
      if (m !== '零') numArr.push(n)
    })
    if (newArr.length > 1) {
      newArr.forEach((m, n) => {
        if (newArr[newArr.length - 1] === '零') {
          if (n <= numArr[numArr.length - 1]) {
            newNum += m
          }
        } else {
          newNum += m
        }
      })
    } else {
      newNum = newArr[0]
    }

    return newNum
  }
  let overWan = Math.floor(num / 10000)
  let noWan = num % 10000
  if (noWan.toString().length < 4) {
    noWan = '0' + noWan
  }
  return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}

export const listToTree = (data) => {
  data.forEach(item => {
    item.children = [];
    item.node_parent_id = '';
  })
  for (let i = 0; i < data.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (data[j].node_level < data[i].node_level) {
        data[i].node_parent_id = data[j].node_id;
        data[j].children.push(data[i]);
        break;
      }
    }
  }
  return data.filter(item => item.node_parent_id === '');
}