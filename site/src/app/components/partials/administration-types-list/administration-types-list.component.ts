import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-administration-types-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-types-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationTypesListComponent implements OnInit {
  types: any[] = [];

  constructor(private referentialAdministrationService: ReferentialAdministrationService, private referentialService: ReferentialService) {}

  ngOnInit() {
    this.referentialService.getTypes()
      .pipe(
        tap(data => this.types = data),
        catchError(() => {
          alert('Failed to load types');
          return of();
        })
      )
      .subscribe();
  }

  onTypeDelete(typeName: string) {
    this.referentialAdministrationService.deleteType(typeName)
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to delete type');
          return of();
        })
      )
      .subscribe();
  }
}
