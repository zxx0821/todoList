webpackJsonp([1],{"1TLE":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var o=s("VU/8")({name:"App"},i,!1,function(t){s("1TLE")},null,null).exports,n=s("/ocq"),c=s("mtWM"),d=s.n(c);s("mw3O");const u="http://148.70.150.147:8080";var l={name:"todo",data:function(){return{todoLists:[],isActive:!1,dataStatus:["All","Active","Completed"],dataStatusIndex:0,whichShow:!0,defaultShow:!0,isCheckedAll:!1,defaultStatus:!1}},computed:{taskNum:function(){return this.todoLists.filter(function(t){return!1===t.isChecked}).length}},methods:{getall:function(){var t=this;(t=>d.a.get(`${u}/api/all`,{params:t}))().then(function(e){200===e.status?t.todoLists=e.data.todos:alert("信息获取失败，请查看服务器是否开启")})},toChecked:function(t,e){var s={id:t.id||t._id,message:t.message,isChecked:!t.isChecked};e||(s.isChecked=t.isChecked),(t=>d.a.post(`${u}/api/update`,t).then(t=>t.data))(s).then(function(t){0===t.code&&console.log(t.msg)})},selectAllTodos:function(){var t=this;t.todoLists.filter(function(t){return!1===t.isChecked}).length>0?t.defaultStatus=!0:t.defaultStatus=!1,(t=>d.a.post(`${u}/api/updateMany`,t).then(t=>t.data))({isChecked:t.defaultStatus}).then(function(e){0===e.code&&t.getall(),console.log("数据库已更新")})},addTodo:function(t){var e=this,s={message:t.value,isChecked:!1,status:!1};t.value="",(t=>d.a.post(`${u}/api/add`,t).then(t=>t.data))(s).then(function(t){var s=t.code;0===s?(e.todoLists.push(t.todos),console.log("添加成功")):4===s?console.log("任务已存在"):console.log("任务添加失败")})},toEdit:function(t){t.status=!0},clearTodos:function(){var t=this,e="";t.todoLists.forEach(function(t){var s=t.id||t._id;t.isChecked&&(e+=s+",")}),(t=>d.a.post(`${u}/api/deletemany`,t))({ids:e}).then(function(e){t.getall()})},unEdit:function(t){t.status=!1,this.toChecked(t,!1)},deleteTodo:function(t){var e=this;(t=>d.a.post(`${u}/api/deletes`,t).then(t=>t.data))({id:t.id||t._id}).then(function(t){0===t.code&&(t.todos.id?e.todoLists.splice(e.todoLists.findIndex(function(e){return e.id===t.todos.id}),1):e.todoLists.splice(e.todoLists.findIndex(function(e){return e._id===t.todos._id}),1))})},switchStatus:function(t){this.dataStatusIndex=t,"Active"===this.dataStatus[t]?(this.defaultShow=!1,this.whichShow=!1):"Completed"===this.dataStatus[t]?(this.defaultShow=!1,this.whichShow=!0):"All"===this.dataStatus[t]&&(this.defaultShow=!0)}},directives:{"todo-focus":function(t,e){e.value&&t.focus()}},created:function(){this.getall()}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"main"}},[s("header",{staticClass:"g-header"},[s("h1",[t._v("todos")]),t._v(" "),s("div",{staticClass:"f-add"},[s("span",{directives:[{name:"show",rawName:"v-show",value:t.todoLists.length>0,expression:"todoLists.length>0"}],staticClass:"u-icon-down",on:{click:t.selectAllTodos}}),t._v(" "),s("input",{ref:"currentInput",staticClass:"f-add-task",attrs:{type:"text",placeholder:"What needs to be done?",autofocus:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.addTodo(e.target)}}})])]),t._v(" "),s("section",{staticClass:"g-content"},[s("ul",{staticClass:"g-tasklist"},t._l(t.todoLists,function(e,a){return s("li",{directives:[{name:"show",rawName:"v-show",value:t.defaultShow||(t.whichShow?e.isChecked:!e.isChecked),expression:"defaultShow || (whichShow?item.isChecked:!item.isChecked)"}],staticClass:"m-tasks",on:{mouseover:function(e){t.isActive=!0},mouseleave:function(e){t.isActive=!1}}},[s("input",{directives:[{name:"model",rawName:"v-model",value:e.isChecked,expression:"item.isChecked"}],staticClass:"u-check",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(e.isChecked)?t._i(e.isChecked,null)>-1:e.isChecked},on:{click:function(s){return t.toChecked(e,!0)},change:function(s){var a=e.isChecked,i=s.target,o=!!i.checked;if(Array.isArray(a)){var n=t._i(a,null);i.checked?n<0&&t.$set(e,"isChecked",a.concat([null])):n>-1&&t.$set(e,"isChecked",a.slice(0,n).concat(a.slice(n+1)))}else t.$set(e,"isChecked",o)}}}),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:!e.status,expression:"!item.status"}],staticClass:"u-message",class:{f_delete:e.isChecked},on:{dblclick:function(s){return t.toEdit(e)}}},[t._v("\n          "+t._s(e.message)+"\n        ")]),t._v(" "),s("input",{directives:[{name:"model",rawName:"v-model",value:e.message,expression:"item.message"},{name:"show",rawName:"v-show",value:e.status,expression:"item.status"},{name:"todo-focus",rawName:"v-todo-focus",value:e.message,expression:"item.message"}],staticClass:"u-message u-update",attrs:{type:"text"},domProps:{value:e.message},on:{blur:function(s){return t.unEdit(e)},input:function(s){s.target.composing||t.$set(e,"message",s.target.value)}}}),t._v(" "),s("span",{staticClass:"u-close-icon u-close",attrs:{title:"删除"},on:{click:function(s){return t.deleteTodo(e)}}})])}),0),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:t.todoLists.length>0,expression:"todoLists.length>0"}],staticClass:"g-data"},[s("div",{staticClass:"u-task-times"},[t._v(t._s(t.taskNum)+" items left")]),t._v(" "),t._l(t.dataStatus,function(e,a){return s("div",{key:a,staticClass:"u-taskstatus",class:{f_active:a===t.dataStatusIndex},on:{click:function(e){return t.switchStatus(a)}}},[s("a",{attrs:{href:"#"}},[t._v(t._s(e))])])}),t._v(" "),s("div",{staticClass:"u-task-clearstatus",on:{click:t.clearTodos}},[s("a",{attrs:{href:"#"}},[t._v("clear completed")])])],2)])])},staticRenderFns:[]};var h=s("VU/8")(l,r,!1,function(t){s("kyeX")},"data-v-4ec158d0",null).exports;a.a.use(n.a);var v=new n.a({routes:[{path:"/",name:"todo",component:h}]});a.a.config.productionTip=!1,new a.a({el:"#app",router:v,components:{App:o},template:"<App/>"})},kyeX:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.7d7613256ce249d8e721.js.map