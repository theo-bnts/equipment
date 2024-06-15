import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserAdministrationService } from '../../../services/user.administration.service';
import { FrontendService } from '../../../services/frontend.service';

@Component({
  selector: 'app-administration-user-organizations-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './administration-user-organizations-list.component.html',
  styleUrls: ['../../../../styles/table.css']
})
export class AdministrationUserOrganizationsListComponent implements OnInit {
  organizations: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private frontendService: FrontendService, 
    private userAdministrationService: UserAdministrationService
  ) {}

  ngOnInit() {
    this.route.queryParamMap
      .subscribe(params => {
        const email = params.get('email');
        
        if (email === null) {
          this.router.navigate(['/administration/accounts/list']);
        }

        this.userAdministrationService.getUserOrganizations(email!)
          .pipe(
            tap(data => this.organizations = data),
            catchError(error => this.frontendService.catchError(error)),
          )
          .subscribe();
        });
  }
}
