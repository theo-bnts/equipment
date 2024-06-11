import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationAccountListComponent } from '../../../../partials/administration-account-list/administration-account-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationAccountListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationAccountListPageComponent { 
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
