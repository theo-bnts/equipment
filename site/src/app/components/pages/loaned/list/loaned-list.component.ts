import { Component } from '@angular/core';

import { ListComponent } from '../../../partials/list/list.component';

@Component({
  selector: 'app-loaned-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './loaned-list.component.html',
  styleUrls: ['./loaned-list.component.css']
})
export class LoanedListComponent { }
