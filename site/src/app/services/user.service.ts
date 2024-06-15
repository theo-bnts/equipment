import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import environment from '../../environments/environment';
import AccountService from './account.service';

@Injectable({
  providedIn: 'root',
})
export default class UserService {
  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/user/organizations`, { headers })
      .pipe(map((response) => response.datas));
  }

  getLoans(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/user/loans`, { headers })
      .pipe(map((response) => response.datas));
  }

  createLoanRequest(
    equipmentCode: string,
    organizationName: string | null,
    roomName: string,
  ): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    let body;

    if (organizationName !== null) {
      body = {
        equipment: { code: equipmentCode },
        organization: { name: organizationName },
        room: { name: roomName },
      };
    } else {
      body = {
        equipment: { code: equipmentCode },
        room: { name: roomName },
      };
    }

    return this.http.put<void>(`${environment.API_BASE_URL}/user/loans`, body, {
      headers,
    });
  }

  returnLoan(equipmentCode: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      equipment: { code: equipmentCode },
    };

    return this.http.patch<void>(
      `${environment.API_BASE_URL}/user/loans`,
      body,
      { headers },
    );
  }
}
