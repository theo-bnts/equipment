import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.css']
})
export class HomeTilesComponent {
  constructor(private authService: AuthService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.authService.logout();
    this.navigateTo('/login');
  }
}