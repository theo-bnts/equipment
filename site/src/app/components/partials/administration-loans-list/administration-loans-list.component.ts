import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-loans-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-loans-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class AdministrationLoansListComponent implements OnInit {
  loans: any[] = [];

  constructor(
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {}

  ngOnInit() {
    this.referentialAdministrationService
      .getLoans()
      .pipe(
        tap((data) => {
          this.loans = data;
          this.sortLoans();
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  sortLoans() {
    this.loans.sort((a, b) => {
      const dateA = new Date(a.loan_date);
      const dateB = new Date(b.loan_date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  isReturnDateExceeded(returnDate: string): boolean {
    const currentDate = new Date();
    const returnDateObj = new Date(returnDate);
    return returnDateObj < currentDate;
  }

  onLoanStateUpdate(equipmentCode: string, stateName: string) {
    this.referentialAdministrationService
      .updateLoanState(equipmentCode, stateName)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onLoanDelete(equipmentCode: string) {
    this.referentialAdministrationService
      .deleteLoan(equipmentCode)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
