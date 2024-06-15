import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';
import ReferentialService from '../../../services/referential.service';

@Component({
  selector: 'app-administration-new-reference-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-reference-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class AdministrationNewReferenceFormComponent implements OnInit {
  formGroup: FormGroup;

  submitted = false;

  types: any[] = [];

  get formControls() {
    return this.formGroup.controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private referentialService: ReferentialService,
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      typeName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.referentialService
      .getTypes()
      .pipe(
        tap((types) => {
          this.types = types;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { name, typeName } = this.formGroup.getRawValue();

    this.referentialAdministrationService
      .createReference(name, typeName)
      .pipe(
        tap(() => this.router.navigate(['/administration/references/list'])),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
