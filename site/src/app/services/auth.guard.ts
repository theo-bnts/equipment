import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private authService = inject(AccountService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.getUserInfo().pipe(
      map(user => {
        if (user && (user.role.name === 'ADMINISTRATOR' || user.role.name === 'USER')) {
          return true;
        } else {
          this.authService.clearLocalToken();
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.authService.clearLocalToken();
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
