import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import ReferentialService from '../../../services/referential.service';
import UserService from '../../../services/user.service';

@Component({
  selector: 'app-user-loan-request-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './user-loan-request-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class UserLoanRequestFormComponent {
  formGroup: FormGroup;

  submitted = false;

  organizationOnly = false;

  equipmentCode: string | null = null;

  userOrganizations: any[] = [];

  rooms: any[] = [];

  isOrganizationSelected = false;

  get formControls() {
    return this.formGroup.controls;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private referentialService: ReferentialService,
    private userService: UserService,
  ) {
    this.formGroup = this.formBuilder.group({
      loanType: ['', Validators.required],
      organization: [''],
      room: ['', Validators.required],
    });

    this.formGroup.get('loanType')?.valueChanges.subscribe((loanType) => {
      if (loanType === 'ORGANIZATION') {
        this.formGroup.get('organization')?.setValidators(Validators.required);
      } else {
        this.formGroup.get('organization')?.clearValidators();
      }
      this.formGroup.get('organization')?.updateValueAndValidity();
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.organizationOnly = params.get('organizationOnly') === 'true';
      this.equipmentCode = params.get('equipmentCode');

      if (this.organizationOnly) {
        this.formGroup.patchValue({ loanType: 'ORGANIZATION' });
      }

      if (this.equipmentCode === null) {
        this.router.navigate(['/user/equipments/available/list']);
      }
    });

    this.userService
      .getOrganizations()
      .pipe(
        tap((data) => {
          this.userOrganizations = data;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();

    this.referentialService
      .getRooms()
      .pipe(
        tap((data) => {
          this.rooms = data;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onLoanTypeChange(loanType: string) {
    this.isOrganizationSelected = loanType === 'ORGANIZATION';
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { loanType, room } = this.formGroup.getRawValue();
    let { organization } = this.formGroup.getRawValue();

    if (organization === undefined || loanType !== 'ORGANIZATION') {
      organization = null;
    }

    this.userService
      .createLoanRequest(this.equipmentCode!, organization, room)
      .pipe(
        tap(() => this.router.navigate(['/user/home'])),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
