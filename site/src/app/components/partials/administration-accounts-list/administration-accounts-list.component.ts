import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import AccountAdministrationService from '../../../services/account.administration.service';
import FrontendService from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-accounts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-accounts-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class AdministrationAccountsListComponent implements OnInit {
  accounts: any[] = [];

  constructor(
    private router: Router,
    private accountAdministrationService: AccountAdministrationService,
  ) {}

  ngOnInit() {
    this.accountAdministrationService
      .getAccounts()
      .pipe(
        tap((data) => {
          this.accounts = data;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  navigateToOrganizations(email: string) {
    this.router.navigate(['administration/users/organizations/list'], {
      queryParams: { email },
    });
  }

  onAccountDelete(email: string) {
    this.accountAdministrationService
      .deleteAccount(email)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
