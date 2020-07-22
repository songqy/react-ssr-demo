This project is a react ssr demo

## 可用命令

### `npm start`

开发模式，不涉及后端渲染，浏览器访问地址[http://localhost:3010](http://localhost:3010)

### `npm run build`

打包前端的代码

### `npm run build:server`

编译后端的代码，编译完成后 node ./serverbuild/server.js 运行

### `npm run build:all`

同时打包前后端代码


## 项目简介

* 实现了react的ssr的同构应用
* 采用了create-react-app和customize-cra做前端的构建工具
* 实现了antd按需加载引入
* 采用了renderToNodeStream渲染，提高了性能
* 支持less和css modules，不过因为customize-cra的v1.0.0版本还不完善，生成的classname格式目前只能是`[local]--[hash:base64:5]`
* 支持redux，保证了数据前后端的一致性
* 支持后端异步数据加载，在返回页面之前初始化数据，然后注入到redux中