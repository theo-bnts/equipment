import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-home-tiles.component.html',
  styleUrls: ['./administration-home-tiles.component.css'],
})
export default class AdministrationHomeTilesComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
