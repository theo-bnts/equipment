import { Component } from '@angular/core';

import { UserLoansListComponent } from '../../../../partials/user-loans-list/user-loans-list.component';

@Component({
  selector: 'app-user-loans-list',
  standalone: true,
  imports: [UserLoansListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class UserLoansListPageComponent { }
