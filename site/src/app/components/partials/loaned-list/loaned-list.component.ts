import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loaned-list.component.html',
  styleUrls: ['./loaned-list.component.css']
})
export class ListComponent implements OnInit {
  loans: any[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoans().subscribe(
      data => this.loans = data,
      error => console.error('Failed to load loans', error)
    );
  }

  returnLoan(equipmentCode: string) {
    this.userService.returnLoan(equipmentCode)
      .pipe(
        tap(() => this.ngOnInit()),
        catchError(() => {
          alert('Failed to ask for loan return');
          return of();
        })
      )
      .subscribe();
  }
}
