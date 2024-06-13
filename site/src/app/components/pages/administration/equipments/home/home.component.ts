import { Component } from '@angular/core';

import { AdministrationEquipmentsHomeTilesComponent } from '../../../../partials/administration-equipments-home-tiles/administration-equipments-home-tiles.component';
@Component({
  selector: 'app-administration-equipments-home-page',
  standalone: true,
  imports: [AdministrationEquipmentsHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../../styles/page.css']
})
export class AdministrationEquipmentsHomePageComponent { }
