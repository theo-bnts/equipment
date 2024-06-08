import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { AccountFormComponent } from '../../partials/account-form/account-form.component';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  templateUrl: './account.component.html',
  styleUrls: ['../../../../styles/page.css', './account.component.css']
})
export class AccountPageComponent {
  constructor(private accountService: AccountService, private router: Router) {}

  logout() {
    this.accountService
      .logout()
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        catchError(() => {
          alert('Logout failed');
          return of();
        })
      )
      .subscribe();
  }
}
