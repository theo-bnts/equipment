import { Component } from '@angular/core';

import { AdministrationUserOrganizationsAddComponent } from '../../../../../partials/administration-user-organizations-add/administration-user-organizations-add.component';

@Component({
  selector: 'app-administration-users-organizations-add-page',
  standalone: true,
  imports: [AdministrationUserOrganizationsAddComponent],
  templateUrl: './add.component.html',
  styleUrls: ['../../../../../../../styles/page.css', './add.component.css'],
})
export class AdministrationUserOrganizationsListPageComponent {}
