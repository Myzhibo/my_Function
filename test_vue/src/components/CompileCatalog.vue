<template>
  <div class="container" style="overflow: auto;">
    <div>
      <template v-for="(item, index) of flattenJson">
        <div :key="index" class="node-item" style="display: flex;align-items: center;justify-content: center;">
          <div class="level" style="display: flex;align-items: center;justify-content: center;">
            {{item.node_level}}
          </div>
          <div class="content" style="display: flex;">
            {{getNbsp((item.node_level - 1) * 2)}}
            <el-input :id="item.node_id" :value="renderNode(item.node_level, item.node_name)" @input="editNodeNameHandle($event, item)" @keyup.enter.native="enterEditChapterHandle(item)" :ref="item.node_id" @blur="blurEditChapterHandle(item)" @paste.native="handlePaste($event, item)"></el-input>
          </div>
        </div>
      </template>
    </div>
    <div class="node-item input" style="display: flex;align-items: center;justify-content: center;">
      <div class="level" style="display: flex;align-items: center;justify-content: center;">
        {{input_level}}
      </div>
      <div class="content">
        <el-input ref="input" :value="input" placeholder="请输入内容" @input="inputHandle($event)" @keyup.enter.native="createChapterHandle()" @paste.native="handlePaste($event)" @blur="createChapterHandle()"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
import _cloneDeep from 'lodash/cloneDeep';
import { iterateNode } from '/src/scripts/treeHelper';
import { listToTree } from '/src/scripts/helper';
import uuid from '/src/scripts/uuid';

export default {
  components: {},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    bookName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      flattenJson: [],
      input: '',
      input_level: 1,
      json: [],
      pastText: ''
    };
  },
  watch: {
    data () {
      this.init();
    },
    bookName () {
      this.init();
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      const list = [];
      this.json = _cloneDeep(this.data);
      for (const { node, parent } of iterateNode(this.json)) {
        node.node_parent_id = parent.node_id ? parent.node_id : '';
        list.push(node);
      }
      for (const { node, parent } of iterateNode(this.data)) {
        node.node_parent_id = parent.node_id ? parent.node_id : '';
      }
      this.flattenJson = list;
    },
    defaultChapterNode (level, name) {
      return {
        node_level: level,
        node_type: 'chapter',
        node_name: name,
        content: {
          level: level,
          body: '<p>' + name + '</p>'
        },
        children: [],
        node_id: uuid()
      };
    },
    inputHandle (val) {
      if (!this.pastText) {
        this.input = val;
        this.input_level = this.getNodeItemLevel(val);
        if (this.input_level >= 20) {
          this.$message.error('层级不可超过20层');
          this.input = val.replace(/(^\s*)|(\s*$)/, '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0');
          this.input_level = this.getNodeItemLevel(this.input);
        }
      } else {
        this.pastText = '';
      }
    },
    getNodeItemLevel (name) {
      return name.match(/(^\s*)|(\s*$)/)[0].length + 1;
    },
    getNbsp (level) {
      if (level > 0) {
        return new Array(level).fill('\xa0').join('');
      }
      return '';
    },
    createChapterHandle () {
      if (this.input.trim()) {
        const node = this.defaultChapterNode(this.input_level, this.input.trim());
        this.flattenJson.push(node);
        this.flattenJson = this.flattenJson.filter(item => item.node_name);
        const json = listToTree(this.flattenJson);
        this.$emit('data-change', json);
      }
      this.input = this.renderNode(this.input_level, '');
    },
    renderNode (level, name) {
      return this.getNbsp(level - 1) + name.replace(/(^\s*)|(\s*$)/, '');
    },
    editNodeNameHandle (val, item) {
      if (!this.pastText) {
        const oldLevel = item.node_level;
        const newLevel = this.getNodeItemLevel(val);
        item.node_name = val.replace(/(^\s*)|(\s*$)/, '');
        item.content.body = '<p>' + val.replace(/(^\s*)|(\s*$)/, '') + '</p>';
        if (oldLevel !== newLevel) {
          item.node_level = newLevel;
          item.content.level = newLevel;
          this.$nextTick(() => {
            const input = document.getElementById(item.node_id);
            if (!input) return;
            input.setSelectionRange(newLevel - 1, newLevel - 1);
          });
        }
        if (!val) {
          const index = this.flattenJson.findIndex(f => f === item);
          let focusId = '';
          if (index > 0) {
            focusId = this.flattenJson[index - 1].node_id;
          }
          this.flattenJson = this.flattenJson.filter(item => item.node_name);
          const json = listToTree(this.flattenJson);
          this.$emit('data-change', json);
          if (focusId) {
            this.$nextTick(() => {
              this.$refs[focusId][0].focus();
            });
          }
        }
      } else {
        this.pastText = '';
      }
    },
    enterEditChapterHandle (chapter) {
      // 找到按下回车键时
      const selectionStart = this.$refs[chapter.node_id][0]?.$el?.querySelector('input')?.selectionStart;
      console.log(selectionStart);
      const index = this.flattenJson.findIndex((item) => item === chapter)
      if (index === this.flattenJson.length - 1) {
        // 如果是最后一个input, 那么开启新的最下面的空input
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      } else {
        // 如果不是， 那么插入一个input
        let positionIndex;
        if (selectionStart === 0) {
          // 如果光标在最前面， 那么就在上面插入
          positionIndex = index;
        } else {
          // 如果不是， 那么就在下面插入
          positionIndex = index + 1;
        }
        const node = this.defaultChapterNode(chapter.node_level, ' ');
        this.flattenJson.splice(positionIndex, 0, node);
        const focusId = node.node_id;
        this.$nextTick(() => {
          this.$refs[focusId][0].focus();
        });
      }
    },
    blurEditChapterHandle () {
      this.flattenJson = this.flattenJson.filter(item => item.node_name);
      const json = listToTree(this.flattenJson);
      this.$emit('data-change', json);
    },
    handlePaste (event, chapter) {
      const text = (event.clipboardData || window.clipboardData).getData('text');
      const arrtext = text.split(/[(\r\n)\r\n]+/); // 以转行符切割文本字符串
      if (arrtext.length > 1) {
        this.pastText = text;
        if (chapter) {
          chapter.node_level = this.getNodeItemLevel(arrtext[0]) + chapter.node_level - 1;
          chapter.content.level = this.getNodeItemLevel(arrtext[0]) + chapter.node_level - 1;
          chapter.node_name = arrtext[0].trim();
          chapter.content.body = '<p>' + arrtext[0].trim() + '</p>';
          const index = this.flattenJson.findIndex(item => item === chapter);
          arrtext.splice(0, 1);
          arrtext.reverse().forEach(item => {
            const node = this.defaultChapterNode(this.getNodeItemLevel(item) + chapter.node_level - 1, item.trim());
            this.flattenJson.splice(index + 1, 0, node);
          });
        } else {
          this.input = arrtext[arrtext.length - 1];
          this.input_level = this.getNodeItemLevel(arrtext[arrtext.length - 1]);
          arrtext.splice(arrtext.length - 1, 1);
          arrtext.forEach(item => {
            const node = this.defaultChapterNode(this.getNodeItemLevel(item), item.trim());
            this.flattenJson.push(node);
          });
        }
        this.flattenJson = this.flattenJson.filter(item => item.node_name);
        const json = listToTree(this.flattenJson);
        this.$emit('data-change', json);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.container{
  border: 1px solid #aaa;
  .node-item{
    justify-content: space-between;
    .level{
      align-self: stretch;
      max-width: 30px;
      min-width: 30px;
      background: #eee;
      border-right: 1px solid #aaa;
    }
    .content{
      max-width: calc(100% - 40px);
      min-width: calc(100% - 40px);
      ::v-deep .el-input__inner{
        border: none;
        border-radius: 0px;
        padding: 0px;
        height: 40px;
        background-color: transparent;
      }
    }
  }
  .input{
    background: rgba(228,241,255,0.5);
    .level{
      background: rgba(228,241,255,0.5);
    }
  }
}
</style>
