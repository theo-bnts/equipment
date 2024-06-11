import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationAccountOrganizationComponent } from '../../../../partials/administration-account-organization/administration-account-organization.component'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationAccountOrganizationComponent],
  templateUrl: './organization.component.html',
  styleUrls: ['../../../../../../styles/page.css', './organization.component.css']
})
export class AdministrationAccountOrganizationPageComponent { 
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
