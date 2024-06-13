import { Component } from '@angular/core';

import { UserHomeTilesComponent } from '../../../partials/user-home-tiles/user-home-tiles.component';

@Component({
  selector: 'app-user-home-page',
  standalone: true,
  imports: [UserHomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['../../../../../styles/page.css']
})
export class UserHomePageComponent { }
