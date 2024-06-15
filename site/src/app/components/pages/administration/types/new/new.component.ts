import { Component } from '@angular/core';

import AdministrationNewTypeFormComponent from '../../../../partials/administration-new-type-form/administration-new-type-form.component';

@Component({
  selector: 'app-administration-types-new-page',
  standalone: true,
  imports: [AdministrationNewTypeFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['../../../../../../styles/page.css'],
})
export default class AdministrationTypesNewPageComponent {}
