import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-loanable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loanable-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class LoanableListComponent implements OnChanges {
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

  onLoanRequest(equipmentCode: string) {
    this.router.navigate(['/loan/request', { equipmentCode }]);
  }
}
