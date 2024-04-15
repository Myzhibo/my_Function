// @ts-ignore
import SparkMD5 from 'spark-md5';
// import { message } from '@pureadmin/components';
import { ElMessageBox } from 'element-plus';
export const getFileMd5 = async (file: File) => {
  // 这里需要用到File的slice( )方法，以下是兼容写法
  const blobSlice = File.prototype.slice;
  const chunkSize = 2097152; // 以每片2MB大小来逐次读取
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  let spark = new SparkMD5(); // 创建sparkMD5的实例
  let fileReader = new FileReader();
  const loadNext = async () => {
    const start = currentChunk * chunkSize;
    const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    await fileReader.readAsBinaryString(blobSlice.call(file, start, end));
  };
  return new Promise(resolve => {
    fileReader.onload = e => {
      spark.appendBinary((e as any).target.result); // append array buffer
      currentChunk += 1;
      if (currentChunk < chunks) {
        loadNext();
      } else {
        const md5 = spark.end();
        fileReader = null;
        spark = null;
        resolve(md5);
        return md5; // 完成计算，返回结果
      }
    };
    fileReader.onerror = () => {
      // message.error('读取文件MD5值失败！');
      ElMessage({message: '开始上传文件', type: 'error',});
    };
    loadNext();
  });
};

export const handleUrl = (url: string) => {
  const check = ['+'];
  check.forEach(item => {
    url = url.replace(item, encodeURIComponent(item));
  });
  return url;
};
