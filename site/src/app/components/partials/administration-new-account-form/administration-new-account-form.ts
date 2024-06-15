import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import AccountAdministrationService from '../../../services/account.administration.service';
import FrontendService from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-new-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-account-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class AdministrationNewAccountFormComponent {
  formGroup: FormGroup;

  submitted = false;

  roles = [
    { name: 'USER', displayName: 'Utilisateur' },
    { name: 'ADMINISTRATOR', displayName: 'Administrateur' },
  ];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private accountAdministrationService: AccountAdministrationService,
  ) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleName: ['', Validators.required],
    });
  }

  get formControls() {
    return this.formGroup.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const {
      email, password, firstName, lastName, roleName,
    } = this.formGroup.getRawValue();

    this.accountAdministrationService
      .createAccount(email, password, firstName, lastName, roleName)
      .pipe(
        tap(() => this.router.navigate(['/administration/account/list'])),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
