<template>
  <div>
    <div style="width:50%; height:100%; border: 2px solid rgb(231 229 229); border-radius: 4px; padding:25px">

      <div style="display:flex; justify-content: center">
        <div style="font-size: 24px; margin-bottom:25px">企业配置</div>
      </div>

      <div style="font-size: 14px; display: flex">
        <div style="display:flex; align-items:center;width:180px;"><span>项目完成后是否直接入库</span></div>
        <div style="margin-left: 15px">
          <el-radio-group v-model="InWarehouse" style="margin-left:10px">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </div>
      </div>

      <hr style="margin-top:15px;">

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter, onBeforeRouteEnter, onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router';


//项目完成后是否直接入库
const InWarehouse = ref(false)

onMounted(async() => {
});

//*********************************************************  创建一个可重用的 watch 函数 **************************************************************** //
function createWatcher(type, source) {
  watch(source, async (newValue, oldValue) => {
    console.log(type, newValue);
  });
}
createWatcher('enableDrawImageSearched', InWarehouse);   // 观察 【项目完成后是否直接入库】

</script>

<style lang="scss" scoped>
</style>
