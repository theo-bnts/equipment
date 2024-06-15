import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import AccountService from './account.service';

@Injectable({
  providedIn: 'root',
})
export default class AdministratorAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  canActivate(): Observable<boolean> {
    if (!AccountService.isLoggedIn()) {
      this.router.navigate(['/login']);

      return of(false);
    }

    return this.accountService.getUser().pipe(
      map((user) => {
        if (user.role.name === 'ADMINISTRATOR') {
          return true;
        }
        this.router.navigate(['/user/home']);

        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);

        return of(false);
      }),
    );
  }
}
