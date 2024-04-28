<template>
  <!-- function: 多选框\单选框  -->
  <div style="display:flex">
    多选框
    <el-checkbox-group v-model="MultipleChoice">
      <el-checkbox label="1" value="111" />
      <el-checkbox label="2" value="222" />
      <el-checkbox label="3" value="333" />
      <el-checkbox label="4" value="444" />
    </el-checkbox-group>
    已选： {{MultipleChoice}}
  </div>
  <div style="display:flex">
    单选框
    <el-radio-group v-model="SingleChoice" style="margin-left:10px">
      <el-radio :label="true">是</el-radio>
      <el-radio :label="false">否</el-radio>
    </el-radio-group>
    已选： {{SingleChoice}}
  </div>
 
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";

  // ----------------               function: 多选框\单选框              ------------------------     //
  const MultipleChoice = ref([]);
  const SingleChoice = ref(false);
</script>

<style scoped>
</style>
