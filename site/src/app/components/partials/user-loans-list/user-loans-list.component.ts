import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

import { UserService } from '../../../services/user.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-user-loaned-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-loans-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class UserLoansListComponent implements OnInit {
  loans: any[] = [];

  constructor(private frontendService: FrontendService, private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoans()
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

  onLoanReturnRequest(equipmentCode: string) {
    this.userService.returnLoan(equipmentCode)
      .pipe(
        tap(() => location.reload()),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
