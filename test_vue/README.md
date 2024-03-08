# -包

## -node

- nvm use 14

## -sass

- 1 npm i sass -D
  2 npm i -D sass-loader@8.x
  3 npm i node-sass@4.14.1

## -elementUI

- npm i element-ui -S

## -vuex

-  npm i vuex@3
-  import store from './store'                     //main.js 引入vuex配置index
-  main.js 挂载vuex store

## -Tree 组件安装 右键菜单 插件

- yarn add vue-contextmenujs

### 在 main.js 文件中使用

```js
import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)
```

```js
// 在组件中调用显示菜单
// this.$contextmenu(options:MenuOptions);
// 鼠标点击或滚轮自动销毁, 也可手动销毁
// this.$contextmenu.destroy();

// 去除浏览器默认菜单
```

## -localforage

- npm install localforage
- main.js 中注册
  - import localforage from 'localforage';
  - localforage.config({ name: 'myDB' });
  - Vue.prototype.$localForage = localforage;

## 虚拟滚动
- npm i vue-virtual-scroller
## 虚拟滚动2
- npm i vue-infinite-scroll

## 拖拽组件
- yarn add vuedraggable

# webpack
## chunk:  npm install --save-dev webpack-bundle-analyzer
在vue.config.js文件中配置。 analyzerMode 可以设置为 'server' 或 'static'。设置为 'server' 将在构建完成后启动一个 HTTP 服务器，并在默认浏览器中打开可视化的树状图。
```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  
module.exports = {  
  configureWebpack: {  
    plugins: [  
      new BundleAnalyzerPlugin({  
        // 可以设置为 `server` 或 `static`  
        analyzerMode: 'server',  
        // 其他的配置选项...  
      })  
    ]  
  }  
};
```
配置好插件后，运行构建命令 , 最后会弹出一个网页可视化所有的chunk
```js
npm run build
```

※※ 最后，当你不再需要 webpack-bundle-analyzer 时，记得从 vue.config.js 中移除相关的配置，以避免不必要的构建时间开销。

# 笔记

1. 关于 App.vue 、'router-view'、router 之间的关系

- App.vue 在模版中定义 router-view 用来指向当前组件下的路由展示区
- router/index.js 中 component: Layout 主路由指向的组件 就是 App.vue 中 router-view 所指向的画面
- 到了 Layout/index.vue 中模版仍然定义了 router-view ， 那他就指向了路由中 component: Layout 所重定向的 path 所指向的 component: HelloWorld
