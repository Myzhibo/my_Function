<template>
  <div class="text-container" :class="{ 'no-expand': !isExpanded }" ref="textContainer" :style="{
    width: boxWidth
  }">
    <div class="full-text" v-html="fullText"></div>
    <span v-if="!isExpanded && this.hasOverflow" class="expand-btn" @click.stop="toggleExpand">展开全部</span>
    <span v-if="isExpanded" class="no-expand-btn" @click.stop="toggleExpand">收起</span>
  </div>
</template>

<script>
export default {
  name: 'MoreLines',
  data () {
    return {
      isExpanded: false,
      hasOverflow: false,
      truncatedText: '',
    };
  },
  props: {
    fullText: {
      type: String,
      default: '',
    },
    boxWidth: {
      type: String,
      default: '200px',
    },
    leastShowLines: {
      type: Number,
      default: 3,
    }
  },
  mounted () {
    this.processText();
    this.checkOverflow();
  },
  watch: {
    fullText: {
      handler (val) {
        this.$nextTick(() => {
          this.checkOverflow();
        })
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    toggleExpand () {
      this.isExpanded = !this.isExpanded;
      this.processText();
      this.checkOverflow();
    },
    processText () {
      if (this.isExpanded) {
        this.truncatedText = ''; // 展开时不需要截断文本  
        this.fullText = this.cleanText(this.fullText); // 清理文本，避免XSS  
      } else {
        // // 这里应该有一个更复杂的截断逻辑，但为了简单起见，我们假设截断到前N个字符  
        // const maxLength = 100; // 假设每行大约这么多字符（实际中需要更精确的计算）  
        // this.truncatedText = `${this.fullText.slice(0, maxLength)}...`;
      }
    },
    checkOverflow () {
      if (this.isExpanded) {
        this.hasOverflow = false; // 展开时没有溢出  
      } else {
        this.$nextTick(() => {
          // 使用scrollHeight来判断是否溢出  
          const containerHeight = this.$refs.textContainer.clientHeight;
          const textHeight = this.$refs.textContainer.scrollHeight;

          this.hasOverflow = textHeight > containerHeight;
        })
      }
    },
    cleanText (text) {
      // 这里应该添加清理逻辑来避免XSS，但出于示例目的，我们简单返回文本  
      return text;
      // 在实际应用中，你可能需要使用DOMPurify或其他库来清理文本  
    },
  },
}; 
</script>

<style scoped>
.text-container {
  position: relative;
}

.text-container.no-expand {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: v-bind(leastShowLines);
}

.expand-btn {
  position: absolute;
  background-color: #fff;
  bottom: 0;
  right: 0;
  color: #3AA5FF;
  box-shadow: -18px 0px 20px 0px #fff;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.no-expand-btn {
  background-color: #fff;
  color: #3AA5FF;
  box-shadow: -18px 0px 20px 0px #fff;
  cursor: pointer;
}

.icon {
  width: calc(15px * 1120 / 375);
  margin-left: calc(5px * 1120 / 375);
  font-family: PingFang SC;
}
</style>