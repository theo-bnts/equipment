import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdministrationReferenceListComponent } from '../../../../partials/administration-reference-list/administration-reference-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationReferenceListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css', './list.component.css']
})
export class AdministrationReferenceListPageComponent {
  constructor(private router: Router) { }

  public navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
