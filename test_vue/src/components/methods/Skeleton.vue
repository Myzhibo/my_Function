<template>
  <div>
    <button @click="loading = !loading">是否正在加载：{{loading}}</button>
    <div v-if="loading" style="position: relative; top: 20px" >
      <el-skeleton style="width: 100%" animated>
        <template slot="template">
          <div style="padding: 14px;">
            <el-skeleton-item variant="p" style="width: 100%; margin-bottom: 30px;" />
            <div v-for="(item,index) in 10"
              style="display: flex; align-items: center; justify-items: space-between; margin-bottom: 30px;"
            >
              <el-skeleton-item variant="text" style="width: 30%;height: 40px;margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;margin-right: 16px;" />
              <el-skeleton-item variant="text" style="margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;margin-right: 16px;" />
              <el-skeleton-item variant="text" style="margin-right: 16px;" />
              <el-skeleton-item variant="text" style="width: 30%;" />
            </div>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Skeleton',
  data () {
    return {
      loading: true
    };
  },
  mounted () {},
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
