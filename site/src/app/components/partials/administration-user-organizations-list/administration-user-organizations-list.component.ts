import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import FrontendService from '../../../services/frontend.service';
import ReferentialAdministrationService from '../../../services/referential.administration.service';
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
  availableOrganizations: any[] = [];
  selectedOrganization: string = '';
  submitted: boolean = false;
  userEmail: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userAdministrationService: UserAdministrationService,
    private referentialAdministrationService: ReferentialAdministrationService,
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const email = params.get('email');
      this.userEmail = email;

      if (email === null) {
        this.router.navigate(['/administration/accounts/list']);
        return;
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

      this.referentialAdministrationService
        .getOrganizations()
        .pipe(
          tap((data) => (this.availableOrganizations = data)),
          catchError((error) => {
            console.error('Failed to load available organizations', error);
            return of();
          }),
        )
        .subscribe();
    });
  }

  onOrganizationDelete(organizationName: string) {
    this.userAdministrationService
      .removeUserFromOrganization(
        this.route.snapshot.queryParamMap.get('email')!,
        organizationName,
      )
      .pipe(
        tap(
          () => (this.organizations = this.organizations.filter(
            (organization) => organization.name !== organizationName,
          )),
        ),
        catchError((error) => {
          console.error('Failed to delete organization', error);
          return of();
        }),
      )
      .subscribe();
  }

  navigateTo(route: string) {
    this.router.navigate([route], {
      queryParams: { email: this.userEmail },
    });
  }
}
