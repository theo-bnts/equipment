import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-user-available-equipments-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-available-equipments-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class UserAvailableEquipmentsListComponent implements OnChanges {
  @Input() selectedType: string | undefined;
  availableEquipments: any[] = [];

  constructor(private router: Router, private referentialService: ReferentialService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedType'] && changes['selectedType'].currentValue) {
      this.loadEquipments(changes['selectedType'].currentValue);
    }
  }

  loadEquipments(type: string) {
    this.referentialService.getAvailableEquipments(type).subscribe(
      data => this.availableEquipments = data,
      error => console.error('Failed to load available equipments', error)
    );
  }

  onLoanRequest(organizationOnly: boolean, equipmentCode: string) {
    this.router.navigate(['/user/loans/request'], { queryParams: { organizationOnly, equipmentCode } });
  }
}
