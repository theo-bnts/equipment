import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationTypesListComponent } from '../../../../partials/administration-types-list/administration-types-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationTypesListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationTypesListPageComponent {
  constructor(private router: Router) { }

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}