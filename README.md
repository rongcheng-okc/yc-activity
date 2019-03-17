
# 单页报名活动页

### 基于 vue 2.6.9 + webpack 4.26.4，由于业务较少，所以没有使用 vue-router，vuex 以及其他 UI 框架
----

### 本地启动

1. 项目根目录下执行 npm install

2. development 模式：
 根目录下执行 npm run dev，然后访问 
 http://localhost:8080/?date=20190319&activityId=1299&userId=15757172660

3. production 模式：
 根目录下执行 npm run build, 接着执行 node app.js
 http://localhost:3000/?date=20190319&activityId=1299&userId=15757172660
 本次项目开发使用 node 版本为 v10.15.0
 
---

### url 参数说明

1. 如果需要验证活动是否过期这一功能，需在链接里加上 date 这一参数，格式为 yyyymmdd, 定义 20190321 及以后为活动过期
测试 url：http://localhost:3000/?date=20190321&userId=&activityId=
2. userId 为用户 Id 对应的值为表单里提交的手机号
3. activity 为活动 Id，可取值有三个 1299, 2299, 3399
4.验证已报名用户 userId：15757172557， activityId：1299
测试url：url：http://localhost:3000/?date=&userId=15757172557&activityId=1299
---

### 表单字段验证
1. 姓名只能包含汉字或英文大小写字，长度为 {1, 20}
2. 手机号须符合常规