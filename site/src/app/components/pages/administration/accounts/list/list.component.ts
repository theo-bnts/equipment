import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationAccountsListComponent } from '../../../../partials/administration-accounts-list/administration-accounts-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationAccountsListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationAccountsListPageComponent { 
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
