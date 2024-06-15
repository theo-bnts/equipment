import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';
import ReferentialService from '../../../services/referential.service';

@Component({
  selector: 'app-administration-new-equipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-equipment-form.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class AdministrationNewEquipmentFormComponent implements OnInit {
  formGroup: FormGroup;

  submitted = false;

  references: any[] = [];

  rooms: any[] = [];

  get formControls() {
    return this.formGroup.controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private referentialService: ReferentialService,
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {
    const currentDate = new Date();
    const nextYearDate = new Date(
      currentDate.setFullYear(currentDate.getFullYear() + 1),
    )
      .toISOString()
      .split('T')[0];

    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required, this.codeValidator]],
      referenceName: ['', [Validators.required]],
      stockageRoomName: ['', [Validators.required]],
      endOfLifeDate: [
        nextYearDate,
        [Validators.required, this.endOfLifeDateValidator],
      ],
    });
  }

  ngOnInit() {
    this.referentialAdministrationService
      .getReferences()
      .pipe(
        tap((references) => {
          this.references = references;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();

    this.referentialService
      .getRooms()
      .pipe(
        tap((rooms) => {
          this.rooms = rooms;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  codeValidator(control: AbstractControl): ValidationErrors | null {
    const { value } = control;
    const valid = /^FR\d{5}$/.test(value);
    return valid ? null : { format: true };
  }

  endOfLifeDateValidator(control: AbstractControl): ValidationErrors | null {
    const currentDate = new Date();
    const value = new Date(control.value);
    const valid = value > currentDate;
    return valid ? null : { inPastOrPresent: true };
  }

  onSubmit() {
    this.submitted = true;

    if (this.formGroup.invalid) {
      return;
    }

    const {
      code, referenceName, stockageRoomName, endOfLifeDate,
    } = this.formGroup.getRawValue();

    this.referentialAdministrationService
      .createEquipment(code, referenceName, stockageRoomName, endOfLifeDate)
      .pipe(
        tap(() => this.router.navigate(['/administration/equipments/list'])),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
