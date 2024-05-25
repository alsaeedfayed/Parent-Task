import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, NgZone } from '@angular/core';
import { OverlaySpinnerComponent } from '../../../stand-alone-components/overlay-spinner/overlay-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class OverlayLoaderService {

  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay, private ngZone: NgZone) {}

  show() {
    this.ngZone.runOutsideAngular(() => {
      if (!this.overlayRef) {
        const config = new OverlayConfig({ hasBackdrop: true });
        this.overlayRef = this.overlay.create(config);

        const overlayPortal = new ComponentPortal(OverlaySpinnerComponent);
        this.overlayRef.attach(overlayPortal);
      }
    });
  }

  hide() {
    this.ngZone.run(() => {
      if (this.overlayRef) {
        this.overlayRef.detach();
        this.overlayRef.dispose();
        this.overlayRef = null;
      }
    });
  }
}
