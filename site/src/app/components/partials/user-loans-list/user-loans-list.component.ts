import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import FrontendService from '../../../services/frontend.service';
import UserService from '../../../services/user.service';

@Component({
  selector: 'app-user-loaned-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-loans-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class UserLoansListComponent implements OnInit {
  loans: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
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

  onLoanReturnRequest(equipmentCode: string) {
    this.userService
      .returnLoan(equipmentCode)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
