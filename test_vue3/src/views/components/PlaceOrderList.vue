<template>
  <div class="mt-2" v-if="showLength">共 {{ fileList.length }} 个文件</div>
  <div class="p-gallery-order-table">
    <el-table
      v-loading="imageLoading"
      :data="fileList"
      style="width: 100%"
      class="text-dark"
      tooltip-effect="dark"
      ref="multipleTable"
      max-height="50vh"
    >
      >
      <el-table-column width="80" align="center" label="序号">
        <template v-slot="scope">
          <span class="text-dark">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column width="220" align="left" label="文件名" prop="name">
        <template v-slot="scope">
            <div>{{ scope.row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" prop="status">
          <template v-slot:header="scope1">
            <div class="filter-creator" style="display: flex;">
              <el-select v-model="statusValue" placeholder="项目状态" size="small" @change="handleSearch"
                style="width:100px">
              <el-option
                v-for="item in [
                  {label: '全部', value: -1},
                  {label: '初始化', value: 0},
                  {label: '进行中', value: 1},
                  {label: '已完成', value: 2},
                  {label: '失败', value: 3},
                  {label: '入库失败', value: 4},
                ]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
          </template>
          <template v-slot:default="scope">
            <div>
              <div v-if="scope.row.status === 0" style="color: #999">初始化</div>
              <div v-if="scope.row.status === 1" style="color: #2727c5">进行中</div>
              <div v-if="scope.row.status === 2" style="color: green">已完成</div>
              <div v-if="scope.row.status === 3" style="color: #df2b2b">失败</div>
              <div v-if="scope.row.status === 4" style="color: #df2b2b">入库失败</div>
            </div>
          </template>
        </el-table-column>
      <el-table-column width="100" align="center" label="状态" prop="status">
        <template v-slot="scope">
          <div style="display: flex; justify-content: center">
            <div style="align-items: center" :style="{'margin-left': checkFilesSuffix.checkResult.ifMeetCondition ? '20px' : ''}">
              <el-tag
                size="small"
                :type="
                  !checkFilesSuffix.checkResult.ifMeetCondition
                    ? 'danger'
                    : scope.row.uploadStatus === 'init'
                    ? 'warning'
                    : scope.row.uploadStatus === 'ing'
                    ? ''
                    : scope.row.uploadStatus === 'success'
                    ? 'success'
                    : 'danger'
                "
              >
                {{
                  !checkFilesSuffix.checkResult.ifMeetCondition
                    ? '未通过'
                    : scope.row.uploadStatus === 'init'
                    ? '待上传'
                    : scope.row.uploadStatus === 'ing'
                    ? `上传中(${scope.row.progress}%)`
                    : scope.row.uploadStatus === 'success'
                    ? '上传成功'
                    : '异常失败'
                }}
              </el-tag>
            </div>
            <div class="text-dark" style="display: flex; position: relative; margin-left:20px; align-items: center">
              <!-- 1. 判断内表是否满足当前页面的文件格式需要  2. 判断/warehouse/uploadbook路由下是否含有不需要的jpg  -->
              <!-- '/warehouse/uploadbook' 需要有 tif 、 eps  以及 cdr 、 ai 的其中一个 -->
              <div
                v-if="route.path === '/warehouse/uploadbook' && !checkFilesSuffix.checkResult.ifMeetCondition"
                style="position: absolute; left: -18px"
              >
                <!-- <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 550px; max-height: 250px; overflow: auto">
                      不满足文件上传条件! <br /><br />
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_TIF">
                        - 缺少 "tif" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noTIF_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_EPS">
                        - 缺少 "eps" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noEPS_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_AIorCDR">
                        - 缺少 "ai" 或 "cdr" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noAIorCDR_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="checkFilesSuffix.checkResult.someGroupHasOne_JPG">
                        - 当前上传位置不能包含 "jpg" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.hasJPG_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                    </div>
                  </template>
                  <IconifyIconOffline icon="warning-filled" style="margin: 5px; color: orange" @click="handleWarningInfo" />
                </el-tooltip> -->
                <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 550px; max-height: 250px; overflow: auto">
                      点击查看不满足上传条件的文件
                    </div>
                  </template>
                  <IconifyIconOffline icon="warning-filled" style="margin: 5px; color: orange" @click="handleWarningInfo" />
                </el-tooltip>
              </div>
              <!-- '/warehouse/uploadpaper' 需要有 tif 、 eps 、 jpg  以及 cdr 、 ai 的其中一个 -->
              <div
                v-if="route.path === '/warehouse/uploadpaper' && !checkFilesSuffix.checkResult.ifMeetCondition"
                style="position: absolute; left: -18px"
              >
                <!-- <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 500px; max-height: 250px; overflow: auto">
                      不满足文件上传条件! <br /><br />
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_TIF">
                        - 缺少 "tif" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noTIF_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_EPS">
                        - 缺少 "eps" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noEPS_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_AIorCDR">
                        - 缺少 "ai" 或 "cdr" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noAIorCDR_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                      <span v-if="!checkFilesSuffix.checkResult.allGroupHasOne_JPG">
                        - 缺少 "jpg" 格式文件 <br />
                        <ul>
                          <li v-for="item of checkFilesSuffix.noMeetFileNames.noJPG_fileNames">
                            &nbsp;&nbsp;&nbsp;&nbsp; - {{ item }}
                          </li>
                        </ul>
                      </span>
                    </div>
                  </template>
                  <IconifyIconOffline icon="warning-filled" style="margin: 5px; color: orange" @click="handleWarningInfo" />
                </el-tooltip> -->
                <el-tooltip placement="top">
                  <template #content>
                    <div style="max-width: 550px; max-height: 250px; overflow: auto">
                      点击查看不满足上传条件的文件
                    </div>
                  </template>
                  <IconifyIconOffline icon="warning-filled" style="margin: 5px; color: orange" @click="handleWarningInfo" />
                </el-tooltip>
              </div>
            </div>
            <div v-if="!checkFilesSuffix.checkResult.ifMeetCondition" style="align-items: center; margin-left:5px" @click="handleWarningInfo">报错信息</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="100" align="center" label="大小" prop="size">
        <template v-slot="scope">
          <span v-if="+scope.row.size">
            <span v-if="+scope.row.size < 1024"> {{ ~~+scope.row.size + ' KB' }}</span>
            <span class="text-dark" v-else>{{ ~~(+scope.row.size / 1024) + ' MB' }}</span>
          </span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column width="120" align="center" label="操作">
        <template v-slot="scope">
          <div class="btns">
            <!-- <el-button link @click="editDesc(scope.row)">{{ scope.row.desc ? "已" : "" }}备注</el-button> -->
            <!-- <el-button link @click="download(scope.row)">下载</el-button> -->
            <el-button link @click="delImage(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-table v-if="fileList.length && childTableData" :data="childTableData" ref="nodeTable">
      <el-table-column width="120" align="center" label="文件名" prop="name">
        <template v-slot="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="TIF" prop="">
        <template v-slot="scope">
          <div style="display: flex; justify-content: center">
            <div v-if="scope.row.suffix.tif">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else>
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80" align="center" label="EPS" prop="">
        <template v-slot="scope">
          <div style="display: flex; justify-content: center">
            <div v-if="scope.row.suffix.eps">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else>
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 只有试卷才需要上传&检查 JPG 格式的图片，其他情况无视 -->
      <el-table-column width="80" align="center" label="JPG" prop="" v-if="route.path === '/warehouse/uploadpaper'">
        <template v-slot="scope">
          <div style="display: flex; justify-content: center">
            <div v-if="scope.row.suffix.jpg && route.path === '/warehouse/uploadbook'">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else-if="!scope.row.suffix.jpg && route.path === '/warehouse/uploadbook'">
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
            <div v-else-if="scope.row.suffix.jpg && route.path === '/warehouse/uploadpaper'">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else-if="!scope.row.suffix.jpg && route.path === '/warehouse/uploadpaper'">
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="80" align="center" label="CDR" prop="">
        <template v-slot="scope">
          <div style="margin-left: 50px">
            <div v-if="scope.row.suffix.cdr">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else>
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column> -->
      <!-- <el-table-column width="80" align="center" label="AI" prop="">
        <template v-slot="scope">
          <div style="margin-left: 50px">
            <div v-if="scope.row.suffix.ai">
              <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
            </div>
            <div v-else>
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="80" align="center" label="CDR/AI" prop="">
        <template v-slot="scope">
          <div style="display: flex; gap: 5px; justify-content: center">
            <div
              v-if="scope.row.suffix.cdr"
              style="
                background: #c3f3cb;
                color: #198061;
                font-weight: 700;
                align-items: center;
                justify-content: center;
                display: flex;
                width: 70px;
                height: 30px;
              "
            >
              CDR
              <IconifyIconOffline icon="check" />
            </div>
            <div
              v-if="scope.row.suffix.ai"
              style="
                background: #c3f3cb;
                color: #198061;
                font-weight: 700;
                align-items: center;
                justify-content: center;
                display: flex;
                width: 70px;
                height: 30px;
              "
            >
              AI
              <IconifyIconOffline icon="check" />
            </div>
            <div v-if="!scope.row.suffix.ai && !scope.row.suffix.cdr">
              <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <br />


  <div>
    <el-dialog v-model="visible_warningTable" title="以下文件不满足上传条件: " width="80%" :before-close="handleCloseWarningTable">
      <div>
        <div style="display: flex; justify-content: flex-start; align-items: center">
          <el-table v-if="fileList.length && warningTableData" :data="warningTableData" ref="nodeTable">
            <el-table-column width="120" align="center" label="文件名" prop="name">
              <template v-slot="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="TIF" prop="">
              <template v-slot="scope">
                <div style="display: flex; justify-content: center">
                  <div v-if="scope.row.suffix.tif">
                    <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
                  </div>
                  <div v-else>
                    <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="EPS" prop="">
              <template v-slot="scope">
                <div style="display: flex; justify-content: center">
                  <div v-if="scope.row.suffix.eps">
                    <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
                  </div>
                  <div v-else>
                    <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
                  </div>
                </div>
              </template>
            </el-table-column>
            <!-- 只有试卷才需要上传&检查 JPG 格式的图片，其他情况无视 -->
            <el-table-column width="80" align="center" label="JPG" prop="" v-if="route.path === '/warehouse/uploadpaper'">
              <template v-slot="scope">
                <div style="display: flex; justify-content: center">
                  <div v-if="scope.row.suffix.jpg && route.path === '/warehouse/uploadbook'">
                    <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
                  </div>
                  <div v-else-if="!scope.row.suffix.jpg && route.path === '/warehouse/uploadbook'">
                    <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
                  </div>
                  <div v-else-if="scope.row.suffix.jpg && route.path === '/warehouse/uploadpaper'">
                    <IconifyIconOffline icon="select" style="margin: 0px 40px; color: green" />
                  </div>
                  <div v-else-if="!scope.row.suffix.jpg && route.path === '/warehouse/uploadpaper'">
                    <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column width="80" align="center" label="CDR/AI" prop="">
              <template v-slot="scope">
                <div style="display: flex; gap: 5px; justify-content: center">
                  <div
                    v-if="scope.row.suffix.cdr"
                    style="
                      background: #c3f3cb;
                      color: #198061;
                      font-weight: 700;
                      align-items: center;
                      justify-content: center;
                      display: flex;
                      width: 70px;
                      height: 30px;
                    "
                  >
                    CDR
                    <IconifyIconOffline icon="check" />
                  </div>
                  <div
                    v-if="scope.row.suffix.ai"
                    style="
                      background: #c3f3cb;
                      color: #198061;
                      font-weight: 700;
                      align-items: center;
                      justify-content: center;
                      display: flex;
                      width: 70px;
                      height: 30px;
                    "
                  >
                    AI
                    <IconifyIconOffline icon="check" />
                  </div>
                  <div v-if="!scope.row.suffix.ai && !scope.row.suffix.cdr">
                    <IconifyIconOffline icon="close-bold" style="margin: 0px 40px; color: red" />
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
    </div>

</template>

<script setup lang="ts">
import { ref, reactive, defineProps, watch, computed, onMounted } from 'vue';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';
import JSZip from 'jszip';

const route = useRoute();
const routers = useRouter().options.routes;

defineOptions({
  name: 'PlaceOrderList'
});
const props = defineProps({
  imageLoading: {
    type: Boolean,
    default: false
  },
  fileList: {
    type: Array,
    default: () => []
  },
  showLength: {
    type: Boolean,
    default: true
  },
  // errorZipName: {
  //   type: Array,
  //   default: () => []
  // },
  zipInnerFiles: {
    type: Array,
    default: () => []
  }
});
const emit = defineEmits(['deleteImage']);

const test = reactive([]);
// 拿到zip包的内部文件
const checkFilesSuffix = computed(() => {
  // console.log(props.zipInnerFiles?.[0]);
  let arr1 = [];
  props.zipInnerFiles?.[0]?.map(item => {
    arr1.push({ fileName: item.name, filesSuffix: item.filesSuffix });
  });
  let groupedFiles = arr1.reduce((groups, file) => {
    const fileName = file.fileName;
    if (!groups[fileName]) {
      groups[fileName] = [];
    }
    groups[fileName].push(file);
    return groups;
  }, {});
  // console.log(groupedFiles);
  for (let item in groupedFiles) {
    if (item === '') {
      delete groupedFiles[item];
    }
  }
  // console.log(groupedFiles);
  // console.log(Object.values(groupedFiles).every(group => group.some(file => // console.log(file))));
  Object.values(groupedFiles).every(group =>
    group.some(file => {
      // console.log('????????????????  ', file.filesSuffix);
      file.filesSuffix === 'tif';
    })
  );

  const allGroupHasOne_TIF = Object.values(groupedFiles).every(group => group.some(file => file.filesSuffix === 'tif'));
  const allGroupHasOne_EPS = Object.values(groupedFiles).every(group => group.some(file => file.filesSuffix === 'eps'));
  const allGroupHasOne_JPG = Object.values(groupedFiles).every(group => group.some(file => file.filesSuffix === 'jpg')); // 每一组(每一个名字为一组) 都有jpg
  // const someGroupHasOne_JPG = Object.values(groupedFiles).some(group => group.some(file => file.filesSuffix === 'jpg')); // 有任意一组(每一个名字为一组) 有jpg
  const allGroupHasOne_AIorCDR = Object.values(groupedFiles).every(group =>
    group.some(file => file.filesSuffix === 'ai' || file.filesSuffix === 'cdr')
  );
  // console.log(allGroupHasOne_TIF, allGroupHasOne_EPS, allGroupHasOne_JPG,someGroupHasOne_JPG, allGroupHasOne_AIorCDR);
  let ifMeetCondition = false;
  if (
    route.path === '/warehouse/uploadbook' &&
    allGroupHasOne_TIF &&
    allGroupHasOne_EPS &&
    // !someGroupHasOne_JPG &&
    allGroupHasOne_AIorCDR
  ) {
    //       '/warehouse/uploadbook' 需要有 tif 、 eps  不能有jpg  以及 cdr 、 ai 的其中一个
    ifMeetCondition = true;
  }
  if (
    route.path === '/warehouse/uploadpaper' &&
    allGroupHasOne_TIF &&
    allGroupHasOne_EPS &&
    allGroupHasOne_JPG &&
    allGroupHasOne_AIorCDR
  ) {
    //       '/warehouse/uploadpaper' 需要有 tif 、 eps 、 jpg  以及 cdr 、 ai 的其中一个 -->
    ifMeetCondition = true;
  }
  // console.log(ifMeetCondition);
  // console.log({ifMeetCondition, allGroupHasOne_TIF, allGroupHasOne_EPS, allGroupHasOne_JPG,someGroupHasOne_JPG, allGroupHasOne_AIorCDR});

  emit('checkResult', {
    ifMeetCondition,
    allGroupHasOne_TIF,
    allGroupHasOne_EPS,
    allGroupHasOne_JPG,
    // someGroupHasOne_JPG,
    allGroupHasOne_AIorCDR
  });

  // 计算不满足条件的组 的 文件名称
  let noTIF_fileNames = [];
  if (!allGroupHasOne_TIF) {
    // console.log('不是每一组都有tif');
    // console.log(
    //   '没有tif的一组： ',
    //   Object.values(groupedFiles).filter(group => group.every(file => file.filesSuffix !== 'tif'))
    // );
    // console.log(
    //   '拿到文件名： ',
    //   Object.values(groupedFiles)
    //     .filter(group => group.every(file => file.filesSuffix !== 'tif'))
    //     .map(item => item.map(it => it.fileName))
    //     .map(item => item[0])
    // );
    noTIF_fileNames = Object.values(groupedFiles)
      .filter(group => group.every(file => file.filesSuffix !== 'tif'))
      .map(item => item.map(it => it.fileName))
      .map(item => item[0]);
  }
  let noEPS_fileNames = [];
  if (!allGroupHasOne_EPS) {
    // console.log('不是每一组都有eps');
    // console.log(
    //   '没有eps的一组： ',
    //   Object.values(groupedFiles).filter(group => group.every(file => file.filesSuffix !== 'eps'))
    // );
    // console.log(
    //   '拿到文件名： ',
    //   Object.values(groupedFiles)
    //     .filter(group => group.every(file => file.filesSuffix !== 'eps'))
    //     .map(item => item.map(it => it.fileName))
    //     .map(item => item[0])
    // );
    noEPS_fileNames = Object.values(groupedFiles)
      .filter(group => group.every(file => file.filesSuffix !== 'eps'))
      .map(item => item.map(it => it.fileName))
      .map(item => item[0]);
  }
  let noJPG_fileNames = [];
  if (!allGroupHasOne_JPG) {
    // console.log('不是每一组都有jpg');
    // console.log(
    //   '没有jpg的一组： ',
    //   Object.values(groupedFiles).filter(group => group.every(file => file.filesSuffix !== 'jpg'))
    // );
    // console.log(
    //   '拿到文件名： ',
    //   Object.values(groupedFiles)
    //     .filter(group => group.every(file => file.filesSuffix !== 'jpg'))
    //     .map(item => item.map(it => it.fileName))
    //     .map(item => item[0])
    // );
    noJPG_fileNames = Object.values(groupedFiles)
      .filter(group => group.every(file => file.filesSuffix !== 'jpg'))
      .map(item => item.map(it => it.fileName))
      .map(item => item[0]);
  }
  // let hasJPG_fileNames = [];
  // if (someGroupHasOne_JPG) {
  //   hasJPG_fileNames = Object.values(groupedFiles)
  //     .filter(group => group.some(file => file.filesSuffix === 'jpg'))
  //     .map(item => item.map(it => it.fileName))
  //     .map(item => item[0]);
  // }
  let noAIorCDR_fileNames = [];
  if (!allGroupHasOne_AIorCDR) {
    // console.log('不是每一组都有 ai或cdr ');
    // console.log(
    //   '没有 ai或cdr 的一组： ',
    //   Object.values(groupedFiles).filter(group =>
    //     group.every(file => file.filesSuffix !== 'ai' && file.filesSuffix !== 'cdr')
    //   )
    // );
    // console.log(
    //   '拿到文件名： ',
    //   Object.values(groupedFiles)
    //     .filter(group => group.every(file => file.filesSuffix !== 'ai' && file.filesSuffix !== 'cdr'))
    //     .map(item => item.map(it => it.fileName))
    //     .map(item => item[0])
    // );
    noAIorCDR_fileNames = Object.values(groupedFiles)
      .filter(group => group.every(file => file.filesSuffix !== 'ai' && file.filesSuffix !== 'cdr'))
      .map(item => item.map(it => it.fileName))
      .map(item => item[0]);
  }
  // return {
  //   ifMeetCondition,
  //   allGroupHasOne_TIF,
  //   allGroupHasOne_EPS,
  //   allGroupHasOne_JPG,
  //   someGroupHasOne_JPG,
  //   allGroupHasOne_AIorCDR
  // };
  return {
    checkResult: {
      ifMeetCondition,
      allGroupHasOne_TIF,
      allGroupHasOne_EPS,
      allGroupHasOne_JPG,
      // someGroupHasOne_JPG,
      allGroupHasOne_AIorCDR
    },
    // hasJPG_fileNames
    noMeetFileNames: { noTIF_fileNames, noEPS_fileNames, noJPG_fileNames, noAIorCDR_fileNames }
  };
});
// 子表数据
const childTableData = computed(() => {
  // 清掉文件夹
  let res = [];
  res = props.zipInnerFiles?.[0]?.filter(item => /^[a-zA-Z]+$/.test(item.filesSuffix));
  // 过滤掉不需要展示的文件（e.g. ini
  res = res.filter(item => /(jpg|cdr|ai|tif|eps)/i.test(item.filesSuffix));
  // console.log(res);
  // 同名文件分组
  res = res.reduce((groups, file) => {
    const fileName = file.fileName.split('.').slice(0, -1).join('');
    if (!groups[fileName]) {
      groups[fileName] = [];
    }
    groups[fileName].push(file);
    return groups;
  }, {});

  let result = [];
  for (let groupName in res) {
    // console.log(res[groupName].map( item => item.filesSuffix ));
    const suffix_obj = res[groupName]
      .map(item => item.filesSuffix)
      .reduce((acc, suffix) => {
        acc[suffix] = true;
        return acc;
      }, {});
    result.push({ name: groupName, suffix: suffix_obj });
  }
  // console.log(result);

  return result;
  // return props.zipInnerFiles?.[0]?.filter(item => /^[a-zA-Z]+$/.test(item.filesSuffix))
});

// dialog显示warning信息的表格数据
const warningTableData = computed(() => {
  // 先不管 hasJPG_fileNames 属性
  const filteredObject = Object.keys(checkFilesSuffix.value?.noMeetFileNames)
  .filter(key => !['hasJPG_fileNames'].includes(key))
  // 如果是uploadbook页面，不要 noJPG_fileNames 属性
  .filter(key => route.path === '/warehouse/uploadbook' ? !['noJPG_fileNames'].includes(key): key)
  .reduce((obj, key) => ({ ...obj, [key]: checkFilesSuffix.value?.noMeetFileNames[key] }), {});

  const warningFileNames = checkFilesSuffix.value.noMeetFileNames ? [...new Set(Object.values(filteredObject).flat())] : [];

  const res = childTableData.value?.filter(item => warningFileNames?.includes(item.name))

  return res
});

const visible_warningTable = ref(false);
// 报错信息相关
function handleWarningInfo() {
  // console.log(warningTableData.value);
  visible_warningTable.value = true
}
function handleCloseWarningTable() {
  visible_warningTable.value = false;
}
function delImage(row) {
  if (row.available) {
    return (row.available = false);
  } else {
    const index = props.fileList.findIndex(item => item === row);
    emit('deleteImage', index, row.name);
  }
}
</script>

<style lang="scss" scoped>
.p-gallery-order-table {
  margin: 15px 0px;
  // border: 1px solid #ebeef5;
  border: 1px var(--el-border-color) var(--el-border-style);
  border-radius: 5px;

  ::v-deep {
    .el-table {
      border-top: none;

      th {
        color: rgba(#78808c, 0.52);
      }

      td,
      th {
        padding: 0;
      }
    }

    .btns {
      button {
        padding: 0;
        min-width: 0;
      }

      :first-child {
        padding-right: 5px;
      }
    }

    .el-table .cell {
      cursor: pointer;
      line-height: 45px;
      overflow: hidden;
      white-space: nowrap;

      & [status='s-0'] {
        // background: #909399;
        color: #909399;
      }

      & [status='s-1'] {
        // background: #e6a23c;
        color: #e6a23c;
      }

      & [status='s-2'] {
        // background: #409eff;
        color: #409eff;
      }

      & [status='s-3'] {
        // background: #28a745;
        color: #28a745;
      }
    }

    .el-table__row {
      color: rgba(#78808c, 0.52);

      .text-dark {
        color: #8d9297;
      }
    }
  }
}

::v-deep .el-table__expand-icon {
  font-size: 5px;
  height: 36px;
}
</style>
