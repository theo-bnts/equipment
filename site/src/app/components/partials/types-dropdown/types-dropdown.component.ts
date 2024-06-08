import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-types-dropdown',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './types-dropdown.component.html',
  styleUrls: ['../../../../styles/dropdown.css']
})
export class TypesDropdownComponent {
  types: any[] = [];
  @Output() typeSelected = new EventEmitter<string>();

  constructor(private router: Router, private referentialService: ReferentialService) {}

  ngOnInit() {
    this.referentialService.getTypes().subscribe(
      data => {
        this.types = data;
        this.typeSelected.emit(this.types[0].name);
      },
      error => console.error('Failed to load types', error)
    );
  }

  onTypeChange(selectedTypeName: string) {
    this.typeSelected.emit(selectedTypeName);
  }
}
