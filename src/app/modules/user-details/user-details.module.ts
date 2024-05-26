import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDetailsRoutingModule } from './user-details-routing.module';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { NzCardModule } from 'ng-zorro-antd/card';


@NgModule({
  declarations: [
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UserDetailsRoutingModule,
    NzCardModule
  ]
})
export class UserDetailsModule { }
