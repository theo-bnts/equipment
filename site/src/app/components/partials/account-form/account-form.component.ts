import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountService } from '../../../services/account.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-account-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './account-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class AccountFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  get formControls() { return this.formGroup.controls; }

  constructor(private formBuilder: FormBuilder, private frontendService: FrontendService, private accountService: AccountService) {
    this.formGroup = this.formBuilder.group({
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      oldPassword: ['', [Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {
    this.accountService.getUser()
      .pipe(
        tap(user => this.formGroup.patchValue({ email: user.email_address })),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { email, oldPassword, newPassword } = this.formGroup.getRawValue();

    this.accountService.changePassword(email, oldPassword, newPassword)
      .pipe(
        tap(() => {
          alert('PASSWORD_CHANGED');
          location.reload();
        }),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
