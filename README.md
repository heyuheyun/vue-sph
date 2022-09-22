# vue网上电商
## 简介
初学vue时所写，功能实现步骤与教学模板一致，但大部分功能采用自己的实现方式。
**功能**：登录、注册、三级联动菜单、商品搜索、面包屑、商品属性选择、商品详情、分页、详情图放大镜、加入购物车、购物车页面、结算页面、订单页面、支付页面、我的订单
### 技术
**vue2 + vuex + vue-router + mock + less + element-ui（仅支付页面）**


## 项目结构
```
src
├─api		//接口
├─assets		//静态资源
├─components		//公共组件
│  ├─Carousel
│  ├─Footer
│  ├─Header
│  └─TypeNav
├─mock		//mock数据
├─pages		//路由页面
│  ├─AddCartSuccess
│  ├─Center
│  ├─Detail
│  ├─Home
│  ├─Login
│  ├─Pay
│  ├─PaySuccess
│  ├─Register
│  ├─Search
│  ├─ShopCart
│  └─Trade
├─router		//路由
├─store		//vuex
└─utils		//公共函数
```
## 启动
```
## Project setup
npm install

### Compiles and hot-reloads for development
npm run serve

### Compiles and minifies for production
npm run build

### Lints and fixes files
npm run lint
```
