import { Component } from '@angular/core';

import { LoanRequestFormComponent } from '../../../partials/loan-request-form/loan-request-form.component';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [LoanRequestFormComponent],
  templateUrl: './request.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class LoanRequestPageComponent { }
