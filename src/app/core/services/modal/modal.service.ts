import { Injectable } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { BehaviorSubject } from 'rxjs';

export type modalProps = {
  visible: boolean,
  placement: NzDrawerPlacement,
  title : string

}

@Injectable({
  providedIn: 'root'
})
export class ModalService {

   dataSubject$ = new BehaviorSubject<modalProps>({visible: false , placement : 'right' , title : ''});


  constructor() { }

  openModal(placement : NzDrawerPlacement , title : string): void {
    this.dataSubject$.next({visible: true, placement , title : title});
  }

  closeModal(placement : NzDrawerPlacement, title : string): void {
    this.dataSubject$.next({visible: false, placement  ,title});
  }


}
