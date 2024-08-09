<template>
  <div style="width: 200px; overflow-x: hidden; white-space: nowrap;">
    <ul class="navbar-nav" ref="scrollContainer"></ul>
  </div>
</template>

<script>
handleClick(ty) {
  const scrollContainer = this.$refs.scrollContainer;

  if (ty==='left') {
    scrollContainer.scrollLeft -= 10; // 每次向左滚动100px
    this.ifMaxRight = false;
    if (scrollContainer.scrollLeft <= 0) {
      scrollContainer.scrollLeft = 0; // 防止反向滚动超出界限
    }
  }
  if (ty==='right') {
    scrollContainer.scrollLeft += 10; // 每次向右滚动100px

    const { scrollWidth, scrollLeft, clientWidth } = scrollContainer;
    if (scrollWidth - scrollLeft === clientWidth) {
      this.ifMaxRight = true;
      console.log('滚动条已经到达最右边');
    } else {
      this.ifMaxRight = false;
    }
  }

  this.scrollLeft = scrollContainer.scrollLeft
}
</script>

<style>
.navbar-nav {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-x: auto; /* 允许横向滚动 */
  -ms-overflow-style: none; /* IE 和 Edge */
  scrollbar-width: none; /* Firefox */
}

.navbar-nav::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}
</style>