import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AccountAdministrationService } from '../../../services/account.administration.service';

@Component({
  selector: 'app-administration-account-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-account-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationAccountListComponent implements OnInit {
  accounts: any[] = [];

  constructor(
    private accountAdministrationService: AccountAdministrationService,
    private router: Router
  ) {}
  
  viewOrganizations(email: string) {
    this.router.navigate(['administration/account/organization'], { queryParams: { email } });
  }

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
