import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administration-equipment-home-tiles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-equipment-home-tiles.component.html',
  styleUrls: ['./administration-equipment-home-tiles.component.css']
})
export class AdministrationEquipmentHomeTilesComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
