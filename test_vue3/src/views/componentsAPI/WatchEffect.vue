<template>
  <div>
    <table border=1>
      <tr>
        <td></td>
        <td>{{sum1}} <el-button @click="handleClick1">sum1 + 1</el-button> <br></td>
      </tr>
      <tr>
        <td>第一个参数： 副作用 effect</td>
        <td>{{sum2}} <el-button @click="handleClick2">sum2 + 1</el-button></td>
        <td><span style="border-radius: 4px;background-color: pink;">副作用函数 下一次执行前被调用</span></td>
      </tr>
      <tr>
        <td>返回值</td>
        <td>{{sum3}} <el-button @click="handleClick3">sum3 + 1</el-button>&nbsp;<el-button @click="stopWatch">停止</el-button></td>
        <td><span style="border-radius: 4px;background-color: pink;">停止时, 不影响最后一次 onCleanup 的执行， 仍会执行一次副作用</span></td>
      </tr>
      <tr>
        <td>第二个参数： 配置项</td>
        <td><input id="ipt" v-model="inputVal" /></td>
        <td><span style="border-radius: 4px;background-color: pink;">一般需要在 dom 更新之后再获取的情况，可以设置为 post</span>
          
          <el-tooltip placement="right-end" effect="dark">
            <template #content>
              <div style="max-width: 550px; max-height: 250px; overflow: auto">
                immediate：在监听创建时立即触发回调，第一次调用时旧值是undefined <br>
                deep：如果监听的值是对象，强制使用深度遍历，一遍在深层级变更时触发回调 <br>
                flush：调整回调函数的刷新时机： <br>
                - 'pre' ：在组件更新更新前运行，默认为'pre' <br>
                - 'post'：在组件更新更新后运行 <br>
                - 'sync'：强制效果始终同步触发。然而，这是低效的，应该很少需要。 <br>
                -----------------------------------------------------------  <br>
                watchPostEffect()：watchEffect() 使用 flush: 'post' 选项时的别名 <br>
                watchSyncEffect()：watchEffect() 使用 flush: 'sync' 选项时的别名 <br>
              </div>
            </template>
            配置项
          </el-tooltip>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, watch, watchEffect} from 'vue'        //引入watchEffect

  // ========================= watchEffect =========================
  let sum1 = ref(0)
  let sum2 = ref(0)
  let sum3 = ref(0)
  let inputVal = ref('')
  function handleClick1 () {
    sum1.value = sum1.value + 1;
  }
  function handleClick2 () {
    sum2.value = sum2.value + 1;
  }
  function handleClick3 () {
    sum3.value = sum3.value + 1;
  }
  
  // 1. 用谁就监视谁, 回调里想看谁就写谁
  watchEffect(()=>{
    console.log("watchEffect所指定的回调 .", sum1.value)
  })

  // 2. 副作用 effect 的参数 (注册清理回调) [清理回调 会在 该副作用下一次执行前被调用]
  watchEffect((onCleanup) => {
    console.log("watchEffect所指定的回调 .", sum2.value)

    onCleanup(() => {
      console.log("onCleanup —————— 下一次运行之前要做的事");
    });
  });

  // 3. 返回值 是一个用来 停止侦听器 的函数，调用后不再侦听 [停止时，不影响最后一次 onCleanup 的执行]
  const resStop = watchEffect((onCleanup) => {
    console.log("watchEffect所指定的回调 .", sum3.value)

    onCleanup(() => {
      console.log("onCleanup —————— 下一次运行之前要做的事");
    });
  });
  const stopWatch = () => {
    resStop();
  };

  // 4. 第二个参数 配置项 
  watchEffect(() => {
    // 测试 flush
    const spanEle = document.getElementById("ipt");
    // flush = pre 时，打印 null; flush = post 时，打印节点
    console.log("spanEle========>,", spanEle); 

    // 修改 iptVal 测试 onTrack、onTrigger
    console.log("iptVal============>", inputVal.value);
  },
  {
    flush: "post",
   	// 收集依赖时触发
    onTrack: () => {
      console.log('收集');
      // debugger;
    },
    // 更新时触发
    onTrigger: () => {
      console.log('更新');
      // debugger;
    },
  }
);
</script>

<style scoped>
</style>
