import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationTypeListComponent } from '../../../../partials/administration-type-list/administration-type-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationTypeListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationTypeListPageComponent {
  constructor(private router: Router) { }

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
