import { Component } from '@angular/core';

import { AdministrationHomeTilesComponent } from '../../../partials/administration-home-tiles/administration-home-tiles.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdministrationHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class AdministrationHomePageComponent { }
