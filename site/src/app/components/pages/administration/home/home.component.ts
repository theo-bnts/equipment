import { Component } from '@angular/core';

import { AdminHomeTilesComponent } from '../../../partials/admin-home-tiles/home-tiles.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AdminHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class AdminHomePageComponent { }
