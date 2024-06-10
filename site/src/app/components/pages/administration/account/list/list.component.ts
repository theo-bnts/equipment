import { Component } from '@angular/core';

import { AdministrationAccountListComponent } from '../../../../partials/administration-account-list/administration-account-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationAccountListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationAccountListPageComponent { }
