import { Component } from '@angular/core';

import { AdministrationNewAccountFormComponent } from '../../../../partials/administration-new-account-form/administration-new-account-form';

@Component({
  selector: 'app-administration-accounts-new-page',
  standalone: true,
  imports: [AdministrationNewAccountFormComponent],
  templateUrl: './new.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationNewAccountPageComponent {}
