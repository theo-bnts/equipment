import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';
import UserAdministrationService from '../../../services/user.administration.service';

@Component({
  selector: 'app-administration-user-organizations-add-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-user-organizations-add-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class AdministrationUserOrganizationsAddFormComponent implements OnInit {
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
      const email = params.get('email');
      this.userEmail = email;

      this.userAdministrationService
        .getUserOrganizations(email!)
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
            (org: any) => !this.organizations.some((userOrg: any) => userOrg.name === org.name)
          );
        }),
        catchError((error) => {
          console.error('Failed to load available organizations', error);
          return of();
        }),
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
            queryParams: { email: this.userEmail },
          });
        }),
        catchError((error) => {
          console.error('Failed to add organization', error);
          return of();
        }),
      )
      .subscribe();
  }
}
