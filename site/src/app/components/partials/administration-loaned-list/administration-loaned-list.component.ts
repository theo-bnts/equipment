import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-loaned-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-loaned-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationLoanedListComponent implements OnInit {
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

    console.log(this.loans);
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

  onLoanRequestAcceptation(equipmentCode: string) {
    this.referentialAdministrationService.updateLoanState(equipmentCode, 'LOANED')
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to accept loan request');
          return of();
        })
      )
      .subscribe();
  }

  onLoanReturnRequestAcceptation(equipmentCode: string) {
    this.referentialAdministrationService.updateLoanState(equipmentCode, 'RETURNED')
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to accept loan return request');
          return of();
        })
      )
      .subscribe();
  }
}
