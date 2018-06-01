import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor (public authService: AuthService,
               public router: Router) {}

  canActivate (route: ActivatedRouteSnapshot,
               state: RouterStateSnapshot): boolean {
    let canAccess = true;
    const roles = route.data['roles'] as Array<string>;

    roles.map((role: string) => {
      if (!this.authService.roles[role]) {
        canAccess = false;
        this.router.navigate(['/404']);
      }
    });

    return canAccess;
  }


}
