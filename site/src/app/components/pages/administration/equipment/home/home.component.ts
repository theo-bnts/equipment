import { Component } from '@angular/core';

import { AdministrationEquipmentHomeTilesComponent } from '../../../../partials/administration-equipment-home-tiles/administration-equipment-home-tiles.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdministrationEquipmentHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationEquipmentHomePageComponent { }
