import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-administration-type-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-type-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationTypeListComponent implements OnInit {
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

  onTypeDelete(typeCode: string) {
    this.referentialAdministrationService.deleteType(typeCode)
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
