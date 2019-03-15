<template>
  <div id="main">
    <!--header 头部-->
    <header class="g-header">
      <h1>todos</h1>
      <div class="f-add">
        <span class="u-icon-down" v-show="todoLists.length>0" @click="selectAllTodos"></span>
        <input type="text" class="f-add-task"
               placeholder="What needs to be done?"
               autofocus
               @keyup.enter="addTodo($event.target)"
               ref="currentInput"/>
      </div>
    </header>
    <!--/header 头部-->
    <!--content 内容区-->
    <section class="g-content">
      <ul class="g-tasklist">
        <li class="m-tasks" v-for="(item,index) in todoLists"
            @mouseover="isActive=true"
            @mouseleave="isActive=false"
            v-show="defaultShow || (whichShow?item.isChecked:!item.isChecked)"
        >
          <input type="checkbox" class="u-check" v-model="item.isChecked"
                 @click="toChecked(item,true)"
          >
          <div class="u-message"
               @dblclick="toEdit(item)"
               v-show="!item.status" :class="{f_delete:item.isChecked}">
            {{item.message}}
          </div>
          <input type="text" class="u-message u-update" v-model="item.message"
                 v-show="item.status"
                 v-todo-focus="item.message"
                 @blur="unEdit(item)">
          <span class="u-close-icon u-close"
                @click="deleteTodo(item)"
                title="删除"
          ></span>
        </li>
      </ul>
      <div class="g-data" v-show="todoLists.length>0">
        <div class="u-task-times">{{taskNum}}&nbspitems left</div>
        <div class="u-taskstatus" :class="{f_active:index === dataStatusIndex}" v-for="(item,index) in dataStatus" @click="switchStatus(index)" :key="index">
          <a href="#">{{item}}</a>
        </div>
        <div class="u-task-clearstatus" @click="clearTodos">
          <a href="#">clear completed</a>
        </div>
      </div>
    </section>
    <!--/content 内容区-->
  </div>
</template>

<script>
  import axios from 'axios'
  import Qs from 'qs'
  import {getAllTask, addTask, deleteTask, deleteCompletedTask, updateTask, updateManyTask} from '../../api/api'
export default {
  name: 'todo',
  data () {
    return {
      todoLists: [],
      isActive: false,
      dataStatus: ["All", "Active", "Completed"],
      dataStatusIndex: 0,
      whichShow: true,
      defaultShow: true,
      isCheckedAll: false,
      defaultStatus: false
    }
  },
  computed: {
    taskNum() {
      return this.todoLists.filter(item => item.isChecked === false).length
    }
  },
  methods: {
    getall(){
      let _this = this
      getAllTask().then(function (res) {
        if(res.status === 200){
          _this.todoLists = res.data.todos;
        }else{
          alert('信息获取失败，请查看服务器是否开启')
        }
      })
    },
    //设置todo的状态
    toChecked(item,state){
      let params = {
        id: item.id||item._id,
        message:item.message,
        isChecked:!item.isChecked
      }
      if(!state){
        params.isChecked = item.isChecked
      }
      updateTask(params).then(data=>{
        if(data.code===0){
          console.log(data.msg)
        }
      })
    },
    /*全选功能*/
    selectAllTodos () {
      let _this = this
      if(_this.todoLists.filter((temp)=>temp.isChecked===false).length>0){
          _this.defaultStatus = true
      }else{
        _this.defaultStatus = false
      }
      updateManyTask({isChecked:_this.defaultStatus}).then(data=>{
          if(data.code===0){
              _this.getall()
          }
          console.log('数据库已更新')
      })
    },
    /**
     *添加任务
     * @param target
     */
    addTodo(target){
      let _this = this;
      let createMessage = {
        message: target.value,
        isChecked:false,
        status: false
      };
      target.value='';
      addTask(createMessage).then(data => {
        let code = data.code;
        if(code === 0){
          _this.todoLists.push(data.todos)
          console.log('添加成功')
        }else if(code===4){
          console.log('任务已存在')
        }else{
          console.log('任务添加失败')
        }
      })
    },
    /**
     *编辑修改任务
     * @param item
     */
    toEdit(item){
      item.status=true
    },
    /**
     *批量删除已完成任务
     * @param item
     */
    clearTodos(){
      let _this = this
      let idlist = ''
      _this.todoLists.forEach(item=>{
        let id = item.id||item._id
        if(item.isChecked){
          idlist += id + ",";
        }
      })
      deleteCompletedTask({ids:idlist}).then(data=>{
        _this.getall()
      })
    },
    /**
     *修改任务
     * @param item
     */
    unEdit(item){
      item.status = false
      this.toChecked(item,false)
    },
    /**
     *删除单个任务
     * @param item
     */
    deleteTodo(item){
      let _this = this;
      let deleteid = item.id||item._id
      deleteTask({id:deleteid}).then(data=>{
        if(data.code === 0){
            if(data.todos.id){
              _this.todoLists.splice(_this.todoLists.findIndex(temp => temp.id === data.todos.id), 1);
            }else{
              _this.todoLists.splice(_this.todoLists.findIndex(temp => temp._id === data.todos._id), 1);
            }
        }
      })
    },
    /**
     *任务状态切换
     * @param index
     */
    switchStatus(index){
      this.dataStatusIndex = index
      if (this.dataStatus[index] === "Active") {
        this.defaultShow = false
        this.whichShow = false
      } else if (this.dataStatus[index] === "Completed") {
        this.defaultShow = false
        this.whichShow = true
      } else if (this.dataStatus[index] === "All") {
        this.defaultShow = true
      }
    }
  },
  directives: { //自定义focus指令
    "todo-focus": function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  },
  created() {
      this.getall()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #main{
    padding:.1rem 0;
    margin:0 auto;
    width:80%;
    height:100%;
    text-align: center;
  }
  #main .g-header{
    width:100%;
    text-align:center;
    color: rgba(175, 47, 47, 0.15);
    text-rendering: optimizeLegibility;
  }
  #main .g-header h1{
    font-weight: 200;
    font-size: 1.5rem;
  }
  #main .g-header .f-add{
    position:relative;
  }
  .g-header .f-add .u-icon-down{
    width:.5rem;
    height:.5rem;
    background: url('../assets/icon-down-eee.png') center center no-repeat;
    position: absolute;
    top:.35rem;
    left:.48rem;
    cursor: pointer;
  }
  .g-header .f-add .f-add-task{
    padding: .3rem .3rem .3rem 1.2rem;
    border: none;
    box-sizing: border-box;
    background: #fff;
    box-shadow: inset 0 -2px 1px rgba(222,222,222,0.03);
    width: 100%;
    font-size: .5rem;
    color: #000;
    font-weight: inherit;
  }

  /*  content */
  #main .g-content{
    position: relative;
    margin: 0 auto;
    width: 100%;
    box-shadow: 0 3px 3px 2px rgba(0, 0, 0, 0.25);
  }
  #main .g-content .g-tasklist{
    position: relative;
    z-index: 6;
  }
  .g-content .g-tasklist .m-tasks{
    display: flex;
    flex-direction: row;
    font-size:.4rem;
    padding:.1rem;
    background: #fff;
    align-items: center;
  }
  .m-tasks:hover .u-close{
    display: block;
  }
  .u-check{
    width:.5rem;
    height:.5rem;
    margin-left:.21rem;
  }
  .u-message{
    flex:1;
    text-align: left;
    margin-left: .34rem;
    font-size: .43rem;
    padding: .1rem 0;
    word-break: break-all;
    display: block;
    line-height: 1.2;
    transition: color 0.4s;
  }
  .u-update{
    position: relative;
    z-index:1;
  }
  .u-close{
    position: absolute;
    right: .2rem;
    cursor: pointer;
    width: .5rem;
    height: .5rem;
    display: none;
  }
  .u-close-icon{
    background:url('../assets/delete.png') no-repeat;
    background-size: 100%;
  }
  .f_show{
    display: block;
  }
  .f_show:hover{
    color: rgb(255, 0, 0);
    font-weight: 700;
  }
  .f_hide{
    display: none;
  }
  .f_delete{
    text-decoration: line-through;
    color: #bbb;
  }
  ::-moz-placeholder {
    color: rgb(221, 218, 218);
  }

  ::-webkit-input-placeholder {
    color: rgb(221, 218, 218);
  }

  :-ms-input-placeholder {
    color: rgb(221, 218, 218);
  }

  .g-data{
    display: flex;
    justify-content: space-between;
    padding: .1rem;
    font-size: .3rem;
    font-weight: 300;
    color: rgb(145, 145, 145);
  }
  .g-data .u-task-times{
    width:1.8rem;
    margin-right:1.3rem;
  }
  .u-task-clearstatus{
    width:2.3rem;
  }
  .u-task-clearstatus a:hover{
    text-decoration-line: underline;
  }
  .u-taskstatus a{
    display: inline-block;
    border-radius: 2px;
    padding: 1px 4px;
    margin: 0 2px;
  }
  .u-taskstatus a:hover{
    text-decoration-line: underline;
  }
  .f_active {
    border: 1px solid rgba(175, 47, 47, 0.15);
  }
</style>
