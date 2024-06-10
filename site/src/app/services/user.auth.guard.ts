import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  private authService = inject(AccountService);
  private router = inject(Router);

  canActivate(): Observable<boolean> {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return of(true);
  }
}
