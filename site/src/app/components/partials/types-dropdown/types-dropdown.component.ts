import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

import ReferentialService from '../../../services/referential.service';
import FrontendService from '../../../services/frontend.service';

@Component({
  selector: 'app-types-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './types-dropdown.component.html',
  styleUrls: ['../../../../styles/form.css'],
})
export default class TypesDropdownComponent {
  types: any[] = [];

  @Output() typeSelected = new EventEmitter<string>();

  constructor(private referentialService: ReferentialService) {}

  ngOnInit() {
    this.referentialService
      .getTypes()
      .pipe(
        tap((data) => {
          this.types = data;
          this.typeSelected.emit(this.types[0].name);
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onTypeChange(selectedTypeName: string) {
    this.typeSelected.emit(selectedTypeName);
  }
}
