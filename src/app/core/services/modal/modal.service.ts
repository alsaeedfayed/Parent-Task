import { Injectable } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { BehaviorSubject } from 'rxjs';

export type drawerProps = {
  visible: boolean,
  placement: NzDrawerPlacement,
  title: string

}

export type popUpProps = {
  visible: boolean,
  title?: string
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  drawerListener$ = new BehaviorSubject<drawerProps>({ visible: false, placement: 'right', title: '' });
  popUpListner$ = new BehaviorSubject<popUpProps>({ visible: false, title: '' });

  constructor() { }


  //----------------- DRAWWER ---------------------
  openDrawer(placement: NzDrawerPlacement, title: string): void {
    this.drawerListener$.next({ visible: true, placement, title });

  }

  closeDrawer(placement: NzDrawerPlacement, title: string): void {
    this.drawerListener$.next({ visible: false, placement, title });
  }


  //---------------- POP-UP -------------------------
  openPopUp(title?: string): void {
    this.popUpListner$.next({ visible: true, title });

  }

  closePopUp(title?: string): void {
    this.popUpListner$.next({ visible: false, title });
  }

}
