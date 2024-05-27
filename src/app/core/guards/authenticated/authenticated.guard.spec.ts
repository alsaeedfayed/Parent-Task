import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { authenticatedGuard } from './authenticated.guard';
import { authService } from '../../services/auth/auth-service.service';
import { Observable, of } from 'rxjs';

describe('AuthenticatedGuard', () => {
  let guard: authenticatedGuard;
  let authServiceMock: Partial<authService>;
  let router: Router;

  beforeEach(() => {
    authServiceMock = {
      isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true)
    };

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        authenticatedGuard,
        { provide: authService, useValue: authServiceMock }
      ]
    });
    guard = TestBed.inject(authenticatedGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is authenticated', () => {
    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBe(true);
  });

  it('should navigate to not-authenticated route if user is not authenticated', () => {
    authServiceMock.isAuthenticated = jasmine.createSpy('isAuthenticated').and.returnValue(false);
    const navigateSpy = spyOn(router, 'navigate');

    const route: ActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const state: RouterStateSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate(route, state);

    expect(result).toBe(false);
    expect(navigateSpy).toHaveBeenCalledWith(['/not-authenticated']);
  });
});
