import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration-equipments-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-equipments-home-tiles.component.html',
  styleUrls: ['./administration-equipments-home-tiles.component.css'],
})
export default class AdministrationEquipmentsHomeTilesComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
