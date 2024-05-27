import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { Subject, takeUntil } from 'rxjs';
import { ModalService } from '../../core/services/modal/modal.service';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [NzModalModule],
  templateUrl: './pop-up.component.html',
  styleUrl: './pop-up.component.scss'
})
export class PopUpComponent implements OnInit , OnDestroy {

  //------------------- COMPONENT PROPERTIES ----------------
  visible = false;
  modalTitle! : string;
  private ngUnsubscribe = new Subject<void>();

  constructor(private modalService : ModalService){}
   ngOnInit(): void {
    //----------------- FIRE MODAL REAL TIME LISTENING TO BEHAVIOUR SUBJECT -----------------
    this.modalService.popUpListner$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data : any) => {
     // debugger
     // console.log(data)
      this.visible = data.visible;
      this.modalTitle = data?.title

    })
   }


   ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
   }

}
