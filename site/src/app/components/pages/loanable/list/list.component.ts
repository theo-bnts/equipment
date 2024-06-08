import { Component } from '@angular/core';

import { LoanableListComponent } from '../../../partials/loanable-list/loanable-list.component';
import { TypesDropdownComponent } from '../../../partials/types-dropdown/types-dropdown.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [LoanableListComponent, TypesDropdownComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class LoanableListPageComponent { }
