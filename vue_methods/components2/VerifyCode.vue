<template>
  <el-dialog
    @open="open"
    v-model="cVisible"
    :close-on-click-modal="false"
    :style="{ height: isMobile ? '100px' : '35vw', width: isMobile ? '100px' : '35vw' }"
  >
    <template #header>
      <div :class="isMobile ? 'mobile' : 'pc'">
        <span class="title-text">输入验证码</span>
      </div>
    </template>
    <div style="height: 100px">
      请输入发送至 +86 {{ usernameForLose.slice(0, 3) }}******{{ usernameForLose.slice(9, 11) }}
      的 6 位验证码， 有效期10分钟

      <div style="margin-top: 20px; display: flex; justify-content: center">
        <div
          v-for="(char, index) in ['', '', '', '', '', '']"
          :key="index"
          :ref="(el) => setEditableDivRef(el, index)"
          class="editable-div"
          :class="index === 0 ? 'first-div' : ''"
          @input="handleInput(index)"
          contenteditable="true"
          :style="{
            width: '30px',
            height: '30px',
            marginRight: '10px',
            color: loginThemeStyle.titleColor,
            border: `1px ${loginThemeStyle.titleColor} solid`
          }"
        >
          {{ char === '-' ? '-' : '&nbsp;' }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
// 定义emit
const emit = defineEmits(['inputVerifyCode']);
// 定义props
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  isMobile: {
    type: Boolean,
    default: false
  },
  usernameForLose: {
    type: String,
    require: true
  },
  loginThemeStyle: {
    type: Object,
    require: true
  }
});
const cVisible = computed(() => {
  return props.visible || false;
});

const isMobile = toRef(props.isMobile!);

const open = () => {
  setTimeout(() => {
    if (editableDivs.value.length > 0) {
      editableDivs.value[0].focus();
    }
  }, 10);
};
const editableDivs = ref<HTMLElement[]>([]);
const setEditableDivRef = (el: HTMLElement, index: number) => {
  if (el) {
    editableDivs.value[index] = el;
  }
};
const handleInput = (index: number) => {
  const currentDiv = editableDivs.value[index];
  const text = currentDiv.innerText.trim();

  // 并且不是分隔符 '-'，则移动到下一个 div
  if (text.length === 1 && text !== '-') {
    const nextIndex = index + 1;
    if (nextIndex < editableDivs.value.length) {
      // 清空当前 div 的内容
      editableDivs.value[nextIndex].focus();
    }
  }

  // 当前div组的输入情况
  let res = '';
  for (let item of editableDivs.value) {
    res += item.innerHTML.trim();
  }
  emit('inputVerifyCode', res.replaceAll('&nbsp;', ''));
};
</script>

<style scoped lang="scss">
.editable-div {
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none; /* 移除焦点时的轮廓线 */
}
</style>
