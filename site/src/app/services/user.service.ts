import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getOrganizations(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http.get<{ datas: any }>(
      `${environment.API_BASE_URL}/user/organizations`,{ headers })
      .pipe(
        map(response => response.datas),
      );
  }

  getLoans(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/user/loans`, { headers })
      .pipe(
        map(response => response.datas),
      );
  }

  createLoan(equipmentCode: string, organizationName: string, roomName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      equipment: { code: equipmentCode },
      organization: { name: organizationName },
      room: { name: roomName }
    };

    return this.http.put<void>(`${environment.API_BASE_URL}/user/loans`, body, { headers })
  }

  updateLoan(equipmentCode: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    const body = {
      equipment: { code: equipmentCode }
    };

    return this.http.patch<void>(`${environment.API_BASE_URL}/user/loans`, body, { headers })
  }
}
