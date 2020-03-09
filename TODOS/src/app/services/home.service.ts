import { Injectable, Inject} from '@angular/core';
import { ServicesModule, API_CONFIG } from './services.module';
import { HttpClient } from '@angular/common/http';
import { Todo } from './data.types/common.types';
import {map} from 'rxjs/internal/operators';

@Injectable({
  providedIn: ServicesModule
})
export class HomeService {
  constructor(
    private http: HttpClient,
  ){}
  // 1、获取整组数据
getTodos(keywords:string,state:string) {
    return this.http.get('api',
      {params:{
        keywords,
        state
      }
   }).pipe(map((res:{todos:Todo[]})=> res));
  }
  // 2、获取指定数据
   getTodo(taskId) {
    return this.http.get('api',
      {params:{
        taskId
      }
   }).pipe(map((res:{todos:Todo[]})=> res));
  }

  // 3、全部移除
  remove(keywords:string){
    return this.http.get('api/remove',{params:{
      keywords
    }}).toPromise()
  }

  // 4、 移除指定项
   delete(taskId) {
    return this.http.get('api/remove',{params:{
      taskId
    }}).toPromise();

  }
  // 5、改变所有项状态
   changeAll(keywords:string,checked){
    return this.http.get('api/changeAll',{
      params:{
        keywords,
        checked,
      }
    }).toPromise()
  }
  // 6、改变指定项状态
  change(taskId,checked) {
    return this.http.get('api/change',{
      params:{
        taskId,
        checked
      }
    }).toPromise();
  }
  //7、添加或更改
create(formData){
     return this.http.post('/api',formData).toPromise();
  }
}
