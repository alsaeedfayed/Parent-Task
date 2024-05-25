import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  constructor(private notification: NzNotificationService) {}


   createBasicNotification(type : string , title : string , body : string): void {
    this.notification
      .create(
        type,
        title,
        body,
        {
          nzDuration : 3000
        }
      )
      .onClick.subscribe(() => {
        //do custome action on click
        //console.log('notification clicked!');
      });
  }
}

