import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, Observable } from 'rxjs';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';

import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private http: HttpService) { }

  user!: User;
  private ngUnsubscribe = new Subject<void>();
  ngOnInit() {
    this.getUser();
  }


  getUser(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.http.get<User>(`/users/${userId}`).pipe(map(
      (res: any) => {
        return res?.data;
      }),
      takeUntil(this.ngUnsubscribe
      )).subscribe((user: User) => {
        this.user = user;

      })


  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
