<template>
  <div>
    <el-tabs type="card" class="demo-tabs">
      <el-tab-pane label="ref & reactive"> <RefReactive /> </el-tab-pane>
      <el-tab-pane label="watchEffect"> <WatchEffect /> </el-tab-pane>
      <el-tab-pane label="toRef & toRefs"> <toReftoRefs /> </el-tab-pane>
      <el-tab-pane label="Provide Inject  依赖注入"> <ProvideInject /> </el-tab-pane>
      <el-tab-pane label="CustomRef"> <CustomRef /> </el-tab-pane>
      <el-tab-pane label="其他组合式API"> <OtherApi /> </el-tab-pane>
      <el-tab-pane label="新的组件"> <NewComp /> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import RefReactive from './componentsAPI/Ref&Reactive.vue'
import WatchEffect from './componentsAPI/WatchEffect.vue'
import toReftoRefs from './componentsAPI/toRef&toRefs.vue'
import ProvideInject from './componentsAPI/Provide&inject.vue'
import CustomRef from './componentsAPI/CustomRef.vue'
import OtherApi from './componentsAPI/OtherApi.vue'
import NewComp from './componentsAPI/NewComp.vue'

// Provide Inject  依赖注入
import { provide, ref, reactive, toRef } from "vue"
let data = ref("我是祖先，这是传给子孙的一句话aaaa")
provide('msg1', data)

const state = reactive({
  data: 1
})
provide('msg2', state)
provide('msg3', toRef(state, 'data'))

</script>

<style scoped>
</style>
