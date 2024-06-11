import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountAdministrationService } from '../../../services/account.administration.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-administration-account-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-account-add.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class AdministrationAccountAddComponent {
  addAccountForm: FormGroup;
  submitted = false;

  roles = [
    { name: 'USER', displayName: 'Utilisateur' },
    { name: 'ADMINISTRATOR', displayName: 'Administrateur' }
  ];

  constructor(
    private fb: FormBuilder,
    private accountAdministrationService: AccountAdministrationService,
    private router: Router
  ) {
    this.addAccountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleName: ['', Validators.required]
    });
  }

  get formControls() {
    return this.addAccountForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addAccountForm.valid) {
      const { email, password, firstName, lastName, roleName } = this.addAccountForm.value;
      this.accountAdministrationService.createAccount(email, password, firstName, lastName, roleName)
        .subscribe(() => {
          alert('Compte créé avec succès');
          this.router.navigate(['/administration/account/list']);
        }, error => {
          alert('Échec de la création du compte');
        });
    }
  }
}
