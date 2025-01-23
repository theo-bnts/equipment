import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import AccountService from '../../../services/account.service';
import FrontendService from '../../../services/frontend.service';
import AccountFormComponent from '../../partials/account-form/account-form.component';

@Component({
  selector: 'app-account-page',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  templateUrl: './account.component.html',
  styleUrls: ['../../../../styles/page.css', './account.component.css'],
})
export default class AccountPageComponent {
  constructor(
    private router: Router,
    private accountService: AccountService,
  ) {}

  logout() {
    this.accountService
      .logout()
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
