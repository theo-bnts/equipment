import { Component } from '@angular/core';

import UserLoanRequestFormComponent from '../../../../partials/user-loan-request-form/user-loan-request-form.component';

@Component({
  selector: 'app-user-loans-request-page',
  standalone: true,
  imports: [UserLoanRequestFormComponent],
  templateUrl: './request.component.html',
  styleUrls: ['../../../../../../styles/page.css'],
})
export default class UserLoanRequestPageComponent {}
