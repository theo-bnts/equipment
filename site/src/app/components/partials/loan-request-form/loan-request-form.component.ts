import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-loan-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class LoanRequestFormComponent {
  loanRequestForm: FormGroup;
  isOrganizationSelected = false;
  userOrganizations: any[] = [];

  get formControls() { return this.loanRequestForm.controls; }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loanRequestForm = this.formBuilder.group({
      loanType: ['', Validators.required],
      organization: [''],
    });
  }

  ngOnInit() {
    this.userService.getOrganizations().subscribe(
      data => this.userOrganizations = data,
      error => console.error('Failed to load user organizations', error)
    );
  }

  onLoanTypeChange(loanType: string) {
    this.isOrganizationSelected = loanType === 'ORGANIZATION';
  }

  onSubmit() {
    if (this.loanRequestForm.invalid) {
      return;
    }

    console.log(this.loanRequestForm.getRawValue());
  }
}
