import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-equipments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-equipments-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationEquipmentsListComponent implements OnInit {
  equipments: any[] = [];

  constructor(private frontendService: FrontendService, private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getEquipments()
      .pipe(
        tap(data => this.equipments = data),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe(() => this.sortEquipments());
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
    this.referentialAdministrationService.deleteEquipment(equipmentCode)
      .pipe(
        tap(() => location.reload()),
        catchError(error => this.frontendService.catchError(error)),
      )
      .subscribe();
  }
}
