<template>
  1<div style="border: 1px solid black">
      <p> <b style="color:green">Fragment</b> </p>
      在Vue2中: 组件必须有一个根标签      <br>
      在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中 <br>
      好处： 减少标签层级, 减小内存占用 <br>
    </div>

    <br>

  2<div style="border: 1px solid black">
    <p> <b style="color:green">teleport</b>: 是一种能够将组件html结构移动到指定位置的技术 </p>
          把一段代码套上teleport to到body上面，这段代码就被转移到body上面了 ， 无论他被嵌套到哪个组件中  【to="标签名/class类名/id名"】
          <pre>
            &lt;teleport to="body"&gt;
              &lt;div v-if="isShow" class="mask"&gt;
                &lt;div v-if="isShow" class="Popup"&gt;
                  &lt;h3&gt;弹窗组件&lt;/h3&gt;
                  &lt;button @click="isShow = false"&gt;关闭弹窗&lt;/button&gt;
                &lt;/div&gt;
              &lt;/div&gt;
            &lt;/teleport&gt;
          </pre>

          传递组件 <br>
          首先，在父组件的模板中添加一个目标元素： &lt;div id="dialog-teleport-target"&gt;&lt;/div&gt;    <br>
          然后，在子组件中 &lt;teleport to="#dialog-teleport-target"&gt; ... &lt;/teleport&gt;
  </div>

  <br>

  3<div style="border: 1px solid black">
  <p> <b style="color:green">Suspense</b>: 等待<b style="color:green">异步组件</b>时渲染一些额外内容，让应用有更好的用户体验 </p>
        <pre>
          import {defineAsyncComponent} from 'vue'
          const Child = defineAsyncComponent(()=>import('./components/Child.vue')) <br> <br>
          &lt;Suspense&gt;  
              &lt;template v-slot:default&gt;  
                  &lt;Child/&gt;  
              &lt;/template&gt;  
              &lt;template v-slot:fallback&gt;  
                  &lt;h3&gt;加载中.....&lt;/h3&gt;  
              &lt;/template&gt;  
          &lt;/Suspense&gt;
        </pre>

        default：就是组件要显示的内容<br>
        fallback：就是组件没加载完全的“备胎”（类似于img标签的alt属性）<br>
  </div>
</template>

<script setup lang="ts">
import {Management} from '@element-plus/icons-vue'
</script>

<style scoped>
</style>