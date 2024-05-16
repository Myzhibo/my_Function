<template>
  <div>
    <div style="display:flex; justify-content: space-between">
      <div style="font-size: 24px; margin-bottom:25px">权限管理</div>
    </div>

    <div style="width:100%; height:100%; border: 2px solid rgb(231 229 229); border-radius: 4px; padding:25px">
      <!-- <div style="font-size: 20px; margin-bottom:15px"> - 工作台</div> -->
      <div style="font-size: 14px; display: flex">
        <!-- <div style="width: 5px;height:30px;background-color:rgb(182 211 241);margin-top:22px;margin-right:10px"></div> -->
        <div style="display:flex; align-items:center;width:180px;"><span>工作台</span></div>
        <div style="margin-left: 15px">
          <el-checkbox-group v-model="WorkbenchList">
            <el-checkbox label="制图管理员" value="admin" />
            <el-checkbox label="制图员" value="makeUser" />
            <el-checkbox label="项目负责人" value="projectAdmin" />
            <el-checkbox label="学科编辑" value="editor" />
          </el-checkbox-group>
        </div>
      </div>

      <hr style="margin-bottom:15px;">

      <!-- <div style="font-size: 20px; margin-bottom:15px"> - 项目管理</div> -->
      <div style="font-size: 14px; display: flex">
        <!-- <div style="width: 5px;height:30px;background-color:rgb(182 211 241);margin-top:22px;margin-right:10px"></div> -->
        <div style="display:flex; align-items:center;width:180px;"><span>项目管理</span></div>
        <div style="margin-left: 15px">
          <el-checkbox-group v-model="ProjectManagerList">
            <el-checkbox label="制图管理员" value="admin" />
            <el-checkbox label="制图员" value="makeUser" />
            <el-checkbox label="项目负责人" value="projectAdmin" />
            <el-checkbox label="学科编辑" value="editor" />
          </el-checkbox-group>
        </div>
      </div>

      <hr style="margin-bottom:15px;">
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { message } from '@pureadmin/components';
import { ElMessageBox } from 'element-plus';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';

// import { getAdmin, getMaker, getProjectAdmin, getEditor, addAccess, deleteAccess,
//   getCustomerAccess, updateCustomerAccess, createCustomerAccess
// } from '@/api/user';

import authority from './static/authority.json'

onMounted(async() => {
  const myMap = {
    '/workbench': WorkbenchList,    // 工作台
    '/project_manage': ProjectManagerList,    // 项目管理
  }
  // let res = await getCustomerAccess();
  let res = authority;
  console.log(res);
  // 分配 admin
  res.data.config.adminAccess.forEach((hasFunction) => {    
    Object.keys(myMap).forEach(key => {
      if(key === hasFunction) myMap[key].value.push('admin')
    })
  })
  // 分配 makeUser
  res.data.config.makerAccess.forEach((hasFunction) => {
    Object.keys(myMap).forEach(key => {
      if(key === hasFunction) myMap[key].value.push('makeUser')
    })
  })
  // 分配 projectAdmin
  res.data.config.projectAdminAccess.forEach((hasFunction) => {
    Object.keys(myMap).forEach(key => {
      if(key === hasFunction) myMap[key].value.push('projectAdmin')
    })
  })
  // 分配 editor
  res.data.config.editorAccess.forEach((hasFunction) => {
    Object.keys(myMap).forEach(key => {
      if(key === hasFunction) myMap[key].value.push('editor')
    })
  })

  console.log(myMap);
  console.log(WorkbenchList.value);
  console.log(ProjectManagerList.value);
});
//工作台
const WorkbenchList = ref([])
//项目管理
const ProjectManagerList = ref([])

// 最终config
const configRes = computed(() => {
  let res = {
    adminAccess: [],
    makerAccess: [],
    projectAdminAccess: [],
    editorAccess: [],
  }
  const myMap = {
    '/workbench': WorkbenchList,    // 工作台
    '/project_manage': ProjectManagerList,    // 项目管理
  }
  for (let key in myMap) {
    if(Object.values(myMap[key].value).includes('admin')){
      res.adminAccess.push(key);
    }
    if(Object.values(myMap[key].value).includes('makeUser')){
      res.makerAccess.push(key);
    }
    if(Object.values(myMap[key].value).includes('projectAdmin')){
      res.projectAdminAccess.push(key);
    }
    if(Object.values(myMap[key].value).includes('editor')){
      res.editorAccess.push(key);
    }
  }
  return res;
})
// 创建一个可重用的 watch 函数
function createWatcher(source, permissionId) {
  watch(source, async (newValue, oldValue) => {
    // await updateCustomerAccess({
    //   config: configRes.value,
    // })
    console.log(configRes.value);
  });
}

createWatcher(WorkbenchList, 629);   // 观察 【工作台】
createWatcher(ProjectManagerList, 612);   // 观察 【项目管理】
</script>

<style lang="scss" scoped>
::v-deep .el-button{
  min-width: 85px
}
</style>
