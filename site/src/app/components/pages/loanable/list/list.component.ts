import { Component } from '@angular/core';

import { LoanableListComponent } from '../../../partials/loanable-list/loanable-list.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [LoanableListComponent],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class LoanableListPageComponent { }
