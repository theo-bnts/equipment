import { Component } from '@angular/core';

import { AdministrationNewReferenceFormComponent } from '../../../../partials/administration-new-reference-form/administration-new-reference-form.component';

@Component({
  selector: 'app-administration-references-new-page',
  standalone: true,
  imports: [AdministrationNewReferenceFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationReferencesNewPageComponent { }
