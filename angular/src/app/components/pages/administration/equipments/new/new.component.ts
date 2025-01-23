import { Component } from '@angular/core';

import AdministrationNewEquipmentFormComponent from '../../../../partials/administration-new-equipment-form/administration-new-equipment-form.component';

@Component({
  selector: 'app-administration-equipments-new-page',
  standalone: true,
  imports: [AdministrationNewEquipmentFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['../../../../../../styles/page.css'],
})
export default class AdministrationEquipmentsNewPageComponent {}
