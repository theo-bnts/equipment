import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

import { AccountAdministrationService } from '../../../services/account.administration.service';

@Component({
  selector: 'app-administration-accounts-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-accounts-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationAccountsListComponent implements OnInit {
  accounts: any[] = [];

  constructor(private router: Router, private accountAdministrationService: AccountAdministrationService) {}

  ngOnInit() {
    this.accountAdministrationService.getAccounts()
      .pipe(
        tap(data => this.accounts = data),
        catchError(() => {
          alert('Failed to load accounts');
          return of();
        })
      )
      .subscribe();
  }

  navigateToOrganizations(email: string) {
    this.router.navigate(['administration/users/organizations/list'], { queryParams: { email } });
  }

  onAccountDelete(email: string) {
    this.accountAdministrationService.deleteAccount(email)
      .pipe(
        tap(() => {
          this.accounts = this.accounts.filter(account => account.email_address !== email);
        }),
        catchError(() => {
          alert('Failed to delete account');
          return of();
        })
      )
      .subscribe();
  }
}
