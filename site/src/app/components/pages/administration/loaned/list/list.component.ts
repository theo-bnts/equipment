import { Component } from '@angular/core';

import { AdministrationLoanedListComponent } from '../../../../partials/administration-loaned-list/administration-loaned-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationLoanedListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class AdministrationLoanedListPageComponent { }
