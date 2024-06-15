import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-new-type-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-type-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class AdministrationNewTypeFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  get formControls() { return this.formGroup.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder, private frontendService: FrontendService, private referentialAdministrationService: ReferentialAdministrationService) {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      organizationOnly: [false, [Validators.required]]
    });
  }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const { name, organizationOnly } = this.formGroup.getRawValue();
    
    this.referentialAdministrationService.createType(name, organizationOnly)
      .pipe(
        tap(() => this.router.navigate(['/administration/types/list'])),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
