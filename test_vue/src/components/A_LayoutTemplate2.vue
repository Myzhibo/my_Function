<template>
  <div class="config-page-container" style="background-color:rgba(255,192,203,0.4)">
    <!-- 上方标题 -->
    <div class="header p-t-20 p-b-20">
      <div class="flex-center">
        <div class="m-r-20" style="width: 32px; height: 32px">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z"
              fill="#3D99F5"
            />
            <path
              d="M23.0874 25L28 7H24.0597L21.0661 19.4034H21.0149L17.8934 7H14.1322L10.9595 19.2521H10.9083L8.01706 7H4L8.83582 25H12.9041L15.9488 12.7479H16L19.0959 25H23.0874Z"
              fill="white"
            />
          </svg>
        </div>
        <h1 class="flex-center" style="line-height: 36px; font-size: 30px; margin: 0px">asdasdad</h1>
      </div>
      <h2 class="flex-center" style="line-height: 30px; font-size: 22px; margin: 10px 0px; font-weight: 200">
        a
      </h2>
    </div>
    <!-- 下方功能栏 -->
    <div class="content">
      <div style="width: 85%; height: 700px; border: 1px solid rgb(224, 224, 224); background-color: rgb(239, 240, 246);">
          <div class="m-r-20" style="width: 100%; height: 45%; background-color:red">1
          </div>
          <div class="m-r-20" style="width: 100%; height: 10%;  background-color:yellow;display: flex;-webkit-box-pack: center;justify-content: center;">
            {{topicSearch.includes('\n')}}
            <el-input v-model="topicSearch" v-if="!topicSearch.includes('\n')" autofocus ref="textInput"
                      size="mini" style="width: 80%;height:60px" placeholder="Enter 发送; Shift + Enter 换行" suffix-icon="el-icon-s-promotion"
                      @keydown.native="handleKeyDown" 
            />
            <div class="textInput" style="width: 80%;position: relative;" v-if="topicSearch.includes('\n')">
              <el-input v-model="topicSearch" type="textarea" :rows="4" autofocus ref="textArea"
                size="mini" style="width: 100%;"
                @keydown.native="handleKeyDown"
              ></el-input>
              <i class="el-icon-s-promotion" style="font-size:20px;position: absolute;z-index: 999999;color:rgb(196,192,204);right: 26px; top:18px" />
            </div>
          </div>
          <div class="m-r-20" style="width: 100%; height: 45%; position: relative">
            <div style="width: 80%; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%)">
              <div><span>试试这些主题扩展例子</span></div>
              <el-card shadow="hover" style=" margin-bottom: 10px; border-radius: 10px;"> <div style="height: 20px;line-height: 20px;">鼠标悬浮时显示</div> </el-card>
              <el-card shadow="hover" style=" margin-bottom: 10px; border-radius: 10px;"> <div style="height: 20px;line-height: 20px;">鼠标悬浮时显示</div> </el-card>
              <el-card shadow="hover" style=" margin-bottom: 10px; border-radius: 10px;"> <div style="height: 20px;line-height: 20px;">鼠标悬浮时显示</div> </el-card>
              <el-card shadow="hover" style=" margin-bottom: 10px; border-radius: 10px;"> <div style="height: 20px;line-height: 20px;">鼠标悬浮时显示</div> </el-card>
            </div>
          </div>
          <div v-if="showAlert" class="dialog" @click.self="showAlert = false">
            <div class="dialog-content">
              <strong>
                <div>选材进行中...</div>
                <br>
                可以在任务列表中查看选材进度，点击
                <router-link to="/taskList" target="_self" style="color:blue">查看本任务</router-link>
              </strong>
            </div>
            <button @click="showAlert = false">确认</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
// import FilterSearch from './components/FilterSearch.vue';

export default {
  data() {
    return {
      topicSearch: "",
      showAlert: false
    };
  },
  computed: {
  },
  methods: {
    handleKeyDown(event) {
      if (event.key === 'Backspace') {
        setTimeout(() => {
          if (this.$refs.textInput) this.$refs.textInput.focus()
        }, 10);
      }
      if (event.shiftKey && event.key === 'Enter') {
        console.log('Shift + 回车键被按下');
        setTimeout(() => {
          if (this.$refs.textArea) this.$refs.textArea.focus()
        }, 10);
        this.topicSearch += '\n';
        // 删除多余的\n
        if (this.topicSearch.trimRight().length < this.topicSearch.length  && (this.topicSearch.match(/\n/g) || []).length >1) {
          this.topicSearch = this.topicSearch.replace(/\n$/, '');
        }
        // ※※  动态修改elementUI的样式 this.$refs.textArea.$el获取然后修改其style ※※
        setTimeout(() => {
          if (this.$refs.textArea) {
            const textarea = this.$refs.textArea.$el.querySelector('textarea');
            if (textarea && (this.topicSearch.match(/\n/g) || []).length > 2) {
              textarea.style.height = 'auto';
              textarea.style.height = `${(this.topicSearch.match(/\n/g) || []).length * 25}px`;
            }
          }
        }, 10);
        console.log(this.topicSearch);
      }
      if (event.key === 'Enter') {
        if (!event.shiftKey) {
          console.log('仅回车键被按下');

          // 阻止回车键的默认行为  防止在使用回车键（Enter）触发 confirm 弹窗，并且发现弹窗会瞬间被关闭
          event.preventDefault();

          this.$confirm('以该主题进行选材?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            }).then(async() => {
              console.log(this.topicSearch);
              // this.showAlertWithLink();                    // 原生  原生的不能路由跳转
              this.showAlert = true                           // vue
              if (this.$refs.textInput) this.$refs.textInput.blur()
              if (this.$refs.textArea) this.$refs.textArea.blur()
            }).catch(() => {});
        }
      }
    },
    
    showAlertWithLink() {
      const dialog = document.createElement('div');
      dialog.style.position = 'fixed';
      dialog.style.left = '50%';
      dialog.style.top = '50%';
      dialog.style.transform = 'translate(-50%, -50%)';
      dialog.style.backgroundColor = 'white';
      dialog.style.border = '1px solid gary';
      dialog.style.borderRadius = '10px';
      dialog.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04)';
      dialog.style.padding = '20px';
      dialog.style.zIndex = '9999';
      dialog.style.textAlign = 'center';
      dialog.innerHTML = '<strong><div style="text-align: left">选材进行中...</div><br>可以在任务列表中查看选材进度，点击<a href="https://www.baidu.com" target="_blank" style="color:blue">查看本任务</a></strong>';

      // 创建一个按钮
      const button = document.createElement('button');
      button.textContent = '确认';
      button.style.display = 'block';
      button.style.marginTop = '20px';
      button.style.position = 'relative';
      button.style.left = '270px';
      button.style.color = '#FFF';
      button.style.backgroundColor = '#409EFF';
      button.style.borderColor = '#409EFF';

      // 添加按钮点击事件，用于关闭对话框
      button.addEventListener('click', () => {
        document.body.removeChild(dialog);
      });

      // 将按钮添加到对话框中
      dialog.appendChild(button);

      // 将对话框添加到body中
      document.body.appendChild(dialog);
    }
  }
};
</script>

<style scoped lang="scss">
.config-page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  .content {
    display: flex;
    -webkit-box-pack: center;
    justify-content: center;
    width: 100%;
    min-width: 1100px;
  }
}

::v-deep .el-input__inner{
  font-size: 16px;
  height: 60px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
.textInput ::v-deep .el-textarea__inner{
  height: 70px;
  max-height: 90px;
  font-size: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 10px;
}
::v-deep .el-input__suffix {
  font-size: 20px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

// 提示框相关
.dialog {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid gray;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  padding: 20px;
  z-index: 9999;
  text-align: center;
}
.dialog-content {
  /* 样式可以根据需要调整 */
}
.dialog button {
  display: block;
  margin-top: 20px;
  position: relative;
  left: 270px;
  color: #FFF;
  background-color: #409EFF;
  border-color: #409EFF;
}
</style>
