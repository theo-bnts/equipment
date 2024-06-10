import { Component } from '@angular/core';

import { UserLoanedListComponent } from '../../../../partials/user-loaned-list/user-loaned-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [UserLoanedListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class UserLoanedListPageComponent { }
