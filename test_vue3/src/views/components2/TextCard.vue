<template>
  <div :class="showChildrenCards ? 'expanding' : 'noExpanding'">
    <!-- 卡片 -->
    <div class="card-container">
      <el-card style="width: 100%" shadow="none" @click.native="handleCardClick">
        <div class="card-container-content">  
          <div class="card-container-content-left"> 
            <div>
              <slot name="prefix"></slot>  
            </div>
            <div>
              <div>{{ cardData.name }}</div>
                <div>{{ cardData.info }}</div>
                <div v-if="children.length" style="display: flex;">
                  <span style="color: #999; margin-right: 10px; font-size: 12px;">共{{children.length}}册</span>
                  <span v-if="!showChildrenCards" style="color: #3AA5FF; font-size: 12px;" @click.stop="showChildrenCards = true;">展开</span>
                  <span v-if="showChildrenCards" style="color: #3AA5FF; font-size: 12px;" @click.stop="showChildrenCards = false;">收起</span>
                </div>
            </div>
          </div>  
          <div style="flex-shrink: 0;">
            <slot name="suffix"></slot>  
          </div>  
        </div> 
      </el-card>
    </div>
    <!-- 子卡片 -->
    <div style="display: flex; justify-content: right; min-width: 600px">
      <div class="card-container-child" v-if="showChildrenCards">
        <el-card v-for="(child, index) of children" :key="index"
          style="width: 100%" shadow="none" @click.native="handleCardClick"
        >
          <div class="card-container-child-content">
            <div class="card-container-child-content-left">
              <div>
                <slot name="prefix"></slot>
              </div>
              <div>
                <div>{{ child.name }}</div>
                <div>{{ child.info }}</div>
                <div style="color: #999; font-size: 12px;">{{ index + 1 }} / {{ children.length }}</div>
              </div>
            </div>  
            <div style="flex-shrink: 0;">
              <slot name="suffix"></slot>  
            </div>  
          </div> 
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, toRefs, onMounted } from 'vue';

// 定义props
const props = defineProps({
  cardData: Object,
  children: Array,
});
// 定义emit
const emit = defineEmits(['click']);

const showChildrenCards = ref(false);

onMounted(() => {
});

const handleCardClick = () => {
  emit('click', props.cardData);
};
const clickCard = (router) => {
};
</script>

<style scoped lang="scss">
  .card-container {
    width: 100%;
    min-width: 600px;
    margin-bottom: 10px;
    cursor: pointer;
    
    .card-container-content {
      width: 100%; 
      display: flex; 
      justify-content: space-between; 
      align-items: center;

      .card-container-content-left {
        display: flex;
        width: 85%;
      }
    }
  }
  .card-container-child {
    width: 95%;
    margin-bottom: 10px;
    cursor: pointer;
    border-left: 4px #3AA5FF solid;

    .card-container-child-content {
      width: 100%; 
      display: flex; 
      justify-content: space-between; 
      align-items: center;

      .card-container-child-content-left {
        display: flex;
        width: 85%;
      }
    }
  }
  .in-basket {
    background-color: rgb(233, 253, 233);
  }

  .expanding {
    border: 1px #ddd solid; 
    border-radius: 5px;
    padding: 0px 5px 0px 0px;

    ::v-deep .el-card {
      border: 1px transparent solid;
      border-radius: 5px;
    }
    ::v-deep .el-card:hover {
      border: 1px #3AA5FF solid;
    }
    ::v-deep .el-card__body {
      padding: 10px 20px;
    }
  }
  .noExpanding {
    ::v-deep .el-card {
      border-color: #ddd;
      border-radius: 5px;
    }
    ::v-deep .el-card:hover {
      border: 1px #3AA5FF solid;
    }
    ::v-deep .el-card__body {
      padding: 10px 20px;
    }
  }


  .footer{
    // background-color: pink;
    display: flex;
    align-items: center;
    justify-content: space-between; 
    
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    padding-top: 10px;
  }
</style>