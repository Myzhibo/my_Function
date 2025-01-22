import * as pdfjsLib from 'pdfjs-dist';

  // 从 ossLink 获取文件内容物理大小
  async getPagePhysicalSize(ossLink: string) {
    try {
      const loadingTask = pdfjsLib.getDocument(ossLink);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // 获取第一页
      // 使用默认缩放比例（1.0）和默认用户单元（1点=1/72英寸）获取视口
      const viewport = page.getViewport({ scale: 1.0 });
      // PDF的默认用户单元 1px = 0.3528mm
      const pageWidthPoints = viewport.width * 0.3528;
      const pageHeightPoints = viewport.height * 0.3528;
      // 返回物理页面尺寸 (mm)
      return { pageWidthPoints, pageHeightPoints };
    } catch (error) {
      console.error('Error loading PDF:', error);
      return null;
    }
  }