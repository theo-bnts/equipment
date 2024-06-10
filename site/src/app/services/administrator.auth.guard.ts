import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorAuthGuard implements CanActivate {
  private authService = inject(AccountService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    return this.authService.getUserInfo().pipe(
      map(user => {
        if (user && user.role.name === 'ADMINISTRATOR') {
          return true;
        } else {
          this.router.navigate(['/user/home']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/user/home']);
        return of(false);
      })
    );
  }
}
