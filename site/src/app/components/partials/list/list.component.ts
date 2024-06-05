import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  loans: any[] = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userService.getLoans().subscribe(
      data => { this.loans = data; console.log('Loans loaded', data); },
      error => console.error('Failed to load loans', error)
    );
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
