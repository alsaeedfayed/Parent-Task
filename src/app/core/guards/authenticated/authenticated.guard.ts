import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { authService } from '../../services/auth/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class authenticatedGuard implements CanActivate {

  constructor(private authService: authService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/not-authenticated']);
      return false;
    }
  }

}
