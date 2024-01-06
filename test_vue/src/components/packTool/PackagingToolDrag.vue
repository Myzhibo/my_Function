<template>
  <!-- 使用scroller这个css类美化了列表 -->
  <div class="packaging-tool">
    <div class="header" style="display: flex;">
      <div class="bold fs-14">快速整理：</div>
      <div><el-link type="primary" :underline="false" @click="handleArrangeClick('noDir')">无文件夹</el-link></div>
      <div style="margin-left:5px; margin-right:5px">|</div>
      <div><el-link type="primary" @click="levelDialogVisible = true" :underline="false">按章节层级  [{{targetPackageLevel}}]</el-link></div>
      <div class="m-l-5 m-r-5">|</div>
      <div> <el-link type="primary" :underline="false" @click="handleExpendAll()">全部{{ expendAll ? '展开' : '闭合' }}</el-link></div>
      <div style="margin-left:30px; margin-top:2px">
        <el-radio-group v-model="unPackFlag" @change="changeFlag">
          <el-tooltip effect="light" placement="top">
            <div slot="content" style="width:180px">
                若文件夹下既有文件又有文件夹，将独立出的文件放进到一个新的文件夹中
            </div>
            <el-radio :label=false>补</el-radio>
          </el-tooltip>
          <el-tooltip effect="light" placement="top">
            <div slot="content" style="width:180px">
                若文件夹下既有文件又有文件夹，将文件夹中的文件拆出
            </div>
            <el-radio :label=true>拆</el-radio>
          </el-tooltip>
        </el-radio-group>
      </div>
    </div>
    <div class="content" style="display: flex;">
      <div class="left">
        <div class="title">文件夹打包预览</div>
        <div class="tree">
          <draggable
            class="scroller"
            v-model="list"
            @start="moveNodeStart"
            @end="moveNodeEnd"
          >
          <div v-for="item of list" :key="item.id">
            <!-- 根节点是否可以操作 -->
            <div
              class="item-style"
              style="justify-content: space-between; display: flex; align-items: center; justify-content: center;"
              :class="{
                'item-style-active': activeNodeId === item.node_id
              }"
              @contextmenu.prevent="showContextMenu($event, item)"
            >
              <div class="item-padding" :style="paddingLeft(item)">
                <div class="item-inner" style="display: flex; align-items: center; justify-content: center;" @click="handleNodeClick(item)">
                  <div class="icon-box" style="display: flex; align-items: center; justify-content: center;">
                    <div v-if="item.type === 'dir'">
                      <div style="display: flex;" v-if="item._closed">
                        <i class="el-icon-caret-right"></i>
                        <i class="el-icon-folder"></i>
                      </div>
                      <div v-else>
                        <i class="el-icon-caret-bottom"></i>
                        <i class="el-icon-folder-opened"></i>
                      </div>
                    </div>
                    <div v-else>
                      <i class="no-chapter-children"></i>
                    </div>
                  </div>
                  <div
                    class="content-box"
                  >
                    <div class="html-render">
                      <span v-if="activeRightClickNode && activeRightClickNode.node_id===item.node_id"><el-input v-model="item.name" @keyup.native.enter="closeEdit" @blur="closeEdit"></el-input></span>
                      <span v-else>{{item.name}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </draggable>
        </div>
      </div>
    </div>
    <div class="footer" style="display: flex;">
        <div class="m-l-10">文件数量为 {{zipFileCount}} </div>
    </div>
    <el-dialog
      title="按章节层级"
      :visible.sync="levelDialogVisible"
      width="500px"
      append-to-body
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom:5px;">
        标题层级：
        <el-input-number v-if="targetPackageLevel !== maxFolderLevel" v-model="targetPackageLevel" :min="1" :max="maxFolderLevel"></el-input-number>
        <el-tooltip v-if="targetPackageLevel === maxFolderLevel" effect="light" placement="right">
          <div slot="content" style="width:130px" v-if="targetPackageLevel === maxFolderLevel">
              当前项目最深层级为{{maxFolderLevel}}层
          </div>
          <el-input-number v-model="targetPackageLevel" :min="1" :max="maxFolderLevel"></el-input-number>
        </el-tooltip>
      </div>
      <div class="download-info" style="margin-bottom:20px;">
        <i class="el-icon-info"></i> Tips : 可以输入按照 N 级标题进行文件夹拆分（如按照 1 级拆分，则每个一级目录一个文件夹）
      </div>
      <div style="margin-bottom:5px;">
        <el-checkbox v-model="isHiddenSplitTitle">是否隐藏拆分标题名称</el-checkbox>
      </div>
      <div class="download-info" style="margin-bottom:20px;">
        <i class="el-icon-info"></i> Tips : 是否去掉文件名称中的文件夹路径
      </div>
      <div style="margin-bottom:5px;">
        <el-checkbox v-model="isAddPrefixNumber">是否保证文件顺序和 json 一致</el-checkbox>
      </div>
      <div class="download-info" style="margin-bottom:20px;">
        <i class="el-icon-info"></i> Tips : 是否在文件名称前加上数字保证文件顺序和 json 一致
      </div>
      <div>
        <el-button type="primary" @click="handleArrangeClick('chapter')">快速整理</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="按章节层级(细分)"
      :visible.sync="partialLevelDialogVisible"
      width="500px"
      append-to-body
      @close="closePartialDialog"
      :close-on-click-modal="false"
    >
      <div style="margin-bottom:5px;">
        标题层级：
        <el-input-number v-if="targetPartialPackageLevel !== maxFolderLevel" v-model="targetPartialPackageLevel" :min="1" :max="maxFolderLevel"></el-input-number>
        <el-tooltip v-if="targetPartialPackageLevel === maxFolderLevel" effect="light" placement="right">
          <div slot="content" style="width:130px" v-if="targetPartialPackageLevel === maxFolderLevel">
              当前项目最深层级为{{maxFolderLevel}}层
          </div>
          <el-input-number v-model="targetPartialPackageLevel" :min="1" :max="maxFolderLevel"></el-input-number>
        </el-tooltip>
      </div>
      <div class="download-info" style="margin-bottom:20px;">
        <i class="el-icon-info"></i> Tips : 可以输入按照 N 级标题进行文件夹拆分（如按照 1 级拆分，则每个一级目录一个文件夹）
      </div>
      <div>
        <el-button type="primary" @click="handleArrangeClickPartial()">快速整理</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { iterateNode } from './scripts/treeHelper';
import _cloneDeep from 'lodash/cloneDeep';
import uuid from './scripts/uuid';
import draggable from 'vuedraggable';

export default {
  name: 'PackagingTool',
  components: { draggable },
  data() {
    return {
      expendAll: true,
      activeNodeId: '',
      treeLoading: false,
      levelDialogVisible: false,
      partialLevelDialogVisible: false,
      zipFileCount: 0,

      unPackFlag: false,
      json1: [], // readonly  所有可能会修改 json1 的地方均使用 _cloneDeep(this.json1)
      json2: [], // json1 经过打包格式化后的数据结构
      maxFolderLevel: 0,
      targetPackageLevel: -1,
      targetPartialPackageLevel: -1,
      isHiddenSplitTitle: false,
      isAddPrefixNumber: 0,
      activeRightClickNode: {},
      // 菜单内容
      menuItems: (...item) => [
        {
          label: '按章节层级',
          onClick: () => {
            this.contextMenuClick('adjust', ...item);
          },
        },
        {
          label: '修改文件名',
          onClick: () => {
            this.contextMenuClick('edit', ...item);
          },
        }
      ],
    };
  },
  props: {
    projectJson: { // 原始数据, 通过格式化后生成 json1
      type: Array,
      require: true,
    },
    zip_file_info: {
      type: Object,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
  },
  computed: {
    list: {
      get() {
        const list = [];
        const json = {
          level: 0,
          name: this.title,
          type: 'dir',
          node_id: uuid(9),
          children: this.json2 || [],
        };
        for (const { node, parent } of iterateNode([json])) {
          node._parent = parent.node_id ? parent : null;
          node._path = parent._path ? [...parent._path, parent] : [];
          if (!node._path.some(item => item._closed)) {
            list.push(node);
          }
        }
        return list;
      },
      // 计算属性加了set, 后续修改this.json2的时候，就可以自动修改list
      set(){}
    },
  },
  watch: {},
  mounted() {
    this.targetPackageLevel = this.zip_file_info.chapter;
    this.isHiddenSplitTitle = this.zip_file_info.hidden_spilt_title;
    this.isAddPrefixNumber = this.zip_file_info.add_prefix_number;
    this.init();
  },
  methods: {
    init() {
      // 处理重复文件名的文件，并依次为文件名添加后缀
      this.projectJson = this.handleDuplicateFiles(this.projectJson);
      // 格式化原始数据, 获得 json1
      this.json1 = this.projectJson

      // 获取当前 json 能够按层级划分的最深层 level 值
      this.maxFolderLevel = this.getFolderMaxLevel(this.json1);

      // 快速整理 json1 , 获得可用于打包的 json2
      this.json2 = this.formatJsonWithLevel(_cloneDeep(this.json1), this.targetPackageLevel);

      // 是否隐藏拆分标题名称
      if (!this.isHiddenSplitTitle) {
        for (const { node } of iterateNode(this.json2)) {
          if (node.type === 'file') node.name = node.dirNamePath + '.' + this.type;
          if (node.type === 'dir') node.name = node.dirNamePath;
        }
      }

      // 文件夹下既有文件夹又有文件, 拆出文件 / 合进文件夹
      if (this.unPackFlag) {
        this.json2 = this.UnpackFolder(this.json2);
      } else {
        this.json2 = this.packFolder(this.json2);
      }

      // 添加序号
      if (this.isAddPrefixNumber) this.json2 = this.formatJsonWithNumber(this.json2, this.targetPackageLevel);

      // 检测文件数量是否正确
      this.zipFileCount = [...iterateNode(this.json2)].filter(item => item.node.type === 'file').length;
      console.log(this.zipFileCount);
    },
    /**
     * 快速整理
     * @params json
     * @params level
     * @return json
     */
    formatJsonWithLevel(json, level) {
      if (level < 0) {
        return json;
      }
      if (level === 0) {
        json = [...iterateNode(json)].map(node => node.node);
        for (const { node } of iterateNode(json)) {
          node.level = 1;
          node.name = node.dirNamePath + '.' + this.type;
          if (node.type === 'dir') {
            json.splice(json.findIndex(item => item.node_id === node.node_id), 1);
          }
        }
        return json;
      }
      // 移动文件
      for (const item of iterateNode(json)) {
        const node = item.node;
        if (node.level === level && node.type === 'dir') {
          node.children = Array.from(iterateNode(node.children)).map(n => n.node).filter(n => n.type === 'file');
          node.children.forEach(n => n.level = node.level + 1);
        }
      }
      return json;
    },
      // 处理重复文件名的文件，并依次为文件名添加后缀 (遍历json 同一个level的所有节点，name一样的话就加序号后缀)
      handleDuplicateFiles(json) {
      const map = {};
      for (const { node } of iterateNode(json)) {
        node.originNodeName = node.node_name;
        const name = node.node_name;
        const level = node.content?.level ?? node.node_level;
        if (!map[`${level}#${name}`]) {
          map[`${level}#${name}`] = 1;
          continue;
        }
        node.node_name = `${name}${++map[`${level}#${name}`]}`;
      }
      return json;
    },
    // 获取当前 json 能够按层级划分的最深层的文件夹的 level 值
    getFolderMaxLevel(json) {
      const maxLevel = Math.max(...[...iterateNode(json)].map(node => node.node.level));
      return maxLevel - 1; // 减去1获取最深层 file 的[文件夹]的 level
    },
    // 渲染目录节点左侧宽度
    paddingLeft(item) {
      const { level } = item;
      return { 'padding-left': 18 * (level) + 'px' };
    },
    // 点击目录节点
    handleNodeClick(item) {
      if (!this.activeRightClickNode.node_id) {
        this.$set(item, '_closed', !item._closed);
        this.activeNodeId = item.node_id;
      }
    },
    // 显示右键菜单
    showContextMenu(event, item) {
      this.sub_name = item.name;
      event.stopPropagation();
      this.$contextmenu({
        items: (item.type === 'dir' && item.level !== 0) ? this.menuItems(item) : [this.menuItems(item)[1]],
        event, // 鼠标事件信息
        customClass: 'custom-class', // 自定义菜单 class
        zIndex: 9999, // 菜单样式 z-index
        minWidth: 230, // 主菜单最小宽度
      });
      return false;
    },
    // 点击菜单选项
    async contextMenuClick(action, ...item) {
      this.activeRightClickNode = item[0];
      if (action === 'adjust') {
        // 查看当前被右键点击的 item 是否已经被细分设置了层级, 若已经设置则弹出框内 input 的 value 展示当前 item 已被设置好的分级数, 否则显示全局的分级数
        if (item[0]._setPackageLevel) {
          this.targetPartialPackageLevel = item[0]._setPackageLevel;
        } else {
          this.targetPartialPackageLevel = this.targetPackageLevel;
        }

        this.partialLevelDialogVisible = true;
      }
      if (action === 'edit') {
      }
    },
    // 快速整理(Partial)
    handleArrangeClickPartial() {
      let partialJson1 = null;
      for (const { node } of iterateNode(_cloneDeep(this.json1))) {
        if (node.node_id === this.activeRightClickNode.node_id) {
          partialJson1 = node;
          break;
        }
      }
      // 快速整理 json1 片段, 获得可用于打包的 json2 片段
      let partialJson2 = this.formatJsonWithLevel(_cloneDeep([partialJson1]), this.targetPartialPackageLevel);

      // 将 json2 片段替换给原 json2
      this.activeRightClickNode._parent.children.splice(this.activeRightClickNode._parent.children.findIndex(item => item.node_id === this.activeRightClickNode.node_id), 1, partialJson2[0]);

      // 文件夹下既有文件夹又有文件, 拆出文件 / 合进文件夹
      if (this.unPackFlag) {
        partialJson2 = this.UnpackFolder(partialJson2);
      } else {
        partialJson2 = this.packFolder(partialJson2);
      }

      // 给 json2 片段加标签, 标记当前片段已经被细分设置的层级
      this.$set(partialJson2[0], '_setPackageLevel', this.targetPartialPackageLevel);

      // 添加序号
      if (this.isAddPrefixNumber) {
        const partialJson2AddNumber = this.formatJsonWithNumber(partialJson2, this.targetPartialPackageLevel, 'partial');
        // 将 json2 片段替换给原 json2
        this.activeRightClickNode._parent.children.splice(this.activeRightClickNode._parent.children.findIndex(item => item.node_id === this.activeRightClickNode.node_id), 1, partialJson2AddNumber[0]);
      }

      // 检测文件数量是否正确
      this.zipFileCount = [...iterateNode(this.json2)].filter(item => item.node.type === 'file').length;

      this.activeRightClickNode = {};
      this.partialLevelDialogVisible = false;
    },
    // 快速整理(Total)
    handleArrangeClick(type) {
      if (type === 'noDir') this.targetPackageLevel = 0;

      // 快速整理 json1, 获得可用于打包的 json2
      this.json2 = this.formatJsonWithLevel(_cloneDeep(this.json1), this.targetPackageLevel);

      // 是否隐藏拆分标题名称
      if (!this.isHiddenSplitTitle) {
        for (const { node } of iterateNode(this.json2)) {
          if (node.type === 'file') node.name = node.dirNamePath + '.' + this.type;
          if (node.type === 'dir') node.name = node.dirNamePath;
        }
      }

      // 文件夹下既有文件夹又有文件, 拆出文件 / 合进文件夹
      if (this.unPackFlag) {
        this.json2 = this.UnpackFolder(this.json2);
      } else {
        this.json2 = this.packFolder(this.json2);
      }

      // 添加序号
      if (this.isAddPrefixNumber) this.json2 = this.formatJsonWithNumber(this.json2, this.targetPackageLevel);

      // 检测文件数量是否正确
      this.zipFileCount = [...iterateNode(this.json2)].filter(item => item.node.type === 'file').length;

      this.activeRightClickNode = {};
      this.levelDialogVisible = false;
    },
    // 切换radio
    changeFlag() {
      this.handleArrangeClick();
      // 切换显示[全部闭合]样式
      this.expendAll = false;
    },
    // 判断被划分层级里如果既有 dir 又有 file
    findLevelWhichDirAndFile(json) {
      const currentLevel = [];
      const result = [];
      if (json.some(j => j.type === 'dir') && json.some(j => j.type === 'file')) {
        return 1;
      }
      for (let i = 2; i < this.maxFolderLevel; i++) {
        for (const { node } of iterateNode(json)) {
          if (node.level === i - 1) {
            currentLevel.push(node);
          }
        }
        currentLevel.forEach(item => result.push(item.children.some(j => j.type === 'dir') && item.children.some(j => j.type === 'file')));
        return i;
      }
      return -1;
    },
    // 拆文件夹
    UnpackFolder(json) {
      // 先判断是否需要拆除
      const needUnpack = this.findLevelWhichDirAndFile(json);
      if (needUnpack) {
        // 修改被拆文件的名字, 路径拼串
        json = this.formatFileName(json, needUnpack);
        // 拆出文件, 替换到被拆文件夹的位置
        for (const item of iterateNode(json)) {
          const { node, index, parent } = item;
          if (node.type === 'dir' && node.level === needUnpack) {
            const nodes = [...iterateNode([node])].filter(item => item.node.type === 'file').map(item => item.node);
            if (parent.children) {
              parent.children.splice(index, 1, ...nodes);
            } else {
              // 没有 parent 说明已经是 level1 了, 直接从 json 中删掉
              json.splice(index, 1, ...nodes);
            }
            nodes.forEach(node => { node.level = needUnpack; });
          }
        }
      }
      return json;
    },
    // 补文件夹
    packFolder(json) {
      const _pack = node => {
        if (!node.children || !node.children.length) {
          return;
        }
        if (node.children.some(node => node.type === 'dir') && node.children.some(node => node.type === 'file')) {
          // 判断一下是不是既有 dir 又有 file
          // 是的话，补目录
          // 否则，返回
          node.children.forEach((c, i) => {
            if (c.type === 'dir') {
              return;
            }
            const _dir = {
              level: c.level,
              name: c.name.split('.')[0],
              _name: c._name || '',
              type: 'dir',
              node_id: uuid(9),
              children: [c],
            };
            c.level = c.level + 1;
            node.children.splice(i, 1, _dir);
          });
        }
        node.children.forEach(c => _pack(c));
        return node;
      };
        
      const _json = { children: json };
      _pack(_json);
      return _json.children;
    },
    // 修改文件名称
    formatFileName(json, needUnpack) {
      for (const { node } of iterateNode(json)) {
        if (node.type === 'file' && node.level >= needUnpack + 1) {
          node.name = node.dirNamePath.split('-').slice(needUnpack - 1).join('-') + '.' + this.type;
        }
      }
      return json;
    },
    // 添加序号
    formatJsonWithNumber(json, chapterLevel, partial = null) {
      // 保留没加序号前的name
      for (const { node } of iterateNode(json)) {
        node._name = node.name;
      }
      for (const { node, parent } of iterateNode(json)) {
        if (node.type === 'file') {
          let Over100 = false;
          let a = 0;
          parent?.children?.forEach(item => {
            if (item.type === 'dir') {
              a = a + 1;
            }
          });
          const suffixIndex = (parent.children || json).filter(c => c.type === 'file').findIndex(c => c === node) + 1 + a;
          // 文件数量小于100时添加序号格式为"01-~99-", 大于100时则为"001-~100-"
          if (json.length > 100 || parent?.children?.length > 100) Over100 = true;
          const suffix = suffixIndex.toString().length === 1 ? (Over100 ? '00' : '0') + suffixIndex : suffixIndex.toString().length === 2 ? (Over100 ? '0' : '') + suffixIndex : suffixIndex.toString();
          if (node.level === chapterLevel + 1) {
            node.name = suffix + '-' + node.name;
          } else {
            node.name = suffix + '-' + node.name;
          }
        }
        if (node.type === 'dir') {
          let Over100 = false;
          if (partial) {
            // 文件数量小于100时添加序号格式为"01-~99-", 大于100时则为"001-~100-"
            if (json.length > 100 || parent?.children?.length > 100) Over100 = true;
            // 如果是局部划分层级, 被右键点击的文件夹名字不需要被修改
            if (node.node_id === this.activeRightClickNode.node_id) {
              node.name = this.activeRightClickNode.name;
            } else {
              const suffixIndex = (parent.children || json).filter(c => c.type === 'dir').findIndex(c => c === node) + 1;
              const suffix = suffixIndex.toString().length === 1 ? (Over100 ? '00' : '0') + suffixIndex : suffixIndex.toString().length === 2 ? (Over100 ? '0' : '') + suffixIndex : suffixIndex.toString();
              node.name = suffix + '-' + node.name;
            }
          } else {
            const suffixIndex = (parent.children || json).filter(c => c.type === 'dir').findIndex(c => c === node) + 1;
            const suffix = suffixIndex.toString().length === 1 ? (Over100 ? '00' : '0') + suffixIndex : suffixIndex.toString().length === 2 ? (Over100 ? '0' : '') + suffixIndex : suffixIndex.toString();
            node.name = suffix + '-' + node.name;
          }
        }
      }
      return json;
    },
    // 打包按钮
    packaging() {
      const json = _cloneDeep(this.json2);
      for (const { node } of iterateNode(json)) {
        delete node._parent;
        delete node._path;
        delete node._closed;
        delete node.node_id;
        delete node.level;
      }
      this.$emit('packaging', json);
    },
    // 关闭编辑
    closeEdit() {
      this.activeRightClickNode = {};
    },
    // 关闭弹窗
    closeDialog() {
      this.activeRightClickNode = {};
    },
    closePartialDialog() {
      this.activeRightClickNode = {};
    },

    // 拖拽: 起始事件
    moveNodeStart(event) {
      // 移动的节点
      const movedNode = this.list[event.oldIndex];
      // 移动时关闭文件夹
      if (movedNode.type === 'dir') this.$set(movedNode, '_closed', true);
    },
    // 拖拽: 结束事件
    moveNodeEnd(event) {
      // 移动的节点
      const movedNode = this.list[event.oldIndex];
      // 新位置之前是谁
      const movedNodeNext = this.list[event.newIndex];
      const step = (event.newIndex - event.oldIndex) > 1
        ? 1
        : (event.newIndex - event.oldIndex) < 0
          ? 0
          : event.newIndex - event.oldIndex;
      if ((event.newIndex - event.oldIndex) !== 0) {
        // 移除拖拽节点
        for (const { node, parent } of iterateNode(this.json2)) {
          if (node.name === movedNode.name) {
            if (parent.children) {
              parent?.children?.splice(parent.children.findIndex(item => item.name === node.name), 1);
            } else {
              this.json2.splice(this.json2.findIndex(item => item.name === node.name), 1);
            }
            break;
          }
        }
        // 重新添加到拖拽目的地
        for (const { node, parent } of iterateNode(this.json2)) {
          if (node.name === movedNodeNext.name) {
            if (parent.children) {
              parent?.children?.splice(parent.children.findIndex(item => item.name === node.name) + step, 0, movedNode);
            } else {
              this.json2.splice(this.json2.findIndex(item => item.name === node.name) + step, 0, movedNode);
            }
            break;
          }
        }
        // 刷一下level
        this.json2 = this.refreshLevel(this.json2);
        // 删除空文件夹
        this.json2 = this.deleteEmptyFolder(this.json2);

        // 文件夹下既有文件夹又有文件, 拆出文件 / 合进文件夹
        if (this.unPackFlag) {
          this.json2 = this.UnpackFolder(this.json2);
        } else {
          this.json2 = this.packFolder(this.json2);
        }

        // 添加序号
        if (this.isAddPrefixNumber) {
          // 使用节点没加序号前的name
          for (const { node } of iterateNode(this.json2)) {
            node.name = node._name;
            // 防止用户直接拖动文件时导致自动补出的文件夹的名子带有后缀
            if (node.type === 'dir' && node.name.split('.')[1] === this.type) {
              node.name = node._name.split('.')[0];
            }
          }
          
          // 再重新加
          this.json2 = this.formatJsonWithNumber(this.json2, this.targetPackageLevel);
        }

        // 检测文件数量是否正确
        this.zipFileCount = [...iterateNode(this.json2)].filter(item => item.node.type === 'file').length;
      }
    },
    // 拖拽完毕后，刷新level
    refreshLevel(json) {
      json.forEach(node => node.level = 1);
      for (const { node } of iterateNode(json)) {
        if (!node.children.every(item => item.level === node.level + 1)) {
          node.children.forEach(item => item.level = node.level + 1);
        }
      }
      return json;
    },
    // 删除空文件夹
    deleteEmptyFolder(json) {
      for (const { node, parent } of iterateNode(json)) {
        if (node.type === 'dir' && node.children.length === 0) {
          if (parent.children) {
            parent?.children?.splice(parent.children.findIndex(item => item.name === node.name), 1);
          } else {
            this.json2.splice(this.json2.findIndex(item => item.name === node.name), 1);
          }
        }
      }
      return json;
    },
    // 全部展开、闭合
    handleExpendAll() {
      this.expendAll = !this.expendAll;
      if (!this.expendAll) {
        // 全部展开
        for (const { node } of iterateNode(this.json2)) {
          if (node.type === 'dir') this.$set(node, '_closed', false);
        }
      } else {
        // 全部闭合
        for (const { node } of iterateNode(this.json2)) {
          if (node.type === 'dir') this.$set(node, '_closed', true);
        }
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.packaging-tool {
  .header {
    height: 40px;
    line-height: 40px;
  }
  .content {
    height: 600px;
    .left {
      width: 100%;
      .tree {
        height: calc(100% - 40px);
        overflow-y: auto;
      }
    }
    .right {
      width: 50%;
      padding-left: 20px;
      border-left: 1px solid #efefef
    }
    .title {
      font-weight: bold;
    }
  }
  .footer {
    height: 40px;
  }
}
.scroller {
  overflow: auto;
  margin: 10px;
  margin-left: 0px;
  border-bottom: 1px solid #efefef;
  .item-style {
    border-top: 1px solid #efefef;
    position: relative;
    &-active{
      color: #409eff;
      background-color: aliceblue;
      opacity: 0.8;
    }
    .item-padding {
      width: 100%;
      height: 40px;
      justify-content: space-between;
      box-sizing: border-box;
      .item-inner {
        height: 100%;
        cursor: pointer;
        justify-content: space-between;
        .icon-box {
          min-width: 40px;
          max-width: 40px;
          font-size: 16px;
          .no-chapter-children {
            min-width: 5px;
            max-width: 5px;
            height: 5px;
            background: rgb(204, 204, 204);
            display: inline-block;
            margin: 4px;
            border-radius: 5px;
          }
        }
        .content-box {
          width: calc(100% - 16px);
          .html-render {
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
        .act-node {
          color: #198cff;
        }
      }
    }
  }
  .item-style:hover {
    color: #409eff;
    background-color: aliceblue;
    opacity: 0.8;
  }
  .make {
    background-color: rgb(215, 234, 210);
  }
  .nomake {
    background-color: rgb(244, 247, 246);
  }
  .disabled {
    pointer-events: none;
    cursor: default;
    opacity: 0.5;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-center {
    text-align: center;
  }
  .bold {
    font-weight: bold;
  }
  .html-render {
    display: inline;

    .katex-display {
      display: inline;
      margin: 0;
      text-align: initial;
    }
    .katex-display > .katex {
      display: inline;
      text-align: initial;
      white-space: normal;
    }
    .katex-display > .katex > .katex-html {
      display: inline;
    }
    .katex {
      display: inline-block;
      white-space: nowrap;
      font-size: 1em;
    }
  }
}
.download-info{
  padding: 10px 20px;
  background: #f7ce9131;
  color: #fd9800;
  font-size: 12px;
}
</style>
