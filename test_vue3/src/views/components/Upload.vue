<template>
  <div class="_container">
    <div class="flex-center" style="justify-content: space-between; margin-top: 10px" />
    <div class="project-item">
      <div class="body">
        <div style="display: flex; align-items: center; justify-content: space-between">
          <div>
            <el-button @click="selectImage">选择zip文件</el-button>
            <!-- <el-button type="primary" @click="uploadImage" :loading="imageUploadLoading"
                    >上传{{ imageUploadLoading ? `中(${uploadProgress.toFixed(2)}%)` : "" }}</el-button
                  > -->
            <el-button type="primary" @click="uploadImage" :loading="imageUploadLoading">
              上传{{ imageUploadLoading ? `中` : '' }}
            </el-button>
          </div>
          <div style="color: #999; font-size: 12px">已选择{{ fileList.data.length }}个文件</div>
        </div>
        <!-- table -->
        <PlaceOrderList
          :imageLoading="imageLoading"
          :fileList="imageListData"
          :zipInnerFiles="zipInnerFiles"
          :showLength="false"
          @delete-image="deleteImage"
          @checkResult="checkResult"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import Oss from 'ali-oss';
import { ref, reactive, computed, defineProps } from 'vue';
import type { UploadInstance } from 'element-plus';
import { selectFile } from '../../utils/fileApis';
import { getFileMd5 } from '../../utils/helper';
// import { message } from '@pureadmin/components';
import { ElMessage, ElMessageBox } from 'element-plus';
import PlaceOrderList from './PlaceOrderList.vue';

// import { getFileSysInfo, checkMd5, createFile } from '@/api/workOrder';
import { asyncPool } from 'src/utils/utils';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

import JSZip from 'jszip';

const uploadRef = ref<UploadInstance>();
interface Emits {
  (e: 'update:value', val: boolean): void;
}
const emit = defineEmits<Emits>();
const route = useRoute();
const routers = useRouter().options.routes;

const props = defineProps({
  otherInfo: {
    type: Object,
    default: () => {}
  },
  needCheckZipContentFile: {
    type: Boolean,
    default: false
  },
  allowSelectFilesNumber: {
    type: Number,
    default: -1 // -1 一次性选择任意数量 , 0 不允许选择,   >0 一次选择xx个文件
  },
  allowUploadFilesNumber: {
    type: Number,
    default: -1 // -1 一次性全部上传 , 0 不允许上传,   >0 一次允许上传xx个文件
  }
});

// 上传文件逻辑
let fileList = reactive({ data: [] });
const imageListData = computed(() => {
  return fileList.data.filter(item => {
    // console.log(item);
    return item;
  });
});

let imageLoading = ref(false);
let imageUploadLoading = ref(false);
const uploadProgress = ref(0);

// const errorZipName = reactive([]);
const zipInnerFiles = reactive([]);

// 检查zip包内文件的后缀
function checkSelectedFile(files) {
  for (let zipFile of files) {
    // @tips：这里需要注意中文乱码的问题！！！
    const fileReader = new FileReader();
    const decoder = new TextDecoder('gbk');
    fileReader.readAsArrayBuffer(zipFile);
    fileReader.onload = function () {
      new JSZip()
        .loadAsync(fileReader.result, {
          decodeFileName: bytes => {
            return decoder.decode(bytes as any);
          }
        })
        .then(zip => {
          // 遍历ZIP包内的所有条目
          let suffix = [];
          Object.keys(zip.files).forEach(fileName => {
            const file = zip.files[fileName];
            // 过滤掉不需要展示的文件（e.g. ini
            if (!/\.(jpg|cdr|ai|tif|eps)/i.test(file.name)) {
              return;
            }
            // 检查条目后缀，把当前文件后缀存入数组
            suffix.push({
              zipName: zipFile.name,
              name: file.name.split('.').slice(0, -1).join(''),
              fileName: file.name,
              filesSuffix: file.name.split('.')[file.name.split('.').length - 1]
            });
            // // 检查条目是否是文件夹
            // if (file.dir) {
            //   // 获取文件夹名称（不包括路径）
            //   const folderName = path.basename(fileName);
            // }
          });
          zipInnerFiles.push(suffix);
          // if (route.path === '/warehouse/uploadbook' && suffix.some(item => item.filesSuffix === 'jpg')) {
          //   // 说明应该在[试卷上传]页面上传, 把压缩包名通知给子组件显示错误
          //   errorZipName.push(suffix[0].zipName);
          // }
          // if (route.path === '/warehouse/uploadpaper' && suffix.every(item => item.filesSuffix !== 'jpg')) {
          //   // 说明应该在[书籍上传]页面上传, 把压缩包名通知给子组件显示错误
          //   errorZipName.push(suffix[0].zipName);
          // }
        })
        .catch(error => {
          console.error('Error reading ZIP file:', error);
        });
    };
  }
}

let checkFilesResult = reactive({});
function checkResult(result) {
  // console.log('======>>>>>>', result);
  checkFilesResult = result;
}

async function selectImage() {
  try {
    selectFile(
      {
        accept: '.zip',
        multiple: true
      },
      async files => {
        imageLoading.value = true;
        if (files.some(file => !/^((?!\\|\/|:|\*|\?|"|<|>|\||').)*$/g.test(file.name))) {
          ElMessage({message: '存在非法字符\\ / : * ? " < > | \' ', type: 'warning',});
          imageLoading.value = false;
          return;
        }
        files = files.filter(f => /\.(zip)$/i.test(f.name));
        if (!files.length) {
          ElMessage({message: '请上传以.zip后缀格式文件！', type: 'warning',});
          imageLoading.value = false;
          return;
        }
        const preLen = files.length;
        files = files.filter(f => !fileList.data.find(item => item.name === f.name));
        if (preLen !== files.length) {
          ElMessage({message: '当前文件已被选择', type: 'warning',});
        }

        if (props.allowSelectFilesNumber > 0) {
          // 判断当前已经选择了的文件
          if (fileList.data.length >= props.allowSelectFilesNumber) {
            ElMessage({message: `一次仅可上传 ${props.allowSelectFilesNumber} 个zip`, type: 'warning',});
            imageLoading.value = false;
            return false;
          }
        } else if (props.allowSelectFilesNumber === 0) {
          // 不允许选择
          return false;
        }

        if (props.needCheckZipContentFile) {
          checkSelectedFile(files); // @todo：这里现在是异步方法，可能要看看
        }

        for (const file of files) {
          let name = file.name.split('.');
          const extension = name[name.length - 1]?.toLowerCase();
          name = name.join('.');
          let size = ~~(+file.size / 1024);
          const item = {
            file,
            name,
            extension,
            size,
            md5: await getFileMd5(file),
            uploadStatus: 'init',
            progress: 0,
            errorInfo: '',
            desc: '',
            path: ''
          };
          fileList.data.push(item);
        }
        imageLoading.value = false;
        emit('select', fileList.data);
      }
    );
  } catch (e) {
    console.log(e);
  }
}

function beforeUpload() {
  let RequiredPrompt = [];
  // 获取没有填写内容的必填项
  for (let item in props.otherInfo) {
    if (props.otherInfo[item] === '') RequiredPrompt.push(item);
  }
  RequiredPrompt = [...new Set(RequiredPrompt)];
  // 传给父组件
  emit('RequiredPrompt', RequiredPrompt);
  if (RequiredPrompt.length) {
    return false;
  } else {
    return true;
  }
}
async function uploadImage() {
  if (props.otherInfo) {
    const res = beforeUpload();
    if (!res) {
      ElMessage({message: '请填写必填项', type: 'warning',});
      return false;
    }
  }
  if (fileList.data.length === 0) {
    ElMessage({message: '请选择zip文件', type: 'warning',});
    return false;
  }

  // console.log('ok', fileList);

  let fileListUpload = fileList.data.filter(item => item.uploadStatus === 'init');
  // console.log('ok', fileListUpload);
  if (fileListUpload.length === 0) {
    ElMessage({message: '当前列表中文件已全部上传完毕', type: 'warning',});
    return false;
  }

  // const zipInnerFilesSuffix = zipInnerFiles?.[0]?.map(item => item.filesSuffix);
  // // 判断压缩包内文件是否满足条件
  // if (
  //   route.path === "/warehouse/uploadbook" &&
  //   (zipInnerFilesSuffix?.includes("tif") &&
  //     zipInnerFilesSuffix?.includes("eps") &&
  //     !zipInnerFilesSuffix?.includes("jpg") &&
  //     (zipInnerFilesSuffix?.includes("cdr") || zipInnerFilesSuffix?.includes("ai"))) === false
  // ) {
  //   ElMessage({message: 'zip包不满足上传条件', type: 'warning',});
  //   return false;
  // } else if (
  //   route.path === "/warehouse/uploadpaper" &&
  //   (zipInnerFilesSuffix?.includes("tif") &&
  //     zipInnerFilesSuffix?.includes("eps") &&
  //     zipInnerFilesSuffix?.includes("jpg") &&
  //     (zipInnerFilesSuffix?.includes("cdr") || zipInnerFilesSuffix?.includes("ai"))) === false
  // ) {
  //   ElMessage({message: 'zip不满足上传条件', type: 'warning',});
  //   return false;
  // }
  // console.log(checkFilesResult.ifMeetCondition);

  if (!checkFilesResult.ifMeetCondition) {
    ElMessage({message: 'zip不满足上传条件', type: 'warning',});
    return false;
  }

  // 判断一次可以上传几个文件
  if (props.allowUploadFilesNumber > 0) {
    fileListUpload = fileListUpload.splice(0, props.allowUploadFilesNumber); // 返回被splice的数组
  } else if (props.allowUploadFilesNumber === -1) {
    fileListUpload = fileListUpload;
  } else {
    ElMessage({message: '不允许上传！', type: 'warning',});
    return false;
  }

  await ElMessageBox.confirm('确认上传文件', '提示', {
    confirmButtonText: '提交',
    cancelButtonText: '取消',
    // type: 'info'
  });
  // message.success(`开始上传文件 ${props.allowUploadFilesNumber>0 ? `,  *一次仅可上传${props.allowUploadFilesNumber}个文件` :''}`);
  ElMessage({message: '开始上传文件', type: 'success',});
  // imageUploadLoading.value = true;
  // const res = await getFileSysInfo();
  // const { access_key_id, access_key_secret_id, bucket, key, region } = res as any;
  // let client = new Oss({
  //   region,
  //   accessKeyId: access_key_id,
  //   accessKeySecret: access_key_secret_id,
  //   bucket
  // });

  // for (const item of fileListUpload) {
  //   try {
  //     item.uploadStatus = 'ing';
  //     item.progress = 0;
  //     // 上传
  //     const material = await checkMd5(item.md5);
  //     const { path } = material as any;
  //     // 如果path已经存在说明已经上传过该文件，无需再次上传
  //     if (path) {
  //       console.log('已经上传过');
  //       item.progress = 100;
  //       item.uploadStatus = 'success';
  //       uploadProgress.value += 100 / fileListUpload.length;
  //       emit('uploadFinish', `https://hexin-worksheet.oss-cn-shanghai.aliyuncs.com/${key}/${item.md5}.${item.extension}`);
  //       continue;
  //     }

  //     await client.multipartUpload(`${key}/${item.md5}.${item.extension}`, item.file, {
  //       parallel: 4,
  //       partSize: 500 * 1024,
  //       timeout: 4000000,
  //       progress: function (p: number) {
  //         item.progress = +(p * 100).toFixed(2);
  //       }
  //     });

  //     // console.log(`${key}/${item.md5}.${item.extension}`);
  //     // // 文件入库
  //     await createFile({
  //       md5: item.md5,
  //       name: item.file.name,
  //       extension: item.extension,
  //       path: `${key}/${item.md5}.${item.extension}`
  //     });
  //     item.uploadStatus = 'success';
  //     uploadProgress.value += 100 / fileListUpload.length;
  //     emit('uploadFinish', `https://hexin-worksheet.oss-cn-shanghai.aliyuncs.com/${key}/${item.md5}.${item.extension}`);
  //   } catch (e) {
  //     item.uploadStatus = 'error';
  //     uploadProgress.value += 100 / fileListUpload.length;
  //     console.log(item.file.name, e);
  //     message.error('上传文件失败！');
  //   } finally {
  //     //
  //   }
  // }
  // client = null;
  // imageUploadLoading.value = false;

  // 删掉表格里的zip
  deleteImage(0);
}

function deleteImage(index, name) {
  fileList.data.splice(index, 1);
  emit('select', fileList.data);

  // // 删除后重新检查Zip包内容, 看删掉的是不是被标记为 errorZipName 的文件
  // if (props.needCheckZipContentFile) {
  //   if (errorZipName.includes(name)) errorZipName.splice(errorZipName.findIndex(item => item === name), 1);
  // }
  // 把 zipInnerFiles 清空
  zipInnerFiles.splice(0, zipInnerFiles.length);
}
</script>

<style lang="scss" scoped>
._container {
  font-size: 15px;
  ::v-deep .el-button--text {
    padding: 0px;
  }
  .project-item {
    // border: 1px solid #ccc;
    // border-radius: 5px;
    // margin-top: 10px;
    // padding: 20px;
    ::v-deep .el-divider--horizontal {
      margin: 10px 0;
    }
    .header {
      ::v-deep .el-input__inner {
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.file-list {
  margin-top: 10px;
  .item {
    color: #777;
    height: 100%;
    line-height: 40px;
    padding-left: 20px;
    display: flex;
  }
}
.disable-file-list {
  .item {
    color: #777;
    padding-left: 20px;
    display: flex;
  }
}
</style>
