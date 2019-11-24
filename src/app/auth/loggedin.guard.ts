import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class LoggedInGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) {
    const authenticated = !!this.authService.idToken;
    if (authenticated) {
      return true;
    }
    return this.router.createUrlTree(['/login'])
  }
}