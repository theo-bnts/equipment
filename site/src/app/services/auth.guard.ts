import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  private authService = inject(AccountService);
  private router = inject(Router);

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
