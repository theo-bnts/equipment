import { Component } from '@angular/core';
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
  styleUrls: ['./types-dropdown.component.css']
})
export class TypesDropdownComponent {
  types: any[] = [];

  constructor(private router: Router, private referentialService: ReferentialService) {}

  ngOnInit() {
    this.referentialService.getTypes().subscribe(
      data => this.types = data,
      error => console.error('Failed to load types', error)
    );
  }

  onTypeChange(selectedTypeName: string) {
    console.log('Type sélectionné:', selectedTypeName);
  }
}
