import { Component } from '@angular/core';
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
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent {
  changePasswordForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get formControls() { return this.changePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      return;
    }
 
    const { email, oldPassword, newPassword } = this.changePasswordForm.value;
    this.accountService
      .changePassword(email, oldPassword, newPassword)
      .pipe(
        tap(() => alert('Password changed successfully')),
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
