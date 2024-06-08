import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserService } from '../../../services/user.service';
import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-loan-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class LoanRequestFormComponent {
  loanRequestForm: FormGroup;
  submitted = false;
  organizationOnly = false;
  equipmentCode: string | null = null;
  userOrganizations: any[] = [];
  rooms: any[] = [];
  isOrganizationSelected = false;

  get formControls() { return this.loanRequestForm.controls; }

  constructor(private formBuilder: FormBuilder, private userService: UserService, private referentialService: ReferentialService, private router: Router, private route: ActivatedRoute) {
    this.loanRequestForm = this.formBuilder.group({
      loanType: [undefined, Validators.required],
      organization: [undefined],
      room: [undefined, Validators.required],
    });

    this.loanRequestForm.get('loanType')?.valueChanges.subscribe(loanType => {
      if (loanType === 'ORGANIZATION') {
        this.loanRequestForm.get('organization')?.setValidators(Validators.required);
      } else {
        this.loanRequestForm.get('organization')?.clearValidators();
      }
      this.loanRequestForm.get('organization')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      this.organizationOnly = params.get('organizationOnly') === 'true';
      this.equipmentCode = params.get('equipmentCode');

      if (this.organizationOnly) {
        this.loanRequestForm.patchValue({ loanType: 'ORGANIZATION' });
      }
      
      if (this.equipmentCode === null) {
        this.router.navigate(['/user/home']);
      }
    });

    this.userService.getOrganizations().subscribe(
      data => this.userOrganizations = data,
      error => console.error('Failed to load user organizations', error)
    );

    this.referentialService.getRooms().subscribe(
      data => this.rooms = data,
      error => console.error('Failed to load rooms', error)
    );
  }

  onLoanTypeChange(loanType: string) {
    this.isOrganizationSelected = loanType === 'ORGANIZATION';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loanRequestForm.invalid) {
      return;
    }

    let { loanType, organization, room } = this.loanRequestForm.value;

    if (loanType !== 'ORGANIZATION') {
      organization = null;
    }

    this.userService.createLoanRequest(this.equipmentCode!, organization, room)
      .pipe(
        tap(() => this.router.navigate(['/user/home'])),
        catchError(() => {
          alert('Loan request failed');
          return of();
        })
      )
      .subscribe();
  }
}
