import { Component } from '@angular/core';

import { AdministrationEquipmentListComponent } from '../../../../partials/administration-equipment-list/administration-equipment-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationEquipmentListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationEquipmentListPageComponent { }
