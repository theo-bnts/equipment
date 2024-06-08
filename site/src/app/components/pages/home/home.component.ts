import { Component } from '@angular/core';

import { HomeTilesComponent } from '../../partials/home-tiles/home-tiles.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeTilesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent { }
