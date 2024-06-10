import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-loaned-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-loaned-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class UserLoanedListComponent implements OnInit {
  loans: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoans().subscribe(
      data => {
        this.loans = data;
        this.sortLoans();
      },
      error => console.error('Failed to load loans', error)
    );
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
      red: currentStateName === expectedStateName && nextExpectedStateName === 'RETURN_REQUESTED',
      grey: currentStateName !== expectedStateName,
      disabled: currentStateName !== expectedStateName
    };
  }

  onLoanReturnRequest(equipmentCode: string) {
    this.userService.returnLoan(equipmentCode)
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to ask for loan return');
          return of();
        })
      )
      .subscribe();
  }
}
