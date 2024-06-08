import { Component } from '@angular/core';

import { HomeTilesComponent } from '../../../partials/user-home-tiles/home-tiles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class UserHomePageComponent { }
