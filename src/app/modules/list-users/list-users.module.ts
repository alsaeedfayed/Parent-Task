import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListUsersRoutingModule } from './list-users-routing.module';
import { ListUsersComponent } from './components/list-users/list-users.component';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ModalComponent } from '../../stand-alone-components/modal/modal.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserFormComponent } from './components/user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [
    ListUsersComponent,
    UserFormComponent,

  ],
  imports: [
    CommonModule,
    ListUsersRoutingModule,
    NzCardModule,
    NzIconModule,
    NzButtonModule,
    ModalComponent,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzModalModule

  ]
})
export class ListUsersModule { }
