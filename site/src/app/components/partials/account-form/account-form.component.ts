import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrls: ['../../../../styles/form.css', './account-form.component.css']
})
export class AccountFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;

  get formControls() { return this.changePasswordForm.controls; }

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
    this.changePasswordForm = this.formBuilder.group({
      email: [{ value: undefined, disabled: true }, [Validators.required, Validators.email]],
      oldPassword: [undefined, [Validators.required]],
      newPassword: [undefined, [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.accountService.getUserInfo().subscribe(userInfo => {
      this.changePasswordForm.patchValue({ email: userInfo.email_address });
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }

    const { email, oldPassword, newPassword } = this.changePasswordForm.getRawValue();
    this.accountService
      .changePassword(email, oldPassword, newPassword)
      .pipe(
        tap(() => {
          alert('Password changed successfully');
          location.reload();
        }),
        catchError(() => {
          alert('Password change failed');
          return of();
        })
      )
      .subscribe();
  }

  logout() {
    this.accountService
      .logout()
      .pipe(
        tap(() => this.router.navigate(['/login'])),
        catchError(() => {
          alert('Logout failed');
          return of();
        })
      )
      .subscribe();
  }
}
