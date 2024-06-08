import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { ReferentialService } from '../../../services/referential.service';

@Component({
  selector: 'app-loanable-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loanable-list.component.html',
  styleUrls: ['./loanable-list.component.css']
})
export class LoanableListComponent implements OnInit {
  availableEquipments: any[] = [];

  constructor(private router: Router, private referentialService: ReferentialService) {}

  ngOnInit() {
    this.referentialService.getAvailableEquipments("Bureau").subscribe(
      data => this.availableEquipments = data,
      error => console.error('Failed to load available equipments', error)
    );
  }

  onLoanRequest(equipmentCode: string) {
    console.log('Demande de prêt pour l\'équipement:', equipmentCode);
  }
}
