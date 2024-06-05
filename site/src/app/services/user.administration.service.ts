import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdministrationService {
  constructor(private http: HttpClient) {}

  getUserOrganizations(userEmailAddress: string): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/administration/users/organizations?user_email_address=${encodeURIComponent(userEmailAddress)}`, { headers })
      .pipe(
        map(response => response.datas),
      );
  }

  addUserToOrganization(userEmailAddress: string, organizationName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      user: {
        email_address: userEmailAddress
      },
      organization: {
        name: organizationName
      }
    };

    return this.http.put<void>(`${environment.API_BASE_URL}/administration/users/organizations`, body, { headers });
  }

  removeUserFromOrganization(userEmailAddress: string, organizationName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      user: {
        email_address: userEmailAddress
      },
      organization: {
        name: organizationName
      }
    };

    return this.http.delete<void>(`${environment.API_BASE_URL}/administration/users/organizations`, { headers, body });
  }
}
