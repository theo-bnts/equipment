import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-loan-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class LoanRequestFormComponent {
  loanRequestForm: FormGroup;
  userOrganizations: any[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AccountService, private router: Router) {
    this.loanRequestForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get formControls() { return this.loanRequestForm.controls; }

  isOrganizationSelected = false;
  
  onLoanTypeChange(loantype: string) {
    this.isOrganizationSelected = false;
  }

  onSubmit() {
  }
}
