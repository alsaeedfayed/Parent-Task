import { Overlay } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-overlay-spinner',
  standalone: true,
  imports: [NzSpinModule],
  templateUrl: './overlay-spinner.component.html',
  styleUrl: './overlay-spinner.component.scss'
})
export class OverlaySpinnerComponent {
  constructor(){}
}
