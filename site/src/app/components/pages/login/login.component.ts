import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import LoginFormComponent from '../../partials/login-form/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, LoginFormComponent],
  templateUrl: './login.component.html',
  styleUrls: ['../../../../styles/page.css', './login.component.css'],
})
export default class LoginPageComponent {}
