import { getDocument } from 'pdfjs-dist/webpack.js' // 注意这里的引入方式

async function fetchFileFromUrl (url: string) {
  const response = await fetch(url)
  const blob = await response.blob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function (evt) {
      resolve(evt?.target?.result)
    }

    reader.onerror = function (err) {
      reject(err)
    }

    reader.readAsDataURL(blob)
  })
}

// https://mozilla.github.io/pdf.js/api/
const pdfViewer = async (urlPath: string, containerElement: HTMLCanvasElement, cb = (pdf: any) => {}) => {
  // 读取pdf
  const pdfUrl = `https://hexin-worksheet.oss-cn-shanghai.aliyuncs.com/${urlPath}`
  // const file = await fetchFileFromUrl(pdfUrl);
  const pdf = await getDocument({
    url: pdfUrl,
    cMapUrl: 'https://cdn.bootcdn.net/ajax/libs/pdfjs-dist/2.8.335/cmaps/',
    cMapPacked: true,
    enableHWA: true,
    withCredentials: false
  }).promise
  const pageCount = pdf.numPages
  // 生成canvas
  await Promise.allSettled(Array.from({ length: pageCount }, (_, i) => i + 1).map(async (i) => {
    const canvas = document.createElement('canvas')
    canvas.style.display = 'block'
    containerElement.appendChild(canvas)
    const page = await pdf.getPage(i)
    const viewport = page.getViewport({ scale: 1.2 })
    const context = canvas.getContext('2d')
    canvas.width = viewport.width
    canvas.style.width = viewport.width + 'px'
    canvas.height = viewport.height
    canvas.style.height = viewport.height + 'px'
    return page.render({
      canvasContext: context,
      viewport: viewport
    }).promise
  }))
  cb(pdf)
}

export default pdfViewer
