import { Component } from '@angular/core';

import AdministrationHomeTilesComponent from '../../../partials/administration-home-tiles/administration-home-tiles.component';

@Component({
  selector: 'app-administration-home-page',
  standalone: true,
  imports: [AdministrationHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../styles/page.css'],
})
export default class AdministrationHomePageComponent {}
