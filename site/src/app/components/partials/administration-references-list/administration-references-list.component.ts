import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-references-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-references-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationReferencesListComponent implements OnInit {
  references: any[] = [];

  constructor(private frontendService: FrontendService, private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getReferences()
      .pipe(
        tap(data => this.references = data),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }

  onReferenceDelete(referenceName: string) {
    this.referentialAdministrationService.deleteReference(referenceName)
      .pipe(
        tap(() => location.reload()),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
