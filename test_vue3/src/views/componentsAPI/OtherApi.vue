<template>
  <div>
    1<div style="border: 1px solid black">
      isRef：<b style="color:green">检查</b>一个值是否为一个 ref 对象 <br>
      isReactive：<b style="color:green">检查</b>一个对象是否是由 reactive 创建的响应式代理 <br>
      isReadonly：<b style="color:green">检查</b>一个对象是否是由 readonly 创建的只读代理 <br>
      isProxy：<b style="color:green">检查</b>一个对象是否是由 reactive 或者 readonly 方法创建的代理，readonly 也是经过 Proxy 进行的代理，这不过它是为只读的代理 <br>
    </div>

    <br>

    2<div style="border: 1px solid black">
      <tr>
        shallowRef 与 shallowReactive  <b style="color:green">[shallow 浅的]</b>
      </tr>
      <tr> - </tr>
      <tr>
        shallowRef：  只考虑基本数据类型的响应式，引用数据类型只有当地址发生改变时才会响应
        <el-tooltip placement="right-end" effect="dark">
          <template #content>
            <div style="max-width: 550px; max-height: 250px; overflow: auto">
              const count4 = shallowRef({ num:0 });                                        <br>
              const changeCount4 = () => {                                                 <br>
                &nbsp;&nbsp;  count4.value.num++;  // <b style="color:yellow">shallowRef创建的</b>，只更改num属性值，不会更新视图                         <br>
                &nbsp;&nbsp;  triggerRef(count4)  // 使用 <b style="color:yellow">triggerRef</b> 手动更新视图<br>
              }
            </div>
          </template>
          <el-icon :size="16" style="color:skyblue; cursor: pointer;"><Management /></el-icon>
        </el-tooltip>

        <br>
        shallowReactive：  对于引用数据类型，只对数据的第一层进行响应式 <br>
      </tr>
    </div>

    <br>

    3<div style="border: 1px solid black">
      <tr>
        readonly 与 shallowReadonly <br>
      </tr>
      <tr> - </tr> <br>
      <tr>
        readonly：  让一个响应式数据变为只读的，所有的数据都为只读 <br>
        shallowReadonly：  让一个响应式数据变为只读的，只是第一层的数据只读 <br>
      <tr> - </tr> <br>
        用法：调用 readonly/shallowReadonly 函数，<b style="color:green">返回一个新的只读属性</b> <br>
        应用场景：不希望数据被修改时 <br>
      </tr>
    </div>

    <br>

    4<div style="border: 1px solid black">
      <tr>
        toRaw 与 markRaw
      </tr>
      <tr> - </tr>
      <tr>
        toRaw：  将一个<b style="color:green">由 reactive 定义的</b>响应式对象，返回为一个普通对象 <br>
        markRaw：标记一个对象，使其永远不会再成为响应式对象， 调用 markRaw 函数，为原对象添加一个<b style="color:green"> __v_skip</b> 为 true 的属性 <br>
      </tr>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Management} from '@element-plus/icons-vue'
</script>

<style scoped>
</style>
