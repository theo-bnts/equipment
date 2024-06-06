import { Component } from '@angular/core';

import { ListComponent } from '../../../partials/loaned-list/loaned-list.component';

@Component({
  selector: 'app-loaned-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class LoanedListComponent { }
