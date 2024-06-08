import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountFormComponent } from '../../partials/account-form/account-form.component';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, AccountFormComponent],
  templateUrl: './account.component.html',
  styleUrls: ['../../../../styles/page.css']
})
export class AccountPageComponent {}
