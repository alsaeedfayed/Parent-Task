import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUsersRoutingModule } from './list-users-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NzCardModule } from 'ng-zorro-antd/card';


@NgModule({
  declarations: [
    ListUsersComponent
  ],
  imports: [
    CommonModule,
    ListUsersRoutingModule,
    NzCardModule
  ]
})
export class ListUsersModule { }
