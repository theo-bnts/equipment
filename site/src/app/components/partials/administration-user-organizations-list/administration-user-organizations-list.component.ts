import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import UserAdministrationService from '../../../services/user.administration.service';

@Component({
  selector: 'app-administration-user-organizations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-user-organizations-list.component.html',
  styleUrls: ['../../../../styles/table.css'],
})
export default class AdministrationUserOrganizationsListComponent
implements OnInit {
  organizations: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userAdministrationService: UserAdministrationService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const email = params.get('email');

      if (email === null) {
        this.router.navigate(['/administration/accounts/list']);
      }

      this.userAdministrationService
        .getUserOrganizations(email!)
        .pipe(
          tap((data) => {
            this.organizations = data;
          }),
          catchError((error) => FrontendService.catchError(error)),
        )
        .subscribe();
    });
  }
}
