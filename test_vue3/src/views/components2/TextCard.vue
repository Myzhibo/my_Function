<template>
  <div :class="[props.showChildrenCards ? 'expanding' : 'noExpanding', props.from,
  isLastOne ? 'lastOne' : '', isFirstOne ? 'firstOne' : ''
  ]">
    <!-- 卡片 -->
    <div class="card-container">
      <el-card style="width: 100%" shadow="never" :class="props.nodeType" @click="handleCardClick">
        <div class="card-container-content">
          <div class="card-container-content-left">
            <div v-if="props.needPrefix">
              <slot name="prefix"></slot>
            </div>
            <div class="card-container-content-left-info">
              <slot name="content"></slot>
            </div>
          </div>
          <div style="flex-shrink: 0" v-if="props.needSuffix">
            <slot name="suffix"></slot>
          </div>
        </div>
      </el-card>
    </div>
    <!-- 子卡片 -->
    <div v-if="props.showChildrenCards && children?.length" style="display: flex; justify-content: right">
      <div class="card-container-child" v-if="props.showChildrenCards">
        <el-card v-for="(child, index) of children" :key="index" class="card-container-child-content"
          style="width: 100%" shadow="none" @click="handleCardClick">
          <div>
            <!-- <div class="card-container-child-content-left"> -->
            <slot name="child-content" :childItem="child"></slot>
            <!-- </div> -->
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

// 定义props
const props = defineProps({
  cardData: Object,
  children: Array,
  nodeType: String,
  needPrefix: {
    type: Boolean,
    default: true
  },
  needSuffix: {
    type: Boolean,
    default: true
  },
  showChildrenCards: {
    type: Boolean,
    default: false
  },
  from: {
    type: String,
    default: ''
  },
  isFirstOne: Number,
  isLastOne: Number
});
// 定义emit
const emit = defineEmits(['click']);

onMounted(() => { });

const handleCardClick = () => {
  emit('click', props.cardData);
};
const clickCard = (router) => { };
</script>

<style scoped lang="scss">
.noExpanding {
  .card-container {
    height: 124px;
  }
}

.card-container {
  width: 100%;
  min-width: 600px;
  cursor: pointer;

  .card-container-content {
    width: 100%;
    height: 92px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      display: flex;
      width: 85%;
      height: 100%;

      &-info {
        margin-left: 20px;
        display: flex;
        align-items: center;
      }
    }
  }
}

.card-container-child {
  width: 98%;
  margin-bottom: 10px;
  cursor: pointer;
  border-left: 4px var(--main1-6) solid;
  padding-left: 12px;

  .card-container-child-content:not(:first-child) {
    margin-top: 8px;
  }
}

.in-basket {
  background-color: rgb(233, 253, 233);
}

.expanding:not(.lastOne) {
  border-bottom: 1px #ddd solid;
}

.expanding {
  width: 95%;
  // border-radius: 5px;
  // padding: 0px 10px 0px 0px;

  .card-container {
    ::v-deep .el-card {
      border: 1px transparent solid; // 卡片边框透明
      border-radius: 5px;
    }
  }

  :deep(.el-card:not(.chapter)):hover {
    // border: 1px var(--main1-6) solid;
    background-color: var(--main1-2);
  }

  :deep(.el-card .chapter) {
    height: 40px;
  }

  ::v-deep .el-card__body {
    padding: 10px 10px;
  }
}

.noExpanding {
  ::v-deep .el-card {
    border-color: #ddd;
    // height: 124px;
    border-radius: 5px;
  }

  ::v-deep .el-card:hover {
    border: 1px var(--main1-6) solid;
  }

  ::v-deep .el-card__body {
    padding: 10px 16px;
  }
}

.footer {
  // background-color: pink;
  display: flex;
  align-items: center;
  justify-content: space-between;

  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 10px;
}
</style>
