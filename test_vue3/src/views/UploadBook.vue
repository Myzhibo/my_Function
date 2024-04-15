<template>
  <div class="container">
    <el-form :model="bookInfo" label-width="auto">
      <el-form-item label="图书名称" style="width: 570px">
        <el-input v-model="bookInfo.bookName" placeholder="请输入内容" :style="getFormStyle('bookName')" />
      </el-form-item>
      <el-form-item label="册子名称" style="width: 600px">
        <!-- <el-select v-model="bookInfo.bookletName" placeholder="请选择" :style="getFormStyle('bookletName')">
          <el-option v-for="bookletName of bookletNameInfo" :label="bookletName" :value="bookletName" />
        </el-select> -->
        <el-cascader v-model="bookInfo.bookletName" :options="bookletNameInfo" placeholder="请输入" filterable :style="getFormStyle('bookletName')" />
      </el-form-item>
      <div style="display: flex; width: 600px">
        <div>
          <el-form-item label="学段">
            <el-cascader v-model="bookInfo.stage" :options="stageInfo" placeholder="请输入" filterable :style="getFormStyle('stage')" />
          </el-form-item>
        </div>
        <div style="margin-left: 30px">
          <el-form-item label="学科">
            <el-cascader v-model="bookInfo.subject" :options="subjectInfo" placeholder="请输入" filterable :style="getFormStyle('subject')" />
          </el-form-item>
        </div>
      </div>
      <div style="display: flex; width: 600px">
        <div>
          <el-form-item label="年级">
            <el-cascader v-model="bookInfo.grade" :options="gradeInfo" placeholder="请输入" filterable :style="getFormStyle('grade')" />
          </el-form-item>
        </div>
        <div style="margin-left: 30px">
          <el-form-item label="年份">
            <el-cascader v-model="bookInfo.year"
            :options=" [
                  { label: '2023年', value: '2023' },
                  { label: '2024年', value: '2024' },
                  { label: '2025年', value: '2025' }
                ]"
            placeholder="请输入" filterable  :style="getFormStyle('year')"/>
          </el-form-item>
        </div>
      </div>
      <div style="display: flex; width: 600px">
        <div>
          <el-form-item label="版本">
            <el-cascader v-model="bookInfo.version" :options="versionInfo" placeholder="请输入" filterable :style="getFormStyle('version')" />
          </el-form-item>
        </div>
        <div style="margin-left: 30px">
          <el-form-item label="图书区域">
            <el-cascader v-model="bookInfo.bookRegion" :options="bookRegionInfo" placeholder="请输入" filterable :style="getFormStyle('bookRegion')" />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="图片类型">
        <el-cascader v-model="bookInfo.imageType" :options="imageTypeInfo" placeholder="请输入" filterable :style="getFormStyle('imageType')" />
      </el-form-item>
    </el-form>
    <div>
      <span style="color: #606266; font-size: 14px; padding: 0px 12px 0px 0px; font-weight: 700">上传文件</span>
      <Upload
        :otherInfo="bookInfo"
        :allowSelectFilesNumber="1"
        :allowUploadFilesNumber="1"
        :needCheckZipContentFile="true"
        @select="getSelectData"
        @RequiredPrompt="RequiredPrompt"
        @uploadFinish="uploadFinish"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, CSSProperties } from 'vue';
// import { message } from '@pureadmin/components';
import { ElMessageBox } from 'element-plus';
import Upload from './components/Upload.vue';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

// import { createProject } from '@/api/wareHouse';

const route = useRoute();
const router = useRouter();
const routers = useRouter().options.routes;

const bookInfo = reactive({
  bookName: '',
  bookletName: '',
  stage: '',
  subject: '',
  grade: '',
  year: '',
  version: '',
  bookRegion: '',
  imageType: ''
});
const imageTypeInfo = reactive([
  { label: '线条图', value: 'line' },
  { label: '插画图', value: 'illustration' }
]);
const bookletNameInfo = reactive([{label:'讲册',value:'讲册'}, {label:'练册',value:'练册'}, {label:'夹卷',value:'夹卷'}, {label:'小册子',value:'小册子'}, {label:'全稿',value:'全稿'}, {label:'试卷',value:'试卷'}, {label:'其他',value:'其他'}]);
const stageInfo = reactive([
  { label: '幼儿', value: 'preschool' },
  { label: '小学', value: 'primary' },
  { label: '初中', value: 'junior' },
  { label: '高中', value: 'senior' },
  { label: '考研', value: 'postgraduate' }
]);
const gradeInfo = computed(() => {
  const grade = [
    { stage: 'preschool', grade: [{label:'幼儿',value:'幼儿'}] },
    { stage: 'primary', grade: [{label:'一年级',value:'一年级'} , {label:'二年级',value:'二年级'} , {label:'三年级',value:'三年级'} , {label:'四年级',value:'四年级'} , {label:'五年级',value:'五年级'} , {label:'六年级',value:'六年级'} ] },
    { stage: 'junior', grade: [{label:'初一',value:'初一'}, {label:'初二',value:'初二'}, {label:'初三',value:'初三'}] },
    { stage: 'senior', grade: [{label:'高一',value:'高一'}, {label:'高二',value:'高二'}, {label:'高三',value:'高三'}] },
    { stage: 'postgraduate', grade: [{label:'考研',value:'考研'}] }
  ];
  let res;
  if (bookInfo.stage) {
    res = grade.map(item => {
      if (bookInfo.stage[0] === item.stage) return item.grade;
    });
  }
  res = res?.filter(item => !!item)[0];
  return res || [];
});
const subjectInfo = reactive([
  { label: '语文', value: 'chinese' },
  { label: '英语', value: 'english' },
  { label: '道法', value: 'daoism' },
  { label: '数学', value: 'math' },
  { label: '化学', value: 'chemistry' },
  { label: '物理', value: 'physical' },
  { label: '历史', value: 'history' },
  { label: '地理', value: 'geography' },
  { label: '生物', value: 'biology' },
  { label: '理综', value: 'lizong' },
  { label: '文综', value: 'wenzong' },
  { label: '理数', value: 'limath' },
  { label: '文数', value: 'wenmath' },
  { label: '信息技术', value: 'informationTech' },
  { label: '美术', value: 'art' },
  { label: '体育', value: 'sports' },
  { label: '音乐', value: 'music' },
  { label: '其他', value: 'other' }
]);
const versionInfo = reactive([
  {label:'人教',value:'人教'},
  {label:'北师',value:'北师'},
  {label:'沪粤',value:'沪粤'},
  {label:'译林牛津',value:'译林牛津'},
  {label:'课标',value:'课标'},
  {label:'沪科',value:'沪科'},
  {label:'上海牛津',value:'上海牛津'},
  {label:'外研',value:'外研'},
  {label:'红版',value:'红版'},
  {label:'沪教',value:'沪教'},
  {label:'华师',value:'华师'},
  {label:'科广',value:'科广'},
  {label:'鲁教',value:'鲁教'},
  {label:'仁爱',value:'仁爱'},
  {label:'苏教',value:'苏教'},
  {label:'苏科',value:'苏科'},
  {label:'湘教',value:'湘教'},
  {label:'浙教',value:'浙教'},
  {label:'商务星球',value:'商务星球'},
  {label:'通版',value:'通版'},
  {label:'其他',value:'其他'}
]);
const bookRegionInfo = reactive([
  {label:'河北',value:'河北'},
  {label:'山西',value:'山西'},
  {label:'辽宁',value:'辽宁'},
  {label:'吉林',value:'吉林'},
  {label:'黑龙江',value:'黑龙江'},
  {label:'江苏',value:'江苏'},
  {label:'浙江',value:'浙江'},
  {label:'安徽',value:'安徽'},
  {label:'福建',value:'福建'},
  {label:'江西',value:'江西'},
  {label:'山东',value:'山东'},
  {label:'河南',value:'河南'},
  {label:'湖北',value:'湖北'},
  {label:'湖南',value:'湖南'},
  {label:'广东',value:'广东'},
  {label:'海南',value:'海南'},
  {label:'四川',value:'四川'},
  {label:'贵州',value:'贵州'},
  {label:'云南',value:'云南'},
  {label:'陕西',value:'陕西'},
  {label:'甘肃',value:'甘肃'},
  {label:'青海',value:'青海'},
  {label:'内蒙古',value:'内蒙古'},
  {label:'广西',value:'广西'},
  {label:'西藏',value:'西藏'},
  {label:'宁夏',value:'宁夏'},
  {label:'新疆',value:'新疆'},
  {label:'北京',value:'北京'},
  {label:'天津',value:'天津'},
  {label:'上海',value:'上海'},
  {label:'重庆',value:'重庆'},
  {label:'其他',value:'其他'}
]);

let required = reactive([]);
function RequiredPrompt(data) {
  required.splice(0, required.length, ...data);
}

async function uploadFinish(url) {
  // console.log(bookInfo);
  await createProject({
    name: bookInfo.bookName,
    type: 'book',
    booklet_name: bookInfo.bookletName[0],
    subject: bookInfo.subject[0],
    stage: bookInfo.stage[0],
    grade: bookInfo.grade[0],
    year: bookInfo.year[0],
    version: bookInfo.version[0],
    book_region: bookInfo.bookRegion[0],
    image_type: bookInfo.imageType[0],
    zip_urls: [url]
  });
  // message.success('文件已经上传完毕');
  for (let key in bookInfo) {
    bookInfo[key] = '';
  }
  // router.push({ path: '/warehouse/UploadBook' });
}

// 【watch】
// watch(bookInfo, (newValue, oldValue) => {
//   console.log('bookInfo 发生了变化:', newValue);
// }, {
//   deep: true, // 开启深度监听
// });

// 【:style 计算属性】
// const getFormStyle = computed((): CSSProperties => {
//   return {
//     border: xxxx ? '1px solid red' : "",
//     borderRadius: '5px',
//   };
// });
// 使用方法而不是计算属性来 [根据参数] 返回样式
const getFormStyle = (type: string): CSSProperties => {
  return {
    border: required.includes(type) && bookInfo[type] === '' ? '1px solid red' : '',
    borderRadius: '5px'
  };
};

const beSelectedFile = reactive([]);
function getSelectData(data) {
  beSelectedFile.splice(0, beSelectedFile.length, ...data);
  console.log(beSelectedFile);
}
// 路由leave守卫
const leaveGuard = onBeforeRouteLeave(async (to, from, next) => {
  if (beSelectedFile.length > 0 || [...Object.values(bookInfo)].some(item => item !== '')) {
    await ElMessageBox.confirm('当前已有内容输入，确认离开?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    });
    next();
  }
  next();
});
// 刷新页面守卫
window.addEventListener('beforeunload', function (event) {
  if (beSelectedFile.length > 0 || [...Object.values(bookInfo)].some(item => item !== '')) {
    event.preventDefault();
    event.returnValue = '当前已有内容输入，确认离开?';
  }
});
</script>

<style lang="scss" scoped>
.container {
  height: 100%;

  &-content {
    height: calc(100% - 60px);
  }
}

.text-primary {
  color: #48638f;
}

::v-deep .el-cascader-menu__wrap.el-scrollbar__wrap {
  max-height: 204px;
}
</style>
