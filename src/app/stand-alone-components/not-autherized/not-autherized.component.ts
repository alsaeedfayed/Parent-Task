import { Component } from '@angular/core';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-autherized',
  standalone: true,
  imports: [NzResultModule,NzButtonModule,RouterLink],
  templateUrl: './not-autherized.component.html',
  styleUrl: './not-autherized.component.scss'
})
export class NotAutherizedComponent {

}
