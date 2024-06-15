import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

import ReferentialAdministrationService from '../../../services/referential.administration.service';
import ReferentialService from '../../../services/referential.service';
import FrontendService from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-types-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-types-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class AdministrationTypesListComponent implements OnInit {
  types: any[] = [];

  constructor(
    private referentialAdministrationService: ReferentialAdministrationService,
    private referentialService: ReferentialService,
  ) {}

  ngOnInit() {
    this.referentialService
      .getTypes()
      .pipe(
        tap((data) => {
          this.types = data;
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  onTypeDelete(typeName: string) {
    this.referentialAdministrationService
      .deleteType(typeName)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
