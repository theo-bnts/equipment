import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import environment from '../../environments/environment';
import AccountService from './account.service';

@Injectable({
  providedIn: 'root',
})
export default class AccountAdministrationService {
  constructor(private http: HttpClient) {}

  getAccounts(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/administration/accounts`, { headers })
      .pipe(map((response) => response.datas));
  }

  createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roleName: string,
  ): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      user: {
        email_address: email,
        password,
        first_name: firstName,
        last_name: lastName,
        role: {
          name: roleName,
        },
      },
    };

    return this.http.put<void>(
      `${environment.API_BASE_URL}/administration/accounts`,
      body,
      { headers },
    );
  }

  deleteAccount(email: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      user: {
        email_address: email,
      },
    };

    return this.http.delete<void>(
      `${environment.API_BASE_URL}/administration/accounts`,
      { headers, body },
    );
  }
}
