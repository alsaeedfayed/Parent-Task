import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ModalComponent } from '../../stand-alone-components/modal/modal.component';
import { SingleuserComponent } from './components/singleuser/singleuser.component';
import { PopUpComponent } from '../../stand-alone-components/pop-up/pop-up.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DashboardHeaderComponent } from './components/dashboard-header/dashboard-header.component';
import { DashboardUserRowComponent } from './components/dashboard-user-row/dashboard-user-row.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    DashboardComponent,
    SingleuserComponent,
    DashboardHeaderComponent,
    DashboardUserRowComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzIconModule,
    NzModalModule,
    ModalComponent,
    PopUpComponent,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    InfiniteScrollModule
  ]
})
export class DashboardModule { }
