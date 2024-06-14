import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AbstractControl, ValidationErrors } from '@angular/forms';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-administration-new-equipment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './administration-new-equipment-form.component.html',
  styleUrls: ['../../../../styles/form.css']
})
export class AdministrationNewEquipmentFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;

  references: any[] = [];
  rooms: any[] = [];

  get formControls() { return this.formGroup.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder, private referentialService: ReferentialService, private referentialAdministrationService: ReferentialAdministrationService) {
    const currentDate = new Date();
    const nextYearDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1)).toISOString().split('T')[0];
    
    this.formGroup = this.formBuilder.group({
      code: ['', [Validators.required, this.codeValidator]],
      referenceName: ['', [Validators.required]],
      stockageRoomName: ['', [Validators.required]],
      endOfLifeDate: [nextYearDate, [Validators.required, this.endOfLifeDateValidator]]
    });
  }

  ngOnInit() {
    this.referentialAdministrationService
      .getReferences()
      .pipe(
        tap((references) => {
          this.references = references;
        }),
        catchError(() => {
          alert('Failed to get references');
          return of();
        })
      )
      .subscribe();

    this.referentialService
      .getRooms()
      .pipe(
        tap((rooms) => {
          this.rooms = rooms;
        }),
        catchError(() => {
          alert('Failed to get rooms');
          return of();
        })
      )
      .subscribe();
  }

  codeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
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

    const { code, referenceName, stockageRoomName, endOfLifeDate } = this.formGroup.getRawValue();
    
    this.referentialAdministrationService
      .createEquipment(code, referenceName, stockageRoomName, endOfLifeDate)
      .pipe(
        tap(() => {
          this.router.navigate(['/administration/equipments/list']);
        }),
        catchError(() => {
          alert('Equipment creation failed');
          return of();
        })
      )
      .subscribe();
  }
}
