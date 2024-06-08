import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class LoginFormComponent {
  loginForm: FormGroup;
  submitted = false;

  get formControls() { return this.loginForm.controls; }

  constructor(private formBuilder: FormBuilder, private authService: AccountService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        tap(user => {
          if (user.role.name === 'ADMINISTRATOR') {
            this.router.navigate(['/administration/home']);
          } else if (user.role.name === 'USER') {
            this.router.navigate(['/user/home']);
          }
        }),
        catchError(() => {
          alert('Login failed');
          return of();
        })
      )
      .subscribe();
  }
}
