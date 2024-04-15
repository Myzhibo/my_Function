export function treeIterate(data, parent, cb, option) {
  const label = (option && option.label) || 'children';
  data.forEach(item => {
    cb(item, parent);
    if (item[label]) {
      treeIterate(item[label], item, cb, option);
    }
  });
}

export function leftTimeFormatter(time) {
  time = getLeftTime(time);
  if (isNaN(+time)) {
    return '--';
  }
  time = Math.abs(time);
  const seconds = time % 60;
  const allminutes = (time - seconds) / 60;
  const minutes = allminutes % 60;
  const allHours = (allminutes - minutes) / 60;
  const hours = allHours % 24;
  const day = (allHours - hours) / 24;
  return `${day}天${hours}小时${minutes}分`;
}

function getLeftTime(time) {
  const now = new Date();
  const end = new Date(time);
  const leftTime = Math.floor((end - now) / 1000);
  return leftTime;
}

export function tiff2Jpg(str) {
  if (!str) {
    return str;
  }
  return str.replace(/src=(['"])(.*?)(\.tif[f]{0,1})\1/g, 'src=$1$2$3?x-oss-process=image/interlace,1/format,jpg$1');
}

export function tiff2JpgReset(str) {
  if (!str) {
    return str;
  }
  return str.replace(
    /src=(['"])(.*?)(\.tif[f]{0,1})(\?x-oss-process=image\/interlace,1\/format,jpg)\1/g,
    'src=$1$2$3$1'
  );
}

export function copyclip(text) {
  const textArea = document.createElement('textarea');
  textArea.style.position = 'fixed';
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.width = '2em';
  textArea.style.height = '2em';
  textArea.style.padding = '0';
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';
  textArea.style.background = 'transparent';
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  try {
    document.execCommand('copy');
  } catch (err) {
    console.log(err);
  }
  document.body.removeChild(textArea);
}
