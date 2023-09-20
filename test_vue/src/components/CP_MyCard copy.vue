<template>
  <!-- <FadeTransition :open="open"> -->
    <div
      slot="signal"
      class="text-card-container m-b-10"
      style="position: relative"
      :class="{ 'select-mode': selectMode }"
    >
      <!-- 是否可选模式 -->
      <el-checkbox v-if="selectMode" v-model="data.checked" style="margin-right: 10px;" @change="getBeChecked" />
      <!-- 卡片 -->
      <el-card
        style="width: 100%"
        shadow="hover"
        @mouseenter.native="hoverCard"
        @mouseleave.native="leaveCard"
        @click.native="handleCardClick"
        :class="[
          // data.inBasket ? 'in-basket' : '',
          data.inBasket ?  ($route.path !=='/propositionConfig' ?'in-basket' : '') : '',
          unfit ? 'unfit' : '',
          subscribe ? 'subscribe' : '',
          // data.content && [0, 1].includes(data.content.rewrite_status) ? 'disabled' : '',
          // data.content && [0, 1].includes(data.content.proposition_status) ? 'disabled' : ''
        ]"
      >
        <div class="text-card-container-header flex-between" v-if="!headerHidden">
          <div
            class="flex-start"
            style="width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
            :title="
              (data.article_type || '暂无文章类型') +
              ' | ' +
              data.tags.join('、') +
              ' | 词数 ' +
              ((data.adopt_words_num ? data.adopt_words_num : data.words_num) || '未知') +
              ' | 难度 ' +
              (data.lexile_score >= 0 ? data.lexile_score + 'L' : '未知')
            "
          >
            <div v-if="data.content" style="margin-right: 5px">
              <a
                v-if="data.content.rewrite_status === -1 && data.content.proposition_status === -1"
                style="color: red; border: 1px solid red; border-radius: 2px; padding: 0 5px"
              >
                待改写
              </a>
              <a
                v-if="[0, 1].includes(data.content.rewrite_status)"
                style="color: blue; border: 1px solid blue; border-radius: 2px; padding: 0 5px"
              >
                改写中
              </a>
              <a
                v-if="[2].includes(data.content.rewrite_status)"
                style="color: gray; border: 1px solid gray; border-radius: 2px; padding: 0 5px"
              >
                待确认结果
              </a>
              <a
                v-if="
                  data.content.rewrite_status === 4 &&
                  data.content.proposition_status === -1 &&
                  ![0, 1].includes(data.content.rewrite_status)
                "
                style="color: red; border: 1px solid red; border-radius: 2px; padding: 0 5px"
              >
                待命题
              </a>
              <a
                v-if="[0, 1].includes(data.content.proposition_status) && ![0, 1].includes(data.content.rewrite_status)"
                style="color: blue; border: 1px solid blue; border-radius: 2px; padding: 0 5px"
              >
                命题中
              </a>
              <a
                v-if="[2].includes(data.content.proposition_status) && ![0, 1].includes(data.content.rewrite_status)"
                style="color: gray; border: 1px solid gray; border-radius: 2px; padding: 0 5px"
              >
                待确认结果
              </a>
              <a
                v-if="data.content.proposition_status === 4 && ![0, 1].includes(data.content.rewrite_status)"
                style="color: #67c23a; border: 1px solid #67c23a; border-radius: 2px; padding: 0 5px"
              >
                已采用结果
              </a>
            </div>
            <template v-if="$route.name === 'readingsetDetail'">
              <div v-if="data.content.proposition_text_task_info.length > 0">
                {{ convertPropositionQuestionType(data.content.proposition_text_task_info.config.question_type) }}
              </div>
              <div v-else>题型&nbsp;未知</div>
              <div class="m-l-5 m-r-5">|</div>
            </template>
            <div v-if="data.article_type">{{ data.article_type }}</div>
            <div v-else>暂无文章类型</div>
            <div class="m-l-5 m-r-5">|</div>
            <div v-if="data.tags.length > 0">{{ data.tags.join('、') }}</div>
            <div v-else>暂无标签</div>
            <template v-if="$route.name !== 'abstractLib'">
              <div class="m-l-5 m-r-5">|</div>
              <div v-if="data.words_num">
                词数&nbsp;{{ data.adopt_words_num ? data.adopt_words_num : data.words_num }}
              </div>
              <div v-else>词数&nbsp;未知</div>
              <div class="m-l-5 m-r-5">|</div>
              <div v-if="data.lexile_score >= 0">难度&nbsp;{{ data.lexile_score }}L</div>
              <div v-else>难度&nbsp;未知</div>
            </template>
            <template v-if="$route.name === 'propositionLib'">
              <div class="m-l-5 m-r-5">|</div>
              <div v-if="data.question_type">
                {{ convertPropositionQuestionType(data.question_type) }}
              </div>
              <div v-else>题型&nbsp;未知</div>
            </template>
          </div>
          <div v-if="$route.name !== 'readingsetDetail'" style="float: right">
            <div v-if="data.source === 'import'">
              <div v-if="$route.path === '/fullTextLib' || $route.path === '/rewriteLib'">
                <div style="color: gray; font-size: 12x; white-space: nowrap; overflow: hidden">
                  <i v-if="data.import_status === 1" class="el-icon-loading" />
                  <i v-if="data.import_status === 2" class="el-icon-circle-check" />
                  <span v-if="data.creator_name"> 本地数据 - 导入人: {{ data.creator_name }} </span>
                  <span v-else>本地数据</span>
                </div>
              </div>
              <div v-else></div>
            </div>
          </div>
          <div v-if="$route.name !== 'readingsetDetail'" style="float: right">
            <div v-if="data.adopt_id" style="white-space: nowrap; overflow: hidden; float: right">
              <div v-if="$route.path === '/rewriteLib'" style="float: right; margin-left: 10px;">
                <div class="dynamic_font2" style="color: #67c23a">已有改写被采纳</div>
                <!-- <div class="dynamic_font2" style="color: #67c23a">已有改写被采纳 - 采纳人: 123123131231231322</div> -->
              </div>
              <div v-if="$route.path === '/propositionLib'" style="float: right">
                <div class="dynamic_font2" style="color: #67c23a">已有命题被采纳</div>
                <!-- <div class="dynamic_font2" style="color: #67c23a">已有命题被采纳 - 采纳人: 1231123123132</div> -->
              </div>
              <div v-else></div>
            </div>
          </div>
          <!-- reading set 里的卡片，需要很多按钮和状态 -->
          <div v-if="$route.name === 'readingsetDetail' && data.content" class="c-full-pipeline">
            <div class="c-full-pipeline-info">
              <a
                v-if="data.content.rewrite_status === -1 && data.content.proposition_status === -1"
                @click.stop="$router.push({ path: '/editFullText', name: 'editFullText', params: data,
                    query: { id: data.content.full_text_id, backUrl: encodeURIComponent($route.fullPath), currentNode:currentNode }
                    })"
              >
                全文编辑
              </a>
              <a
                v-if="data.content.rewrite_status === -1 && data.content.proposition_status === -1"
                @click="data.inReWriteBasket ? handleRemoveWidthBasket('rewrite', data) : handleAddRewrite()"
              >
                {{ data.inReWriteBasket ? '移出改写篮' : '加入改写篮' }}
              </a>
              <a v-if="data.content.rewrite_status === 3" @click="handleRerunRewrite"> 改写异常，重跑 </a>
              <a
                v-if="[2, 4].includes(data.content.rewrite_status) && data.content.proposition_status === -1"
                @click.stop="
                  $router.push({
                    path: `/editRewriteResult`,
                    name: 'editRewriteResult',
                    params: data,
                    query: { id: data.content.rewrite_text_id, backUrl: encodeURIComponent($route.fullPath), currentNode:currentNode }
                  })
                "
              >
                改写预览
              </a>
              <a
                v-if="
                  data.content.rewrite_status === 4 &&
                  data.content.proposition_status === -1 &&
                  ![0, 1].includes(data.content.rewrite_status)
                "
                @click="data.inPropBasket ? handleRemoveWidthBasket('proposition', data) : handleAddProposition()"
              >
                {{ data.inPropBasket ? '移出命题篮' : '加入命题篮' }}
              </a>
              <a
                v-if="data.content.proposition_status === 3 && ![0, 1].includes(data.content.rewrite_status)"
                @click="handleRerunProposition"
              >
                命题异常，重跑
              </a>
              <a
                v-if="[2, 4].includes(data.content.proposition_status) && ![0, 1].includes(data.content.rewrite_status)"
                @click.stop="
                  $router.push({
                    path: `/editPropositionResult`,
                    name: 'editPropositionResult',
                    params: data,
                    query: { id: data.content.proposition_text_id, backUrl: encodeURIComponent($route.fullPath), currentNode:currentNode }
                  })
                "
              >
                命题预览
              </a>
            </div>
            <slot name="readingSetDetail"></slot>
          </div>
        </div>
        <!-- 删除文章篮 -->
        <div
          v-if="!deleteHidden"
          class="text-card-container-left"
          style="position: absolute; top: 0px; right: 0px; cursor: pointer"
        >
          <i
            class="el-icon-error"
            style="color: rgba(190, 32, 32, 0.822); font-size: 23px"
            @click.stop="handleDelete"
          />
        </div>
        <div
          v-show="multiDelete"
          :class="{ active: isActive }"
          style="position: absolute; top: 0px; right: 0px; cursor: pointer"
        >
          <i class="el-icon-error" style="font-size: 23px" />
        </div>
        <!-- 卡片内容 -->
        <div class="text-card-container-content" style="position: relative">
          <!-- 标题 -->
          <!-- EN、ALL要英文 -->
          <div
            v-if="mode != 2"
            class="title"
            style="font-size: 20px; font-weight: bold"
            :title="data.title_en"
            v-html="serial_num ? serial_num+' | '+highlight(data.title_en) : highlight(data.title_en)"
          />
          <div v-if="mode != 1">
            <!-- CN要中文 -->
            <p
              v-if="mode === 2"
              class="title"
              :title="data.title_ch"
              style="font-size: 20px; font-weight: bold"
              v-html="highlight(data.title_ch)"
            />
            <!-- ALL要中文 -->
            <p
              v-else
              class="title"
              :title="data.title_ch"
              style="font-size: 14px; font-weight: bold"
              v-html="highlight(data.title_ch)"
            />
            <!-- CN要中文 -->
            <p
              v-if="mode === 2"
              class="title"
              :title="data.title_cn"
              style="font-size: 20px; font-weight: bold"
              v-html="highlight(data.title_cn)"
            />
            <!-- ALL要中文 -->
            <p
              v-else
              class="title"
              :title="data.title_cn"
              style="font-size: 14px; font-weight: bold"
              v-html="highlight(data.title_cn)"
            />
            <span v-if="!highlight(data.title_cn) && !highlight(data.title_ch)" style="font-size: 14px">
              暂无中文标题
            </span>
          </div>

          <!-- 摘要，只给摘要文库 -->
          <div v-if="$route.path === '/abstractLib'">
            <!-- EN、ALL要英文 -->
            <div
              v-if="data.summary_en && mode != 2 && !abstractHidden"
              class="abstract"
              :title="html2text(data.summary_en)"
              style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
            >
              <span style="font-size: 14px"><span v-html="highlight(html2text(data.summary_en))"></span></span>
            </div>
            <div v-if="!data.summary_en && mode != 2 && !abstractHidden">No Summary Info</div>
            <div
              v-if="data.summary_ch && mode != 1 && !abstractHidden"
              class="abstract"
              :title="html2text(data.summary_ch)"
              style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden"
            >
              <!-- CN要中文 -->
              <span
                v-if="mode === 2"
                class="title"
                :title="data.summary_ch"
                style="font-size: 14px"
                v-html="highlight(html2text(data.summary_ch))"
              ></span>
              <!-- ALL要中文 -->
              <span
                v-if="mode === 3"
                class="title"
                :title="data.summary_ch"
                style="font-size: 14px"
                v-html="highlight(html2text(data.summary_ch))"
              ></span>
            </div>
            <div v-if="!data.summary_ch && mode != 1 && !abstractHidden">暂无摘要信息</div>
          </div>
          <!-- 原文，除去摘要文库 -->
          <div
            v-if="$route.path !== '/abstractLib' && mode != 2 && !textHidden"
            class="origin_article"
            :title="html2text(data.adopt_article || data.article || data.origin_article || '')"
          >
            <p style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">
              <span v-if="data.adopt_article" v-html="highlight(html2text(data.adopt_article))"></span>
              <span v-else-if="data.article" v-html="highlight(html2text(data.article))"></span>
              <span v-else-if="data.origin_article" v-html="highlight(html2text(data.origin_article))"></span>
            </p>
          </div>
          <div
            v-if="$route.path !== '/abstractLib' && mode !== 1"
            style="font-size: 14px"
            :title="html2text(data.translation || data.origin_article_translation)"
          >
            <p style="width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden">
              {{ data.translation || data.origin_article_translation }}
            </p>
          </div>
          <div
            v-if="$route.path !== '/abstractLib' && mode !== 1 && !data.translation && !data.origin_article_translation"
            style="font-size: 14px"
          >
            暂无原文翻译
          </div>
        </div>
        <div class="text-card-container-footer flex-between" v-if="!footerHidden">
          <div style="position: relative; top: 3px;white-space: nowrap;
  overflow: hidden;
 text-overflow: ellipsis;max-width: 350px;">
            <span>{{ data.receive_time || data.create_at || data.update_time }}</span>
            <span
            :title="data.article_source || data.source || '未知'"
              v-if="
                data.article_source !== 'import' &&
                data.source !== 'import' &&
                data.article_source !== 'algo' &&
                data.source !== 'algo'
              "
            >
              | {{ data.article_source || data.source || '未知' }}
            </span>
          </div>
          <div style="display: flex">
            <div v-if="$route.path === '/rewriteLib'" style="position: relative; right: 10px; top: 3px">
              <span v-if="data.creator_name">
                <div class="dynamic_font2" style="color: gray;
                font-size: 10px;margin-top: 5px;">改写人: {{ data.creator_name }}</div>
              </span>
              <!-- <span v-else>
                <div class="dynamic_font2" style="color: gray">改写人: 未知</div>
              </span> -->
            </div>
            <div v-if="$route.path === '/propositionLib'" style="position: relative; right: 10px; top: 3px">
              <span v-if="data.creator_name">
                <div class="dynamic_font2" style="color: gray;
                font-size: 10px;margin-top: 5px;">命题人: {{ data.creator_name }}</div>
              </span>
              <!-- <span v-else>
                <div class="dynamic_font2" style="color: gray">命题人: 未知</div>
              </span> -->
            </div>
            <slot name="option"></slot>
          </div>
        </div>
      </el-card>
    </div>
  <!-- </FadeTransition> -->
</template>

<script lang="ts">
import * as _filter from '@/utils/filter';
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
import FadeTransition from '@/views/myLibs/components/FadeTransition.vue';

@Component({ components: { FadeTransition } })
export default class TextCard extends Vue {
  @Prop() data: any;
  @Prop() serial_num: any; // 卡片序号
  @Prop({ default: 1 }) readonly mode!: number; // 1 - 英文，2 - 中文，3 - 中英文
  @Prop() keyword?: string;
  @Prop() subscribe?: any;
  @Prop() unfit?: any;
  @Prop() headerHidden?: boolean;
  @Prop({ default: false }) abstractHidden?: boolean;
  @Prop({ default: false }) textHidden?: boolean;
  @Prop() footerHidden?: boolean;
  @Prop({ default: true }) deleteHidden?: boolean;
  @Prop({ default: false }) multiDelete?: boolean;
  @Prop({ default: false }) cancelSelected?: boolean;
  @Prop() source?: any;
  @Prop({ default: false }) selectMode?: boolean; // 选择模式
  @Prop({ default: false }) open?: boolean; // 开启过渡动画

  @Prop() currentNode: any; // readingset页当前卡片所在节点

  isActive = false;

  mounted() {
    this.handleCleanCardSelect();
  }

  @Watch('cancelSelected', { deep: true })
  cancelChange() {
    if (this.cancelSelected === false) {
      this.isActive = false;
    } else {
      this.isActive = true;
    }
  }

  /**
   * html 变纯文本（依赖浏览器 document 环境）
   * @param html
   */
  html2text(html: string) {
    const el = document.createElement('div');
    el.innerHTML = html;
    const text = el.innerText;
    return text;
  }

  highlight(html: string) {
    if (!this.keyword) {
      return html;
    }
    if (html) {
      return html.replace(new RegExp(this.keyword, 'gi'), (...args) => {
        return `<span class="highlight">${args[0]}</span>`;
      });
    }
  }

  hoverCard() {
    this.$emit('getHidden', false, this.data._id);
  }

  leaveCard() {
    this.$emit('getHidden', true, '');
  }

  clickDelete() {
    this.isActive = !this.isActive;
    this.$emit('getId', this.data._id);
  }

  clickCard(router: any) {
    if (router === '/abstractLib') {
    }
    if (router === '/fullTextLib') {
      this.$router.push({
        path: '/editFullText',
        name: 'editFullText',
        params: this.data,
        query: { id: this.data._id },
      });
    }
    if (router === '/rewriteLib') {
      this.$router.push({
        path: '/editRewriteResult',
        name: 'editRewriteResult',
        params: this.data,
        query: { id: this.data._id },
      });
    }
    if (router === '/propositionLib') {
      this.$router.push({
        path: '/editPropositionResult',
        name: 'editPropositionResult',
        params: this.data,
        query: { id: this.data._id },
      });
    }
  }

  // 可选模式下，清空所有已经选择的卡片
  handleCleanCardSelect() {
    if (this.data.checked) {
      this.data.checked = false;
    }
  }

  // 可选模式下，选中多选框通知父组件触发'select'
  getBeChecked() {
    this.data.checked = !this.data.checked;
    this.$set(this.data, 'checked', !this.data.checked);
    this.$emit('select', this.data);
  }

  handleCardClick(data: any) {
    if (this.selectMode) {
      this.$set(this.data, 'checked', !this.data.checked);
      this.$emit('select', this.data);
      return;
    }
    if (this.multiDelete) {
      return this.clickDelete();
    }
    return this.clickCard(this.$route.path);
  }

  convertPropositionQuestionType = _filter.convertPropositionQuestionType;

  @Emit()
  handleDelete() {
    return this.data;
  }

  @Emit()
  handleRemoveWidthBasket(type: 'rewrite' | 'proposition', data: any) {
    return {
      type,
      data,
    };
  }

  @Emit()
  handleAddRewrite() {
    return this.data;
  }

  @Emit()
  handleAddProposition() {
    return this.data;
  }

  @Emit()
  handleRerunRewrite() {
    return this.data;
  }

  @Emit()
  handleRerunProposition() {
    return this.data;
  }
}
</script>

<style scoped lang="scss">
.active {
  color: rgba(190, 32, 32, 0.822);
}
// 设置文字自适应
.dynamic_font2 {
  white-space: nowrap; /*文字不换行*/
  overflow: hidden; /*超出部分隐藏*/
  text-overflow: ellipsis; /*溢出部分用省略号表示*/
}
@media screen and (max-width: 1005px) {
  .dynamic_font2 {
    font-size: 2px;
    width: 60px;
  }
}
@media screen and (max-width: 950px) {
  .dynamic_font2 {
    font-size: 2px;
    width: 30px;
  }
}
.text-card-container {
  width: 100%;
  cursor: pointer;
  &.select-mode {
    display: flex;
    align-items: center;
  }
  &-header {
    .c-full-pipeline {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
    }
    .c-full-pipeline-info {
      display: flex;
      flex-wrap: nowrap;
      > a {
        cursor: pointer;
        text-decoration: underline;
        white-space: nowrap;
        &:not(:last-child) {
          margin-right: 5px;
        }
      }
      a:hover{
        color: rgb(0, 68, 255);
      }
    }
  }
  &-content {
    width: 100%;
    .title {
      margin-bottom: 0px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .abstract,
    .origin_article {
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  &-footer {
    width: 100%;
  }
}
.in-basket {
  background-color: rgb(233, 253, 233);
}

.subscribe {
  background-color: rgb(233, 253, 233);
}

.unfit {
  background-color: rgb(253, 233, 233);
}

.disabled {
  pointer-events: none;
}

::v-deep .el-card {
  border-color: #ddd;
  border-radius: 5px;

  .highlight {
    background-color: skyblue;
    color: white;
  }
}
::v-deep .el-card__body {
  padding: 10px 20px;
}
</style>
