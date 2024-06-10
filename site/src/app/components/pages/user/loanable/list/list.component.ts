import { Component } from '@angular/core';
import { UserLoanableListComponent } from '../../../../partials/user-loanable-list/user-loanable-list.component';
import { TypesDropdownComponent } from '../../../../partials/types-dropdown/types-dropdown.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [UserLoanableListComponent, TypesDropdownComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class UserLoanableListPageComponent {
  selectedType: string | undefined;

  onTypeChange(type: string) {
    this.selectedType = type;
  }
}
