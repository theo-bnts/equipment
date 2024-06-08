import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-tiles.component.html',
  styleUrls: ['./home-tiles.component.css']
})
export class AdminHomeTilesComponent {
  constructor(private authService: AccountService, private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
