import { Component } from '@angular/core';

import { AdministrationTypeListComponent } from '../../../../partials/administration-type-list/administration-type-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationTypeListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationTypeListPageComponent { }
