import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import AccountService from '../../../services/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export default class HeaderComponent {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  navigateToHome() {
    if (AccountService.isLoggedIn()) {
      this.accountService
        .getUser()
        .pipe(
          tap((user) => {
            const roleName = user.role.name;

            if (roleName === 'ADMINISTRATOR') {
              this.router.navigate(['/administration/home']);
            } else {
              this.router.navigate(['/user/home']);
            }
          }),
          catchError(() => this.router.navigate(['/login'])),
        )
        .subscribe();
    }
  }
}
