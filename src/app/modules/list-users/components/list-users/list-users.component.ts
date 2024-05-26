import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../core/services/http-handler/http-handler.service';
import { User } from '../../../../core/models/user.model';
import { map } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent implements OnInit {

  constructor(private http: HttpService , private router : Router) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  users!: User[];

  getAllUsers(): void {
    this.http.get<User[] >('/users').pipe(
      map(
        (res: any) => {
          console.log(res)
          return res?.data;
        })

    ).subscribe((res: User[]) => {
      console.log(res)
      this.users = res;
    })
  }

  //Navigate to specific user to see his details
  goToUser(id : number) : void {
    this.router.navigate([`/user/${id}`])
  }
}
