<template>
  <div>
    <div style="width: 100%; height: 40px; display: flex; justify-content: space-between">
      <div style="width: 90%">
        <div v-if="route.query.name">{{ route.query.name }}</div>
        <div v-else>{{ state.projectInfo.name }}</div>
      </div>
      <div style="width: 10%; white-space: nowrap; position: relative">
        <span style="position: absolute; right: 0px">共计 {{ filterShowImages.length }} 张图片</span>
      </div>
    </div>

    <div v-if="filterShowImages">
      <!-- <div class="dynamic_gap" style="width: 100%; height: 90%; display: flex; flex-wrap: wrap; overflow: auto; background-color:pink"> -->
      <div id="bigDiv" style="width: 100%; height: 90%; display: flex; flex-wrap: wrap; overflow: auto">
        <!-- <div style="width: 100%; height:90%; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); row-gap: 15px; column-gap: 0; overflow: auto;"> -->
        <div
          v-for="(image, index) in filterShowImages"
          :key="index"
          :style="{
            'margin-right': (index + 1) % 6 === 0 ? '' : theGap + 'px',
            'margin-bottom': theGap + 'px',
            height: theHeight + 'px',
            width: theHeight + 'px'
          }"
          style="
            display: flex;
            justify-content: center;
            align-self: center;
            position: relative;
            border: 1px solid #ddd;
            box-sizing: border-box;
          "
          @mouseover="hoverImage(image._id, index)"
          @mouseleave="leaveImage"
        >
          <!-- 对于某些布局，你可能希望图片填充整个 <div> 的尺寸，同时仍然保持其纵横比。在这种情况下，可以使用 object-fit 属性。-->
          <img
            :src="
              image.tif_image?.image_url
                ? image.tif_image.image_url + '?x-oss-process=image/interlace,1/format,jpg'
                : image.jpg_image.image_url
            "
            alt=""
            style="width: 100%; height: 100%; object-fit: contain"
          />
          <div v-if="imageName === image._id && imageIndex === index">
            <!-- <div
              class="mybutton0"
              @click="copyImage(image)">
                <IconifyIconOffline icon="copy-document" class="myIcon" />
                <b>复制</b>
            </div> -->
            <div class="mybutton1" @click="downloadImage(image)">
              <IconifyIconOffline icon="download" class="myIcon" />
              <b>下载</b>
            </div>
            <div class="mybutton2" @click="handleTag(image)">
              <IconifyIconOffline icon="collection" class="myIcon" />
              <b>打标</b>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <el-empty
        description="暂无任务"
        style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)"
      />
    </div>
    <br /><br />

    <div class="myDialog">
      <el-dialog v-model="dialogVisible" title="打标签" width="40%" :before-close="handleClose">
        <el-cascader
          v-model="tagSelect"
          placeholder="选择标签"
          :options="filterTags"
          :props="{ multiple: true }"
          filterable
          style="width: 85%"
        />
        <template #footer>
          <div class="dialog-footer">
            <div style="width: 92%">
              <el-button @click="handleClose">取消</el-button>
              <el-button type="primary" @click="handleConfirm">确定</el-button>
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
    <div>
      <el-dialog v-model="dialogVisible_down" title="下载文件" width="50%" :before-close="handleClose_down">
        <div>
          选择需要下载的文件：<br /><br />
          <div style="display: flex; justify-content: flex-start; align-items: center">
            <ul style="width: 100%">
              <li v-for="item of state.preDownloadFiles" :key="item.url">
                <div
                  class="hoverMe"
                  style="
                    display: flex;
                    min-height: 35px;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #eee;
                    border-radius: 4px;
                    font-size: 14px;
                    margin-bottom: 5px;
                    cursor: pointer;
                    padding: 4px 5px;
                  "
                  @click="download(item.url)"
                >
                  <!-- <span style="font-size: 16px; font-weight: 700; margin-right: 10px"> · </span> -->
                  <span>{{ item.name }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <div style="width: 92%">
              <!-- <el-button type="primary" @click="handleConfirm">全部下载</el-button> -->
            </div>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import { Search, RefreshRight } from '@element-plus/icons-vue';
// import { findWrappedNode } from 'src/utils/json';
// import { getOneProject, getTags, markTags, getImages } from '@/api/wareHouse';
import Upload from './components/Upload.vue';

const route = useRoute();
const routers = useRouter().options.routes;

const content = ref('');
const state = reactive({
  // images: [
  //   "./test.png",
  //   "./test.png",
  //   "./test.png",
  // ],
  images: [],
  projectInfo: {},
  types: [],
  preDownloadFiles: []
});
const projectInfo = reactive({});

const theHeight = ref(0); // 初始高度设置为 0
const theGap = ref(0);
const bigDiv = ref(null); // 使用 ref 来引用 bigDiv 元素    // 和vue2的 this.refs.bigDiv 一样    // #获取ref #获取refs 

// 更新 div 高度的方法
function updateDivHeight() {
  const bigDiv = document.getElementById('bigDiv');
  const widthInPixels = bigDiv.offsetWidth;
  theHeight.value = Math.floor(widthInPixels * 0.16); // 高度和宽度一样，按照一行 6 个来算
  theGap.value = Math.floor((widthInPixels - widthInPixels * 0.16 * 6) / 5);
}

// 窗口大小变化时的处理函数
function handleResize() {
  updateDivHeight();
}

onMounted(async () => {
  // 组件挂载时初始化高度
  updateDivHeight();
  // 添加窗口大小变化的事件监听器
  window.addEventListener('resize', handleResize);

  //
  // if (route.query.fromTagPage) {
  //   const res: any = await getImages({
  //     tag_name: route.query.tagName
  //   });
  //   state.images = res.data;
  //   const tagRes: any = await getTags();
  //   state.types = tagRes.data;
  // } else {
  //   const res: any = await getOneProject({
  //     project_id: route.query._id,
  //     has_images: true
  //   });
  //   state.projectInfo = res.data;
  //   state.images = res.data.image_list;
  //   const tagRes: any = await getTags();
  //   state.types = tagRes.data;
  // }
});

const filterShowImages = computed(() => {
  console.log(state.images);
  
  return state.images.length > 0 ? 
        state.images :
        [{_id:1, jpg_image:{image_url:'./test2.jpg'}},
        {_id:2, jpg_image:{image_url:'./test2.jpg'}},
        {_id:3, jpg_image:{image_url:'./test2.jpg'}},
        {_id:4, jpg_image:{image_url:'./test2.jpg'}},
        {_id:5, jpg_image:{image_url:'./test2.jpg'}},
        {_id:6, jpg_image:{image_url:'./test2.jpg'}},
        {_id:7, jpg_image:{image_url:'./test2.jpg'}},
        {_id:8, jpg_image:{image_url:'./test2.jpg'}},
        {_id:9, jpg_image:{image_url:'./test2.jpg'}},
        {_id:10, jpg_image:{image_url:'./test2.jpg'}},
        ];
});
const filterTags = computed(() => {
  const r = state.types.map(item => {
    return {
      label: item.name,
      value: item._id,
      children: item.children.map(child => ({ label: child.name, value: child._id }))
    };
  });
  return r;
});

// 鼠标经过图片
const imageName = ref('');
const imageIndex = ref('');
function hoverImage(imageId, index) {
  imageName.value = imageId;
  imageIndex.value = index;
}
function leaveImage() {
  imageName.value = '';
  imageIndex.value = '';
}

// 复制
const fetchImageAsBlob = async imageSrc => {
  const response = await fetch(imageSrc);
  const blob = await response.blob();
  return blob;
};

const convertBlobToBase64 = blob => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
async function copyImage(image) {
  // console.log(image.image_url + '?x-oss-process=image/interlace,1/format,jpg');
  try {
    const imageBlob = await fetchImageAsBlob(image.image_url);
    // console.log(1, imageBlob);
    const base64 = await convertBlobToBase64(imageBlob);
    // console.log(2, base64);
    if (!navigator.clipboard || !navigator.clipboard.write) {
      throw new Error('浏览器不支持 clipboard.write API');
    }
    // let clipboard = navigator.clipboard || {
    //       writeText: (base64) => {
    //         let copyInput = document.createElement('input');
    //         copyInput.value = base64;
    //         document.body.appendChild(copyInput);
    //         copyInput.select();
    //         document.execCommand('copy');
    //         document.body.removeChild(copyInput);
    //       }
    //     }
    // if (clipboard) {
    //   await clipboard.writeText(base64);
    //   // this.$message.success('复制成功');
    // }

    // await navigator.clipboard.writeText(base64);
    alert('图片已复制到剪贴板');
  } catch (error) {
    console.error('复制图片到剪贴板时出错:', error);
    alert('复制图片失败');
  }
}

/**
 * 下载
 * @param image
 */
async function downloadImage(image: any) {
  const needDownImages = [];
  if (image['jpg_image']?.image_url) needDownImages.push({ url: image['jpg_image'].image_url });
  if (image['tif_image']?.image_url) needDownImages.push({ url: image['tif_image'].image_url });
  if (image['eps_image']?.image_url) needDownImages.push({ url: image['eps_image'].image_url });
  if (image['ai_image']?.image_url) needDownImages.push({ url: image['ai_image'].image_url });
  if (image['cdr_image']?.image_url) needDownImages.push({ url: image['cdr_image'].image_url });
  needDownImages.forEach(item => (item.name = item.url.split('/')[item.url.split('/').length - 1]));
  state.preDownloadFiles = needDownImages;
  dialogVisible_down.value = true;
}
async function download(theUrl) {
  // console.log(theUrl);
  try {
    // console.log(theUrl);
    const response = await fetch(theUrl);
    if (!response.ok) {
      throw new Error('网络响应失败.. ');
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = theUrl.split('/').pop().split('?')[0];
    document.body.appendChild(a);
    a.click(); // 触发下载
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
}

function handleClose() {
  dialogVisible.value = false;
}
function handleClose_down() {
  dialogVisible_down.value = false;
}

const imageId = ref('');
const dialogVisible = ref(false);
const dialogVisible_down = ref(false);

const tagSelect = ref('');
const props1 = { checkStrictly: true };
function handleTag(image) {
  let tags = image.tags; // 标签 _id 的列表
  tags = tags
    // .map(tid => {
    //   const tag = findWrappedNode(filterTags.value, (t: any) => t.node.value === tid, { path: true });
    //   if (!tag) return;
    //   return tag.path.map(t => t.value);
    // })
    .filter(t => !!t);
  tagSelect.value = tags;
  imageId.value = image._id;
  dialogVisible.value = true;
}
// 打标
async function handleConfirm() {
  const tags = tagSelect.value.map(path => path[path.length - 1]); // 这里 put 叶节点的 _id 即可
  await markTags({
    tags: tags,
    image_id: imageId.value
  });
  ElMessage({message: '打标成功', type: 'success',});
  state.images.find(img => img._id === imageId.value).tags = tags;
  dialogVisible.value = false;
}
</script>

<style lang="scss" scoped>
// .dynamic_gap{
//   gap: 52px;
// }
// @media screen and (min-width: 1460px) and (max-width: 1696px) {
//   .dynamic_gap {
//     gap: 30px;
//   }
// }
// @media screen and (man-width: 1460px) {
//   .dynamic_gap {
//     gap: 45px;
//   }
// }
.mybutton0 {
  display: flex;
  position: absolute;
  top: 45%;
  left: 38%;
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid #999;
  color: black;
  background-color: white;
  padding: 4px 6px;
}
.mybutton1 {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 75%;
  left: 7%;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #999;
  color: black;
  background-color: white;
  padding: 4px 0;
  width: 65px;
}
.mybutton2 {
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  position: absolute;
  top: 75%;
  right: 7%;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #999;
  color: black;
  background-color: white;
  padding: 4px 0;
  width: 65px;
}
.myIcon {
  margin-right: 3px;
}
@media screen and (max-width: 6000px) {
  .mybutton0 {
    width: 150px;
    font-size: 30px;
  }
  .mybutton1 {
    width: 150px;
    font-size: 30px;
  }
  .mybutton2 {
    width: 150px;
    font-size: 30px;
  }
}
@media screen and (max-width: 5000px) {
  .mybutton0 {
    width: 120px;
    font-size: 24px;
  }
  .mybutton1 {
    width: 120px;
    font-size: 24px;
  }
  .mybutton2 {
    width: 120px;
    font-size: 24px;
  }
}
@media screen and (max-width: 3000px) {
  .mybutton0 {
    width: 100px;
    font-size: 20px;
  }
  .mybutton1 {
    width: 100px;
    font-size: 20px;
  }
  .mybutton2 {
    width: 100px;
    font-size: 20px;
  }
}
@media screen and (max-width: 2000px) {
  .mybutton0 {
    width: 60px;
    font-size: 10px;
  }
  .mybutton1 {
    width: 60px;
    font-size: 10px;
  }
  .mybutton2 {
    width: 60px;
    font-size: 10px;
  }
}
@media screen and (max-width: 1400px) {
  .mybutton0 {
    width: 45px;
    font-size: 8px;
  }
  .mybutton1 {
    width: 45px;
    font-size: 8px;
  }
  .mybutton2 {
    width: 45px;
    font-size: 8px;
  }
  .myIcon {
    margin-right: 2px;
  }
}
@media screen and (max-width: 1100px) {
  .mybutton0 {
    width: 35px;
    font-size: 6px;
  }
  .mybutton1 {
    width: 35px;
    font-size: 6px;
  }
  .mybutton2 {
    width: 35px;
    font-size: 6px;
  }
  .myIcon {
    margin-right: 2px;
  }
}
@media screen and (max-width: 800px) {
  .mybutton0 {
    width: 32px;
    font-size: 5px;
  }
  .mybutton1 {
    width: 32px;
    font-size: 5px;
  }
  .mybutton2 {
    width: 32px;
    font-size: 5px;
  }
  .myIcon {
    margin-right: 2px;
  }
}
@media screen and (max-width: 600px) {
  .mybutton0 {
    width: 25px;
    font-size: 3px;
    height: 12px;
  }
  .mybutton1 {
    width: 25px;
    font-size: 3px;
    height: 12px;
  }
  .mybutton2 {
    width: 25px;
    font-size: 3px;
    height: 12px;
  }
  .myIcon {
    margin-right: 2px;
  }
}
@media screen and (max-width: 400px) {
  .mybutton0 {
    width: 16px;
    font-size: 3px;
    height: 10px;
    padding: 2px 2px;
  }
  .mybutton1 {
    width: 16px;
    font-size: 3px;
    height: 10px;
    padding: 2px 2px;
  }
  .mybutton2 {
    width: 16px;
    font-size: 3px;
    height: 10px;
    padding: 2px 2px;
  }
  .myIcon {
    margin-right: 1px;
  }
}

.column-list {
  // column-count: 6;
  column-width: 125px;
  list-style-type: none;
  column-gap: 50px;
  padding: 0;
  margin: 0;

  width: 100%;
  // height: 100%;
}

// .container {
//   height: 100%;
//   width: 100%;

//   &-content {
//     height: calc(100% - 60px);
//   }
// }

.text-primary {
  color: #48638f;
}

.myDialog {
  ::v-deep .el-dialog__body {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

// ::v-deep .el-input__wrapper {
//   height: 40px;
// }

.hoverMe:hover {
  color: #4f4fed;
}
</style>
