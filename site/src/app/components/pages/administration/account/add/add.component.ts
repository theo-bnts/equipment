import { Component } from '@angular/core';

import { AdministrationAccountAddComponent } from '../../../../partials/administration-account-add/administration-account-add.component';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [AdministrationAccountAddComponent],
  templateUrl: './add.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationAccountAddPageComponent {}
