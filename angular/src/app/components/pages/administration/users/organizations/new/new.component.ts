import { Component } from '@angular/core';

import AdministrationNewUserOrganizationFormComponent from '../../../../../partials/administration-new-user-organizations-form/administration-new-user-organization-form.component';

@Component({
  selector: 'app-administration-users-organizations-new-page',
  standalone: true,
  imports: [AdministrationNewUserOrganizationFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['../../../../../../../styles/page.css'],
})
export default class AdministrationUserOrganizationsNewPageComponent {}
