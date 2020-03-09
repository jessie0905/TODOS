// 用于管理公共共享的组件、模块等
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    NzIconModule
  ],
  // 由于共享的原因，我们一般会将模块导出出去以便于别的模块进行引用。
  exports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule,
    NzIconModule
  ]
})
export class ShareModule { }
