<script>
export default {
  name: 'WebpImage',
  props: {
    src: {
      type: String,
      required: true
    },
    // 是否转换 webp
    useWebp: {
      type: Boolean,
      require: false,
      default: false
    },
    resize: {
      type: String,
      require: false,
      default: ''
    },
    // 是否开启懒加载
    useLazy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      originalUrl: this.src,
      imgHeight: '',
      imgWidth: '',
      loaded: false,
      lazySrc: ''
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
        if(!this.useLazy) {
          this.originalUrl = this.src;
          await this.initImage();
        }
      },
      immediate: true
    }
  },
  async mounted() {
    this.$nextTick(() => {
      if (this.useLazy) this.setupIntersectionObserver();
    });
  },
  beforeDestroy() {
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
  },
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
      if (!url?.includes('http')) {
        // 防止传入的 src 为空，或不是一个合法的 link
        return;
      }
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
          // 在现有的x-oss-process值后面追加 /format/resize 等配置
          urlSearch.set(
            'x-oss-process',
            `${urlSearch.get('x-oss-process')}/format,webp${this.resize ? `/resize,${this.resize}` : ''}`
          );
        }
      }
      // 配置key
      else {
        urlSearch.set(
          'x-oss-process',
          `image/format,webp${this.resize ? `/resize,${this.resize}` : ''}`
        );
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
    },
    setupIntersectionObserver() {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          this.lazySrc = this.imageUrl
        }
      }, {
        rootMargin: '10px',
      });
      this.intersectionObserver.observe(this.$refs.imageRef);
    },
  }
};
</script>

<template>
  <img
    ref="imageRef"
    v-if="useLazy || (loaded && src)"
    class="c-question-img"
    :src="useLazy ? lazySrc : imageUrl"
    :width="imgWidth.includes('px') ? imgWidth : ''"
    :height="imgHeight.includes('px') ? imgHeight : ''"
    style="vertical-align: middle"
    :style="{
      width: imgWidth.includes('vw') ? imgWidth : '',
      height: imgHeight.includes('vw') ? imgHeight : ''
    }"
  />
</template>

<style scoped lang="scss"></style>
