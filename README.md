# todoList

使用vue, node+mongoos开发的一个简单的**todo**应用，线上访问你可以[点此](http://148.70.150.147:8080/#/)访问。
# 项目简介
  `yijihua_todo`为前端项目，`server`为服务端项目
# #前端
 1. 使用**vue-cli**`2.9.6`,前端主要有`vue+axios`构建
 2. 实现的功能
     (1) 单条添加todo
     (2) 单条删除todo
     (3) 双击编辑todo
     (4) 单条todo已完成相应样式状态改变
     (5) 全部todo是已完成相应样式状态改变
     (6) 清除全部已完成todos
     (7) 待办todos数量显示
     (8) 所有todos，已完成todos，未完成todos筛选
 3. 开发环境中的数据来源于[NEI 接口管理平台](https://nei.netease.com/)。
      线上环境中数据为[服务端数据库](http://148.70.150.147:8080)。


      ```javascript
       const baseUrl = process.env.NODE_ENV === "development"
              ? "https://nei.netease.com/api/apimock/f3e5d93d5eaceda5a624378374ad5cd7"
              : "http://148.70.150.147:8080";
       ....
       ```

# #后端
1.后台由`express+mongoose`构建。
2.路由
   ```javascript
        module.exports = function(app) {
            app.get('/api/all', TodoController.getAll);
            app.post('/api/add', TodoController.newTodo);
            app.post('/api/deletes', TodoController.deleteOne);
            app.post('/api/deletemany', TodoController.deleteAllCompleted);
            app.post('/api/update', TodoController.updateOne);
            app.post('/api/updateMany', TodoController.updateMany);
                ....
   ```
# 项目启动
```bash
$ npm install
// or
$ yarn install
```
## 开发环境

```bash
$ npm run dev
```
这个时候所有请求就会发送到**NEI**提供的**mock**数据服务接口上，然后打开浏览器输入http://localhost:8080/就可以访问页面了。
