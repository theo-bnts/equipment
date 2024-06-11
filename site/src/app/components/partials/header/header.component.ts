import { Component } from '@angular/core';
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
export class HeaderComponent {
  constructor(private router: Router, private accountService: AccountService) {}

  navigateToHome() {
    if (this.accountService.isLoggedIn()) {
      this.accountService.getUserInfo().subscribe(user => {
        const roleName = user.role.name;
        if (roleName === 'ADMINISTRATOR') {
          this.router.navigate(['/administration/home']);
        } else if (roleName === 'USER') {
          this.router.navigate(['/user/home']);
        }
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
