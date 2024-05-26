import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import { modalProps, ModalService } from '../../core/services/modal/modal.service';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';



@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [NzDrawerModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit , OnDestroy {

  placement: NzDrawerPlacement = 'right';
  visible = false;
  modalTitle! : string;
  private ngUnsubscribe = new Subject<void>();

  constructor(private modalService : ModalService){}
   ngOnInit(): void {
    this.modalService.dataSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((data : modalProps) => {
      this.visible = data.visible;
      this.placement = data.placement;
      this.modalTitle = data.title
    })
   }


   ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
   }

}
