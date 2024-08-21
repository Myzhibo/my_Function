<template>
  <div class="main-content">
    <div class="box">
      <div class="top" ref="top">1</div>
      <div class="middle" ref="middle">
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
          <li>1</li>
          <li>2</li>
          <li>3</li>
          <li>4</li>
          <li>5</li>
          <li>6</li>
          <li>7</li>
          <li>8</li>
          <li>9</li>
          <li>10</li>
        </ul>
      </div>
      <div class="bottom" ref="bottom">3</div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.main-content {
  width: 600px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ddd;

  .box {
    width: 550px;
    height: 550px;
    background-color: pink;

    .top {
      width: 100%;
      height: 50px;
      background-color: rgb(236, 177, 238);
    }

    .middle {
      width: 100%;
      height: 450px; // 给死一个高度
      background-color: rgb(177, 238, 218);

      overflow: auto; // 开启滚动条
    }

    .bottom {
      width: 100%;
      height: 50px;
      background-color: rgb(177, 188, 238);
    }
  }
}
</style>
