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
      taskId: Date.now(),
      title: " ",
      status: "0",
      detail: " "
  };
  public visible :boolean=false;    //添加窗口展示标准
  public operate :string;           //窗口标题：添加TODO还是编辑TODO
  public state : string = "all"    //筛选按钮状态标志
  public chooseAll:boolean;       //全选按钮当前的状态
  public keywords:string = "";
  public activeNum:number = 0;        //当前所有满足条件切为active的TODO数量
  public allNum:number = 0;             //是否存在TODO
  public completedState:boolean = false ;    //是否存在conpleted的TODO
  public temp
  public todos                   //当前todos数据

  //构造函数，服务器注入
  constructor( private homeServe: HomeService){
  }
  //组件初始化，一般设置一些初始值,特别需要注意的是：此函数只运行一次！
  ngOnInit(){
    this.getTodos();
  }
  //确认输入时候的状态
  inputSearch(e){
    this.homeServe.getTodos(this.keywords,"all").subscribe((res)=>{
    this.temp = res;
    this.allNum = this.temp.length;
    })
    this.getTodos();
  }

  //展示添加表单
  addForm(){
     this.visible = !this.visible;
     this.operate = '添加TODO';
     this.formData = {
      taskId: Date.now(),
      title: " ",
      status: "0",
      detail: " "
    }
  }

 // 表单确定按钮
  handleOk() {
   this.visible = !this.visible;
    this.homeServe.create(this.formData).then((res) => {
       this.getTodos();
   });
   if(this.formData.title.indexOf(this.keywords)!=-1 && this.state != 'all'){
    this.allNum++;
   }

  }
  // 表单取消按钮
  handleCancel() {
    this.visible = !this.visible;
    }
  // 获取全部数据
  queryAll(){
    this.state = "all";
    this.getTodos();
  }
  // 获取active数据
   queryActive(){
    this.state = "active";
    this.getTodos();
  }
  // 获取completed数据
  queryCompleted(){
    this.state = "completed";
    this.getTodos();
  }
  // 获取数据
  getTodos(){
  this.homeServe.getTodos(this.keywords,this.state).subscribe(todos => {
     //todos初始化
     this.todos = todos;

    //获取toggle状态
    this.chooseAll = false;
    if(this.todos.length>0){
      this.chooseAll =this.todos.every((todo:Todo)=>{
        return todo.status == 1;
     })
    }
      //计算allNum
     if(this.state == "all"){
      this.allNum = this.todos.length ;
    }

    //获取completed状态
    this.completedState =this.todos.some((todo:Todo)=>{
      return todo.status == 1;
   })
    //activeNum的计算
    if(this.state == "completed"){
        this.activeNum = this.allNum - this.todos.length;
    }else{
       this.activeNum = 0;
       this.todos.forEach((todo:Todo)=>{
        if( todo.status == 0){
          this.activeNum++;
         }
       })
     }
      })
  }

  //获取某项的值
  getTodo(taskId:number){
    this.homeServe.getTodo(taskId).subscribe(todos => {
      //todos初始化
      this.todos = todos;
   })
  }
  //移除全部数据
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

