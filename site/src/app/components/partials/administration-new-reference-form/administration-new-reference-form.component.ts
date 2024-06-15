import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { ReferentialService } from '../../../services/referential.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-new-reference-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-reference-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export class AdministrationNewReferenceFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  types: any[] = [];

  get formControls() {
    return this.formGroup.controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private frontendService: FrontendService, 
    private referentialService: ReferentialService,
    private referentialAdministrationService: ReferentialAdministrationService
  ) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      typeName: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.referentialService.getTypes()
      .pipe(
        tap(types => this.types = types),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { name, typeName } = this.formGroup.getRawValue();

    this.referentialAdministrationService.createReference(name, typeName)
      .pipe(
        tap(() => this.router.navigate(['/administration/references/list'])),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
