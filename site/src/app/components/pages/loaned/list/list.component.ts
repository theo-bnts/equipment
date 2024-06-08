import { Component } from '@angular/core';

import { LoanedListComponent } from '../../../partials/loaned-list/loaned-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [LoanedListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class LoanedListPageComponent { }
