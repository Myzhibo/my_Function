<template>
  <img class="c-question-img" :src="originalUrl" :width="imgWidth ? imgWidth : 'auto'"
    :height="imgHeight ? imgHeight : 'auto'" style="vertical-align: middle" />
</template>

<script>
export default {
  name: 'QuestionImage',
  props: {
    src: {
      type: String,
      required: true,
    },
    useWebp: {
      type: Boolean,
      require: false,
      default: false,
    }
  },
  data () {
    return {
      originalUrl: this.src,
      imgHeight: '',
      imgWidth: '',
    };
  },
  async mounted () {
    /**
     * 1.拿到src，根据这个src获取naturalWidth和naturalHeight宽高
     * 2.拿到去除resize的路径
     * 3.重新设置宽高
     */
    const initImage = async () => {
      // 如果src内没有进行resize，直接return
      if (!/\/resize,(p|w)_(\d+)/.test(this.src)) {
        return;
      }
      const imgSize = await this.getImageSize(this.src);
      if (imgSize) {
        const reg = /\/resize,(p|w)_(\d+)/;
        this.originalUrl = this.src.replace(reg, '');
        this.imgHeight = imgSize.height;
        this.imgWidth = imgSize.width;
      }
    };

    await initImage();
    if (this.useWebp) {
      this.originalUrl = this.handleImgFormatConvert(this.originalUrl);
    }
  },
  methods: {
    getImageSize (url) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          const imgStyle = {
            width: `${img.naturalWidth}px`,
            height: `${img.naturalHeight}px`,
          };
          resolve(imgStyle);
        };
        img.onerror = () => {
          resolve(null);
        };
      });
    },
    handleImgFormatConvert (url) {
      const newUrl = new URL(url);
      // 检查主机名是否包含阿里云 OSS
      if (!(newUrl.hostname.includes('oss') && newUrl.hostname.includes('aliyuncs.com'))) {
        return url;
      }
      // 获取查询参数
      const urlSearch = new URLSearchParams(newUrl.search);
      // 如果有该key
      if (urlSearch.has('x-oss-process')) {
        if (!urlSearch.get('x-oss-process').includes('format,webp')) {
          // 新增
          urlSearch.set('x-oss-process', `${urlSearch.get('x-oss-process')}/format,webp`);
        }
      }
      // 配置key
      else {
        urlSearch.set('x-oss-process', 'image/format,webp');
      }
      // 格式化
      newUrl.search = urlSearch.toString();
      return newUrl.toString();
    }
  },
};
</script>

<style scoped lang="scss"></style>
