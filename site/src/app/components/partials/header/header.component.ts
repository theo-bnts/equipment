import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {
    this.accountService.getUserInfo().subscribe(user => {
      const roleName = user.role.name;
      if (roleName === 'ADMINISTRATOR') {
        this.router.navigate(['/admin/home']);
      } else if (roleName === 'USER') {
        this.router.navigate(['/user/home']);
      }
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
