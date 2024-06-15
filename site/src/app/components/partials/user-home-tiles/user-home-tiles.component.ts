import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-home-tiles.component.html',
  styleUrls: ['./user-home-tiles.component.css'],
})
export default class UserHomeTilesComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
