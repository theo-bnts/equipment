import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';

import { AccountService } from '../../../services/account.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class LoginFormComponent {
  formGroup: FormGroup;
  submitted = false;

  get formControls() { return this.formGroup.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder, private frontendService: FrontendService, private authService: AccountService) {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { email, password } = this.formGroup.getRawValue();

    this.authService.login(email, password)
      .pipe(
        tap(user => {
          if (user.role.name === 'ADMINISTRATOR') {
            this.router.navigate(['/administration/home']);
          }
          else {
            this.router.navigate(['/user/home']);
          }
        }),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
