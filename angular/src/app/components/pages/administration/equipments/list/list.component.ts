import { Component } from '@angular/core';
import { Router } from '@angular/router';

import AdministrationEquipmentsListComponent from '../../../../partials/administration-equipments-list/administration-equipments-list.component';

@Component({
  selector: 'app-administration-equipments-list-page',
  standalone: true,
  imports: [AdministrationEquipmentsListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css'],
})
export default class AdministrationEquipmentsListPageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
