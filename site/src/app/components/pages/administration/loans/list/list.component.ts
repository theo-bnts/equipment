import { Component } from '@angular/core';

import { AdministrationLoansListComponent } from '../../../../partials/administration-loans-list/administration-loans-list.component';

@Component({
  selector: 'app-administration-loans-list',
  standalone: true,
  imports: [AdministrationLoansListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationLoansListPageComponent { }
