import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';
import UserAdministrationService from '../../../services/user.administration.service';

@Component({
  selector: 'app-administration-new-user-organization-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-user-organization-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class AdministrationNewUserOrganizationFormComponent
implements OnInit {
  formGroup: FormGroup;

  submitted = false;

  organizations: any[] = [];

  availableOrganizations: any[] = [];

  userEmail: string | null = null;

  get formControls() {
    return this.formGroup.controls;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private userAdministrationService: UserAdministrationService,
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {
    this.formGroup = this.formBuilder.group({
      selectedOrganization: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      this.userEmail = params.get('email');

      this.userAdministrationService
        .getUserOrganizations(this.userEmail!)
        .pipe(
          tap((data) => {
            this.organizations = data;
            this.loadAvailableOrganizations();
          }),
          catchError((error) => FrontendService.catchError(error)),
        )
        .subscribe();
    });
  }

  loadAvailableOrganizations() {
    this.referentialAdministrationService
      .getOrganizations()
      .pipe(
        tap((data) => {
          this.availableOrganizations = data.filter(
            (organization: any) => !this.organizations.some(
              (userOrganization) => userOrganization.name === organization.name,
            ),
          );
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { selectedOrganization } = this.formGroup.getRawValue();
    this.userAdministrationService
      .addUserToOrganization(this.userEmail!, selectedOrganization)
      .pipe(
        tap(() => {
          this.router.navigate(['/administration/users/organizations/list'], {
            queryParamsHandling: 'preserve',
          });
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
