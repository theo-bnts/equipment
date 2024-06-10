import { Component, OnInit } from '@angular/core';
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

  constructor(private accountAdministrationService: AccountAdministrationService) {}

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
}
