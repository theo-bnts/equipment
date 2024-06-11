import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-references-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-references-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationReferencesListComponent implements OnInit {
  references: any[] = [];

  constructor(private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getReferences()
      .pipe(
        tap(data => this.references = data),
        catchError(() => {
          alert('Failed to load references');
          return of();
        })
      )
      .subscribe();
  }

  onReferenceDelete(referenceCode: string) {
    this.referentialAdministrationService.deleteReference(referenceCode)
      .pipe(
        tap(() => location.reload()),
        catchError(() => {
          alert('Failed to delete reference');
          return of();
        })
      )
      .subscribe();
  }
}
