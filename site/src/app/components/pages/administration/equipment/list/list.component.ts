import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationEquipmentListComponent } from '../../../../partials/administration-equipment-list/administration-equipment-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationEquipmentListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationEquipmentListPageComponent {
  constructor(private router: Router) { }

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
