import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { ReferentialAdministrationService } from '../../../services/referential.administration.service';

@Component({
  selector: 'app-administration-equipment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-equipment-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationEquipmentListComponent implements OnInit {
  equipments: any[] = [];

  constructor(private referentialAdministrationService: ReferentialAdministrationService) {}

  ngOnInit() {
    this.referentialAdministrationService.getEquipments()
      .pipe(
        tap(data => this.equipments = data),
        catchError(() => {
          alert('Failed to load equipments');
          return of();
        })
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
        catchError(() => {
          alert('Failed to delete equipment');
          return of();
        })
      )
      .subscribe();
  }
}
