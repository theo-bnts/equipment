import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  styleUrls: ['../../../../styles/form.css']
})
export class AccountFormComponent implements OnInit {
  changePasswordForm: FormGroup;
  submitted = false;

  get formControls() { return this.changePasswordForm.controls; }

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.changePasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
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
}
