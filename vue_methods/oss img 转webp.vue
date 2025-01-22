
<template>
  <img
    v-if="loaded && src"
    class="c-question-img"
    :src="imageUrl"
    :width="imgWidth.includes('px') ? imgWidth : ''"
    :height="imgHeight.includes('px') ? imgHeight : ''"
    style="vertical-align: middle"
    :style="{
      width: imgWidth.includes('vw') ? imgWidth : '',
      height: imgHeight.includes('vw') ? imgHeight : ''
    }"
  />
</template>
<script>
export default {
  name: 'WebpImage',
  props: {
    src: {
      type: String,
      required: true
    },
    useWebp: {
      type: Boolean,
      require: false,
      default: false
    },
    downsize: {
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      originalUrl: this.src,
      imgHeight: '',
      imgWidth: '',
      loaded: false
    };
  },
  computed: {
    imageUrl() {
      return this.useWebp && this.loaded ? this.originalUrl : this.src;
    }
  },
  watch: {
    src: {
      async handler(n, o) {
        this.originalUrl = this.src;
        await this.initImage();
      },
      immediate: true
    }
  },
  async mounted() {},
  methods: {
    getImageSize(url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const imgStyle = {};
          // 检查浏览器宽度，如果小于 1120px， 使用 vw
          if (window.innerWidth < 1120) {
            imgStyle.width = `${(img.naturalWidth / 1120) * 100}vw`;
            imgStyle.height = `${(img.naturalHeight / 1120) * 100}vw`;
          } else {
            imgStyle.width = `${img.naturalWidth}px`;
            imgStyle.height = `${img.naturalHeight}px`;
          }
          resolve(imgStyle);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    },
    handleImgFormatConvert(url) {
      if (!url || (url && !url.includes('http'))) return;
      const newUrl = new URL(url);
      // 检查主机名是否包含阿里云 OSS
      if (!(newUrl.hostname.includes('oss') && newUrl.hostname.includes('aliyuncs.com'))) {
        return url;
      }
      // 获取查询参数
      const urlSearch = new URLSearchParams(newUrl.search);
      // // 如果有该key
      if (urlSearch.has('x-oss-process')) {
        if (!urlSearch.get('x-oss-process').includes('format,webp')) {
          // 新增
          urlSearch.set(
            'x-oss-process',
            `${urlSearch.get('x-oss-process')}/format,webp${this.downsize ? '/resize,l_700' : ''}`
          );
        }
      }
      // 配置key
      else {
        urlSearch.set('x-oss-process', `image/format,webp${this.downsize ? '/resize,l_700' : ''}`);
      }
      // 总是配置为webp
      // 格式化
      newUrl.search = urlSearch.toString();
      return newUrl.toString();
    },
    /**
     * 1.拿到src，根据这个src获取naturalWidth和naturalHeight宽高
     * 2.拿到去除resize的路径
     * 3.重新设置宽高
     */
    async initImage() {
      if (this.useWebp && !this.originalUrl?.toLowerCase().endsWith(',webp')) {
        this.originalUrl = this.handleImgFormatConvert(this.originalUrl);
      }
      // 如果src内没有进行resize，直接return
      if (!/\/resize,([pw])_(\d+)/.test(this.src)) {
        this.loaded = true;
        return;
      }
      const imgSize = await this.getImageSize(this.src);
      if (imgSize) {
        const reg = /\/resize,(p|w)_(\d+)/;
        this.originalUrl = this.src.replace(reg, '');
        this.imgHeight = imgSize.height;
        this.imgWidth = imgSize.width;
      }
      this.loaded = true;
    }
  }
};
</script>

<style scoped lang="scss"></style>
