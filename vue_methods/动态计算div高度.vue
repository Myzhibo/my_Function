<template>

</template>

<script>
// 计算 my-list 的高度
const top = ref(null);
const middle = ref(null);
const bottom = ref(null);
const myInput = ref(null);
const footer = ref(null);
const bottomHeight = ref(0);
const bottomListHeight = ref(0);
const computedBottomDivHeight = () => {
  if (bottom.value) {
    const headerHeight = document.querySelector('header').clientHeight
    bottomHeight.value = document.body.clientHeight - middle.value.offsetHeight - top.value.offsetHeight - headerHeight - parseInt(window.getComputedStyle(middle.value).paddingTop) - parseInt(window.getComputedStyle(top.value).paddingTop) - 30


    // debugger
    bottomListHeight.value = bottomHeight.value - myInput.value.offsetHeight - footer.value.offsetHeight - headerHeight - parseInt(window.getComputedStyle(myInput.value).paddingTop) - parseInt(window.getComputedStyle(footer.value).paddingTop)
  }
}
onMounted(() => {
  computedBottomDivHeight();
  window.onresize = () => {
    return (() => {
      nextTick(() => {
        computedBottomDivHeight();
      });
    })();
  };
})
</script>