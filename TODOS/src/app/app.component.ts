import { Component } from '@angular/core';
import { HomeService } from './services/home.service';
import { Todo } from './services/data.types/common.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public formData: {
    taskId:number,
    title: string,
    status: string,
    detail: string
  }={
    taskId: 0,
    title: " ",
    status: "0",
    detail: " "
  }
  public visible :boolean=false;    //添加窗口展示标准
  public operate :string;           //窗口标题：添加TODO还是编辑TODO
  public state : string = "all"    //筛选按钮状态标志
  public chooseAll:boolean;       //全选按钮当前的状态
  public keywords:string = "";
  public activeNum:number = 0;        //当前所有满足条件切为active的TODO数量
  public allNum:number = 0;             //是否存在TODO
  public completedState:boolean = false ;    //是否存在conpleted的TODO
  public tip:boolean = false;          //是否显示提示信息
  public todosShow =[];
  public temp;
  public todos;                   //当前todos数据

  //构造函数，服务器注入
  constructor( private homeServe: HomeService){
  }
  //组件初始化，一般设置一些初始值,特别需要注意的是：此函数只运行一次！
  ngOnInit(){
    this.getTodos();
  }
  //确认输入时候的状态
  inputSearch(e){
    this.getTodos();
  }

  //展示添加表单
  addForm(){
     this.visible = !this.visible;
     this.operate = '添加TODO';
     this.formData = {
      taskId: 0,
      title: " ",
      status: "0",
      detail: " "
    }
  }

 // 表单确定按钮
  handleOk() {
   if(this.formData.title == " "||this.formData.title == null){
     this.tip = true;
     return false;
   }else {
    this.tip = false;
    this.visible = !this.visible;
    this.homeServe.create(this.formData).then((res) => {
        this.getTodos();
    });
   }
  }
  // 表单取消按钮
  handleCancel() {
    this.visible = !this.visible;
    }
  // 获取全部数据
  queryAll(){
    this.state = "all";
    this.todosShow = this.todos;
  }
  // 获取active数据
   queryActive(){
    this.state = "active";
    this.todosShow = [];
    this.todos.forEach((todo:Todo) =>{
      if(todo.status == 0){
        this.todosShow.push(todo);
      }
    })
  }
  //获取completed数据
  queryCompleted(){
    this.state = "completed";
    this.todosShow = [];
    this.todos.forEach((todo:Todo) =>{
      if(todo.status == 1){
        this.todosShow.push(todo);
      }
    })
  }
  // 获取数据
  getTodos(){
    this.homeServe.getTodos(this.keywords,'all').subscribe(todos => {
      //todos初始化
      this.todos = todos;
      //获取初始化展示的数据
      switch(this.state){
        case 'all':
         this.queryAll();
          break;
        case 'active':
          this.queryActive();
          break;
        default:
          this.queryCompleted();
      }
      //获取toggle初始状态
      this.chooseAll = false;
      if(this.todosShow.length>0){
        this.chooseAll = this.todosShow.every((todo:Todo)=>{
          return todo.status == 1;
       })
      }
      //计算allNum
      this.allNum = this.todos.length;
      //计算ActiveNum
      this.activeNum =0;
      this.todos.forEach((todo:Todo) => {
        if(todo.status == 0){
          this.activeNum++;
        }
      });
      //获取completed状态,clearCompoleted按钮
      this.completedState = this.allNum == this.activeNum ? false:true;
    })
  }
  //获取某项的值
  getTodo(taskId:number){
    this.homeServe.getTodo(taskId).subscribe(todos => {
      //todos初始化
      this.todos = todos;
   })
  }
  //移除全部compoleted数据
   remove(){
    this.homeServe.remove(this.keywords).then((res)=>{
      this.getTodos();
    });

  }
  //删除某项数据
    delete(taskId){
    this.homeServe.delete(taskId)
                  .then((res)=>{ this.getTodos();});
  }
  //改变所有项的状态
  change(taskId,checked){
    this.homeServe.change(taskId,checked)
                  .then((res)=>{ this.getTodos();});
  }
  // 改变指定项状态
  changeAll(checked){
    this.homeServe.changeAll(this.keywords,checked)
                  .then((res)=>{ this.getTodos();});
  }
  // 查看详情
 showDetail(todo){
    this.visible = !this.visible;
    this.operate = '编辑TODO';
    this.formData = {
      taskId:todo.taskId,
      title:todo.title,
      status:todo.status+"",
      detail:todo.detail
    }
  }
}

