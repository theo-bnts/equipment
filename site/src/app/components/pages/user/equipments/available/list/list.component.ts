import { Component } from '@angular/core';

import TypesDropdownComponent from '../../../../../partials/types-dropdown/types-dropdown.component';
import UserAvailableEquipmentsListComponent from '../../../../../partials/user-available-equipments-list/user-available-equipments-list.component';

@Component({
  selector: 'app-user-equipments-available-list-page',
  standalone: true,
  imports: [UserAvailableEquipmentsListComponent, TypesDropdownComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../../styles/page.css', './list.component.css'],
})
export default class UserAvailableEquipmentsListPageComponent {
  selectedType: string | undefined;

  onTypeChange(type: string) {
    this.selectedType = type;
  }
}
