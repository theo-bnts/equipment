import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-reference-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-reference-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationReferenceListComponent implements OnInit {
  loans: any[] = [];

  constructor(private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getLoans()
      .pipe(
        tap(data => this.loans = data),
        catchError(() => {
          alert('Failed to load loans');
          return of();
        })
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

  getButtonClasses(currentStateName: string, expectedStateName: string, nextExpectedStateName: string) {
    return {
      green: currentStateName === expectedStateName && nextExpectedStateName === 'LOANED',
      yellow: currentStateName === expectedStateName && nextExpectedStateName === 'RETURNED',
      red: currentStateName === expectedStateName && nextExpectedStateName === 'REFUSED',
      grey: currentStateName !== expectedStateName,
      disabled: currentStateName !== expectedStateName
    };
  }

  onLoanStateUpdate(equipmentCode: string, stateName: string) {
    this.referentialAdministrationService.updateLoanState(equipmentCode, stateName)
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to update loan state');
          return of();
        })
      )
      .subscribe();
  }

  onLoanDelete(equipmentCode: string) {
    this.referentialAdministrationService.deleteLoan(equipmentCode)
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to delete loan');
          return of();
        })
      )
      .subscribe();
  }
}
