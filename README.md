# turbo
使用说明请见下述

## 安装
### 准本
1. 首先，你需要一些全局软件，如git, nodejs, npm, gulp, compass等等
在 OS X 上，我们推荐使用 [homebrew]

2. 安装compass等
`brew install compass`

3. 对于iojs和npm我们建议从 [iojs官网][iojs] 或[国内镜像][iojs-taobao]下载安装包安装。
    - [taobao镜像](https://npm.taobao.org/), 即可解决npm可能存在跨域

### 安装
1. 克隆本仓库代码
`git clone https://github.com/zufangzi/turbo.git`
2. 然后安装npm
`cd turbo; npm install`

### 启动和本地开发
#### 启动服务
1. 目前初稿状态，比较简单，安装supervisor，<br >
`npm install --global supervisor`<br >
2. 然后启动服务<br >
`npm start`
即使改动后端代码，也不需重新启动服务，supervisor 会为你自动重启服务

#### 本地开发
1. `gulp live`, 监听文件变化，也实现动态刷新浏览器功能
    - 请先安装livereload谷歌插件，[livereload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
    - 无论是scss还是hbs变化，服务会动态编译增量代码, 并且自动刷新浏览器
2. `npm run mock`, 监听文件变化，也实现动态刷新浏览器功能
    - 使用`json-server`, 起了APIs的服务，直接访问`http://localhost:3000`, 即可看到访问的APIs

## 改进
尚有很多需要改进的地方

## ChangeLog

----

##### v0.0.7
- 增加node-inspector, 作为nodejs的调试器

##### v0.0.6
- 热插拔，gulp-livereload，支持开发时，文件变化即更新刷新当前页面
- 动态监听css文件变化，增量编译变化文件
- 增加ChangeLog，增加README

##### v0.0.5
- 在`Server`层增加`Config`
- 基于`约定大于配置，配置大于编码`，可在Config里面定义我们需要的特殊数据

##### v0.0.4
- 目录分层，从原来Express目录，分成`Client端`以及`Server`端
- 在`Server`端增加`route`,`views`,`helpers`,`middlewares`目录
- **route** 负责路由
- **views** 负责模板渲染
- **middleware** 负责处理中间件
- 目前已经增加处理`Error`的中间件

##### v0.03
- 增加gulp管理工具，集成自动化任务
- css压缩，js检查等
- 调研后，加入handlebars，作为node层的渲染模板

##### v0.02
- 目录分层，路由导向至route，在route/index进行路由分层
- 引入compass-sass，增强处理sprite和css编译

##### v0.0.1
- 使用Express生成基础代码
