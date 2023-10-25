<template>
  <div>

    <!-- FUNCTION: 虚拟滚动 -->
    <div>
      <div class="project">
          <div style="">
                  <!-- key-field="_id" -->
              <DynamicScroller
                  :items="long_data"
                  :min-item-size="1"
                  :pageMode="true"
                  key-field="id"
                  ref="virtualScroller"
                  v-if="long_data.length"
                  >
                <template v-slot="{ item, index, active }">
                  <DynamicScrollerItem
                    :item="item"
                    :active="active"
                    :data-index="index"
                  >
                  {{item}}
                    <!-- <div 
                      class="project-item"
                      @click.stop="projectItemClick_PPT(item)"
                      :key="item._id">
                        <div class="text-light m-b-5">
                          #<span v-html="highlight(item._id, item.$$pinyin._id)"></span>
                        </div>
                        <div v-html="highlight(item.name, item.$$pinyin.name)"></div>
                    </div> -->
                  </DynamicScrollerItem>
                </template>
              </DynamicScroller> 
          </div>
      </div>
    </div>

    
  </div>
</template>

<script>
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller';
  export default {
    

    components: {
      DynamicScroller,
      DynamicScrollerItem
    },

    data(){
      return {
        /********************* FUNCTION: 虚拟滚动 - 相关 *********************/
        long_data: []    //假如这有上万条数据
      }
    },

    mounted(){
      /********************* FUNCTION: 虚拟滚动 - 模拟大批数据 *********************/
      for (let i = 0; i < 1000; i++) {
        this.long_data.push({id: i})
      }
    }
  }
</script>

<style lang="scss" scoped>

.project {
    position: absolute;
    min-width: 100%;
    max-height: 260px;
    overflow: scroll;
    overflow: overlay;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, .1);
    background: #fff;
    // z-index: 22;

    &-item {
      padding: 10px;
      cursor: pointer;
      border-bottom: 1px solid #e4e7ed;
      &:hover {
        background: #cdeaff;
      }
    }
  }
</style>