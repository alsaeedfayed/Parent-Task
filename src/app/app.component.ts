import { Component, OnInit } from '@angular/core';
import { HttpService } from './core/services/http-handler/http-handler.service';
import { NotificationsService } from './core/services/notifications/notifications.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'parentTask';
  constructor(private http : HttpService , private  notificationServices : NotificationsService){

  }
  ngOnInit(): void {
    this.http.get<any>('').subscribe(res => {
      console.log(res)
    })

  }

}
