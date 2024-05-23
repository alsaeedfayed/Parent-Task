import { Component } from '@angular/core';
import { HttpService } from './core/services/http-handler/http-handler.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parentTask';

}
