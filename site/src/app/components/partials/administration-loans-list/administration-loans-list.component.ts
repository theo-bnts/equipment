import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-loans-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-loans-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationLoansListComponent implements OnInit {
  loans: any[] = [];

  constructor(private frontendService: FrontendService, private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getLoans()
      .pipe(
        tap(data => this.loans = data),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe(() => this.sortLoans());
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
    this.referentialAdministrationService.updateLoanState(equipmentCode, stateName)
      .pipe(
        tap(() => location.reload()),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }

  onLoanDelete(equipmentCode: string) {
    this.referentialAdministrationService.deleteLoan(equipmentCode)
      .pipe(
        tap(() => location.reload()),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
