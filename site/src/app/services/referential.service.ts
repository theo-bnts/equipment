import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import environment from '../../environments/environment';
import AccountService from './account.service';

@Injectable({
  providedIn: 'root',
})
export default class ReferentialService {
  constructor(private http: HttpClient) {}

  getTypes(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/referential/types`, { headers })
      .pipe(map((response) => response.datas));
  }

  getAvailableEquipments(equipmentTypeName: string): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(
      `${environment.API_BASE_URL}/referential/equipments/available?equipment_type_name=${encodeURIComponent(equipmentTypeName)}`,
      { headers },
    )
      .pipe(map((response) => response.datas));
  }

  getRooms(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/referential/rooms`, { headers })
      .pipe(map((response) => response.datas));
  }
}
