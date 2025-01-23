import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-equipments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-equipments-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class AdministrationEquipmentsListComponent implements OnInit {
  equipments: any[] = [];

  constructor(
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {}

  ngOnInit() {
    this.referentialAdministrationService
      .getEquipments()
      .pipe(
        tap((data) => {
          this.equipments = data;
          this.sortEquipments();
        }),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }

  sortEquipments() {
    this.equipments.sort((a, b) => {
      const dateA = new Date(a.end_of_life_date);
      const dateB = new Date(b.end_of_life_date);
      return dateA.getTime() - dateB.getTime();
    });
  }

  isEndOfLifeExceeded(endOfLifeDate: string): boolean {
    const currentDate = new Date();
    const endOfLifeDateObj = new Date(endOfLifeDate);
    return endOfLifeDateObj < currentDate;
  }

  onEquipmentDelete(equipmentCode: string) {
    this.referentialAdministrationService
      .deleteEquipment(equipmentCode)
      .pipe(
        tap(() => window.location.reload()),
        catchError((error) => FrontendService.catchError(error)),
      )
      .subscribe();
  }
}
