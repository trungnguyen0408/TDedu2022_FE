import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, map } from 'rxjs/operators';
import { LocalStorageService } from '../services/localStorage.service';
import { Role } from '../enums/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private localStorageService: LocalStorageService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if ((this.localStorageService.getItem('role') !== Role.superAdmin && state.url === '/admin')
      || (this.localStorageService.getItem('role') !== Role.lecturer && state.url === '/lecturer')) {
      this.router.navigate(['/home']);
      return false;
    }
    return this.authService.isLoggedIn$.pipe(
      take(1),
      map((isLoggedIn: boolean) => {
        if (!isLoggedIn) {
          return false;
        }
        return true;
      }),
    );
  }

}
