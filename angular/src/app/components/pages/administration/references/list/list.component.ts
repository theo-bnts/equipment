import { Component } from '@angular/core';
import { Router } from '@angular/router';

import AdministrationReferencesListComponent from '../../../../partials/administration-references-list/administration-references-list.component';

@Component({
  selector: 'app-administration-references-list-page',
  standalone: true,
  imports: [AdministrationReferencesListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css'],
})
export default class AdministrationReferencesListPageComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
