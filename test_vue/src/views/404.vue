<template>
  <div class="error-page">
    <div class="pic-404">
      <img class="pic-404__parent" src="src/assets/404_images/404.png" alt="404 img" />
    </div>
    <div class="notFound">
      <span>啊哦~~~你访问的页面不存在哦</span>
      <span>
        你可以尝试
        <a class="link" @click="$router.go(-1)">返回上一页</a>
      </span>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.error-page {
  height: 100%;
  display: flex;
  .pic-404 {
    text-align: center;
    width: 60%;
    padding: 50px;
    .pic-404__parent {
      width: 600px;
    }
  }
  .notFound {
    padding: 150px 0;
    overflow: hidden;
    span {
      display: block;
      line-height: 60px;
      font-size: 18px;
      color: #8b7b8b;
      .link {
        color: #5cacee;
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
