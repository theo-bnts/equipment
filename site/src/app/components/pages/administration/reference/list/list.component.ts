import { Component } from '@angular/core';

import { AdministrationReferenceListComponent } from '../../../../partials/administration-reference-list/administration-reference-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [AdministrationReferenceListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationReferenceListPageComponent { }
