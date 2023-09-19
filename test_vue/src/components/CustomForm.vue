<template>
  <div class="main">
    <el-dialog
      ref="myDialog"
      @open="open"
      :modal="true"
      :append-to-body="true"
      :modal-append-to-body="true"
      :close-on-click-modal="false"
      :show-close="true"
      :close-on-press-escape="true"
      :before-close="handleClose"
      :title="title"
      :visible.sync="isShow"
      :width="width"
      :height="height"
      center
    >
      <!-- :before-close="handleClose" -->
      <el-form :model="form">
        <!-- <el-form-item label="文体" label-width="50px">
          <el-select v-model="form.articleType" style="width: 200px">
            <el-option
              v-for="item in articleTypeList"
              v-bind:key="item.id"
              :value="item.id"
              @click.native="form.articleType = item.id"
            >
              {{ item.label }}
            </el-option>
          </el-select>
        </el-form-item> -->

        <div class="flex-between" v-if="needRadio">
          <div
            class="dialog-footer"
            style="
              padding-left: 50px;
              margin-bottom: 10px;
              margin-top: -10px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            "
          >
            <template>
              文章状态：
              <el-tooltip
                class="item"
                effect="dark"
                content="适用于: 当前文章需要进行进一步改写操作。提交后,文章将同步进入全文文库"
                placement="top-start"
              >
                <el-radio v-model="need" label="不直接命题">不直接命题</el-radio>
              </el-tooltip>
              <el-tooltip
                class="item"
                effect="dark"
                content="适用于: 当前文章不需要进行改写操作。提交后,文章将同步进入全文文库及改写文库"
                placement="top-start"
              >
                <el-radio v-model="need" label="可直接命题">可直接命题</el-radio>
              </el-tooltip>
            </template>
          </div>
        </div>
        <div style="position: relative; left: 50px; bottom: 10px;">
            <!-- 为父组件放置一个插槽 -->
            <slot name="tips"></slot>
        </div>
        <el-form-item v-if="needTitle" label="标题" label-width="50px" style="padding-right: 40px">
          <AIGCEditor
            v-show="true"
            class="rich-editor"
            v-model="form.title"
            key="title_simple_editor"
            mode="replace"
            :disabled="false"
            :options="{ hideMarkBtn: true, height: '50px', extraPlugins: 'divarea' }"
          />
        </el-form-item>
        <el-form-item v-if="needContent" label="正文" label-width="50px" style="padding-right: 40px">
          <AIGCEditor
            v-show="true"
            class="rich-editor"
            v-model="form.content"
            key="content_simple_editor"
            mode="replace"
            :disabled="false"
            :options="needTitle
                      ? { hideMarkBtn: true, height: '300px', extraPlugins: 'divarea' }
                      : { hideMarkBtn: true, height: '550px', extraPlugins: 'divarea' }"
          />
        </el-form-item>
      </el-form>
      <div class="flex-between">
        <div
          slot="footer"
          class="dialog-footer"
          style="padding-left: 50px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
        >
          <span v-if="needFooterInfo">{{ word_num }}/2000</span><br />
          <span v-if="needFooterInfo">说明: 请将输入控制在2000字以内。输入后，机器会自动去掉所有标签样式。</span><br />
          <span v-if="needFooterInfo">相关阅读难度与标签，会在后端同步自动计算。</span><br />
        </div>
        <div
          slot="footer"
          class="dialog-footer"
          style="padding-right: 40px; white-space: nowrap; position: relative; top: 16px"
        >
          <el-button size="small" type="primary" @click="sumbit()">提交结果</el-button>
          <el-button size="small" @click="cancle()">取 消</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import editor from 'hexin-ckeditor-doc-vue/dist/editor.umd.js';
import 'hexin-ckeditor-doc-vue/dist/editor.css';
import { importFullText, importRewriteText } from '@/api/myLibs/index';
import { cleanContentHtml, getWordNum } from '@/utils/html';

const AIGCEditor = editor.AIGCEditor;

export default {
  components: { AIGCEditor },
  props: {
    needRadio: {
      type: Boolean,
      default: false,
    },
    needTitle: {
      type: Boolean,
      default: true,
    },
    needContent: {
      type: Boolean,
      default: true,
    },
    needFooterInfo: {
      type: Boolean,
      default: true,
    },
    isShows: {
      type: Boolean,
      default: true,
    },
    ifEyeCare: { type: Boolean },
    switchStyle: {
      type: Boolean,
      default: true,
    },
    toLibrary: {
      type: String,
      default: undefined,
    },
    title: {
      type: String,
      default: '新增',
    },
    width: {
      type: String,
      default: '35%',
    },
    height: {
      type: String,
      default: '1000px',
    },
    node_parent_id: {
      type: String,
      default: undefined,
    },
    project_id: {
      type: String,
      default: undefined,
    },
    article_content: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      isShow: false,
      need: '不直接命题',
      form: {
        articleType: '说明文',
        title: '',
        content: '',
      },
      articleTypeList: [
        { id: '说明文', label: '说明文' },
        { id: '记叙文', label: '记叙文' },
        { id: '议论文', label: '议论文' },
        { id: '其他', label: '其他' }
      ],
      word_num: 0,
    };
  },

  mounted() {
    /*
     * 获取vuex getter
     * console.log(this.$store.getters.user?.orgs[0]?.orgId);
     */
  },
  watch: {
    isShows(newValue, oldValue) {
      this.isShow = newValue;
    },
    'form.content': {
      handler(oldValue, newVal) {
        this.word_num = getWordNum(this.form.content);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    // 打开
    open() {
      // console.log('我打开了');
      // 判断是否是护眼模式, 若是则将dialog样式调整成护眼模式
      if (this.ifEyeCare) {
        setTimeout(() => { // dialog打开之后再调整样式
          this.$refs.myDialog.$el.classList.toggle('eyecare-mode');
        }, 100);
      }
      // 获取到命题编辑最新的文章
      this.form.content = this.article_content;
    },
    // 提交
    async sumbit() {
      if (this.$route.path === '/editPropositionResult') {
        // 重跑命题
        this.$emit('submitChange', this.form.content);
      } else {
        this.isShow = false;
        await this.postData(
          this.form.title,
          this.form.content,
          this.form.articleType,
          this.node_parent_id,
          this.project_id
        );
        await this.$emit('getShow', false, 'save');
        this.form.title = '';
        this.form.content = '';
        if (this.$route.path === '/readingsetDetail') {
          if (this.need === '不直接命题') {
            this.$message({ type: 'success', message: '导入成功, 并已同步加入到全文文库' });
          }
          if (this.need === '可直接命题') {
            this.$message({ type: 'success', message: '导入成功, 并已同步加入到全文文库、改写文库' });
          }
        }
      }
    },
    // 取消
    cancle() {
      this.isShow = false;
      this.$emit('getShow', false);
      this.form.title = '';
      this.form.content = '';
    },
    // 右上角退出
    handleClose() {
      this.isShow = false;
      this.$emit('getShow', false);
      this.form.title = '';
      this.form.content = '';
    },

    async postData(title, content, articleType, node_parent_id, project_id) {
      console.log(this.toLibrary);
      console.log(this.need);
      console.log(this.toLibrary === 'full_text');
      console.log(this.toLibrary === 'readingDetail' && this.need === '不直接命题');
      console.log(this.toLibrary === 'rewrite');
      console.log(this.toLibrary === 'readingDetail' && this.need === '可直接命题');

      if (this.toLibrary === 'full_text' || (this.toLibrary === 'readingDetail' && this.need === '不直接命题')) {
        await importFullText({
          customer_id: this.$store.getters.user?.orgs[0]?.orgId,
          title_en: cleanContentHtml(title),
          article: cleanContentHtml(content),
          node_parent_id: node_parent_id || undefined,
          project_id: project_id || undefined,
        });
      }
      if (this.toLibrary === 'rewrite' || (this.toLibrary === 'readingDetail' && this.need === '可直接命题')) {
        await importRewriteText({
          customer_id: this.$store.getters.user?.orgs[0]?.orgId,
          title_en: cleanContentHtml(title),
          article: cleanContentHtml(content),
          node_parent_id: node_parent_id || undefined,
          project_id: project_id || undefined,
        });
      }
    },
  },
};
</script>
<style scoped lang="scss">
@import '../../../styles/_vars.scss';
.c-chapter {
  @include chapter;
  ::v-deep * {
    @include chapter;
  }
}
.divauto {
  margin: 10px auto 0 auto;
}
::v-deep .cke_editable p {
  font-size: 18px;
}
.eyecare-mode{
  filter: invert(10%) hue-rotate(180deg) brightness(90%) !important;
}
</style>
