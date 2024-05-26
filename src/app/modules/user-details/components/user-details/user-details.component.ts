import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';

import { Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { OverlayLoaderService } from '../../../../core/services/overlay-loader/overlay-loader.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private http: HttpService, private overlayService : OverlayLoaderService) { }

  //---------------------COMPONENT PROPERTIES--------------------
  user!: User;
  private ngUnsubscribe = new Subject<void>();

  ngOnInit() {
    this.getUser();
  }


  //---------------------- GET SINGLE USER------------------------
  getUser(): void {
    this.overlayService.show();
    const userId = this.route.snapshot.paramMap.get('id');
    this.http.get<User>(`/users/${userId}`).pipe(map(
      (res: any) => {
        return res?.data;
      }),
      takeUntil(this.ngUnsubscribe
      ),
    finalize(() => {
      this.overlayService.hide()
    })
    ).subscribe((user: User) => {
        this.user = user;

      })


  }


  //---------------------- STOP LEADKING IN DESTROY LIFE CYCLE ---
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
