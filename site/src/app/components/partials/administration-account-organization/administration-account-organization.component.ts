import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { UserAdministrationService } from '../../../services/user.administration.service';

interface Organization {
  name: string;
}

@Component({
  selector: 'app-administration-account-organization',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-account-organization.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationAccountOrganizationComponent implements OnInit {
  organizations: Organization[] = [];

  constructor(
    private route: ActivatedRoute,
    private userAdministrationService: UserAdministrationService
  ) {}

  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
      const email = params.get('email');
      if (email) {
        this.loadOrganizations(email);
      }
    });
  }

  loadOrganizations(email: string) {
    this.userAdministrationService.getUserOrganizations(email)
      .pipe(
        tap(data => this.organizations = data),
        catchError(error => {
          console.error('Failed to load organizations', error);
          return of([]);
        })
      )
      .subscribe();
  }
}
