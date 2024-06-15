import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(): Observable<boolean> {
    if (!this.accountService.isLoggedIn()) {
      this.router.navigate(['/login']);
      
      return of(false);
    }

    return this.accountService.getUser()
      .pipe(
        map(() => true),
        catchError(() => {
          this.router.navigate(['/login']);

          return of(false);
        })
      );
  }
}
