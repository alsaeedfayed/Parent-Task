import { Injectable } from '@angular/core';
import { BrowserDbService } from '../browser-db/browser-db.service';
import { NotificationsService } from '../notifications/notifications.service';
import { prefix } from '../../configs/constants';
import { User } from '../../models/user.model';
import { UtilsService } from '../utils/utils.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class authService {

  constructor(private browserDb: BrowserDbService, private notificationService: NotificationsService, private utils: UtilsService , private router : Router) {
    //once intialized i need the token
    this.token = this.load('token');

    if(this.token){
      this.setToken(this.token);
    }
    //redirect to login in case no token ... ex : local storage is cleared.
    else {
      this.router.navigate(['/login']);
    }

  }

  token: any ;
  current_user!: User;

  setToken(token: any): void {
    this.token = Object.assign({}, this.token, token);
    //decode the token and set current_user
    const decodedToken = this.utils.getDecodedAccessToken(this.token);
    //set the current user from the decoded token
    this.setCurrentUser(decodedToken);
    //save the token to the local storage
    this.save();
  }

  setCurrentUser(token: any): void {
    // this.current_user.id = token.id;
    // this.current_user.email = token.email;
    // this.current_user.first_name = token.first_name;
    // this.current_user.last_name = token.last_name;
    // this.current_user.avatar = token.avatar;
  }

  save(): boolean {
    this.presist('token', this.token);
    return true;
  }


  //caching our user data and token as desired to the local storage
  protected presist(prop: string, value: any, expires?: Date) {
    try {
      if (value) {
        this.browserDb.setItems(`${prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value)
      }
    }
    catch (err: any) {
      this.notificationService.createBasicNotification('error', 'canot access local storage for now', err?.message)

    }
  }


  //get whatever you want from the local storage by passing the property name
  load(prop: string) {
    this.browserDb.getItem(`${prefix}${prop}`)
  }


  //check whether the user is authenticated or not
  isAuthenticated(): string {
    return this.token
  }
}
