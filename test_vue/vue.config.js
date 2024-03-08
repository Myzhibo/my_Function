const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  

module.exports = {
  lintOnSave: false, // 关闭自动lint错误提示


  // css: {           // 全局导入sass文件
  //   loaderOptions: {
  //     sass: {
  //       prependData: `@import "./src/styles/utils.scss";`,
  //     },
  //   },
  // }, 


  configureWebpack: {
    plugins: [
      // // 分析chunk , 当不需要时，记得从 vue.config.js 中移除相关的配置，以避免不必要的构建时间开销。
      // new BundleAnalyzerPlugin({ 
      //   // 可以设置为 `server` 或 `static`
      //   analyzerMode: 'server',
      //   // 其他的配置选项...
      // })
    ]
  }
}
