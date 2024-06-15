import { Component } from '@angular/core';

import AdministrationUserOrganizationsListComponent from '../../../../../partials/administration-user-organizations-list/administration-user-organizations-list.component';

@Component({
  selector: 'app-administration-users-organizations-list-page',
  standalone: true,
  imports: [AdministrationUserOrganizationsListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../../styles/page.css', './list.component.css'],
})
export default class AdministrationUserOrganizationsListPageComponent {}
