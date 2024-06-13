import { Component } from '@angular/core';
import { UserAvailableEquipmentsListComponent } from '../../../../../partials/user-available-equipments-list/user-available-equipments-list.component';
import { TypesDropdownComponent } from '../../../../../partials/types-dropdown/types-dropdown.component';

@Component({
  selector: 'app-user-equipments-available-list',
  standalone: true,
  imports: [UserAvailableEquipmentsListComponent, TypesDropdownComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../../styles/page.css', './list.component.css']
})
export class UserAvailableEquipmentsListPageComponent {
  selectedType: string | undefined;

  onTypeChange(type: string) {
    this.selectedType = type;
  }
}
