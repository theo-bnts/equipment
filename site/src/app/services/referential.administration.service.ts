import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class ReferentialAdministrationService {
  constructor(private http: HttpClient) {}

  getLoans(): Observable<any> {
    const headers = AccountService.getAuthHeaders();
    
    return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/administration/loans`, { headers })
      .pipe(
        map(response => response.datas),
      );
  }

  deleteLoan(equipmentCode: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      equipment: { code: equipmentCode }
    };

    return this.http.request<void>('delete', `${environment.API_BASE_URL}/administration/loans`, { headers, body });
  }

  updateLoanState(equipmentCode: string, loanState: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      equipment: { code: equipmentCode },
      loan: {
        state: {
          name: loanState
        }
      }
    };

    return this.http.patch<void>(`${environment.API_BASE_URL}/administration/loans/last`, body, { headers });
  }

  createType(typeName: string, organizationOnly: boolean): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      type: {
        name: typeName,
        organization_only: organizationOnly
      }
    };

    return this.http.put<void>(`${environment.API_BASE_URL}/administration/types`, body, { headers });
  }

  deleteType(typeName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      type: { name: typeName }
    };

    return this.http.request<void>('delete', `${environment.API_BASE_URL}/administration/types`, { headers, body });
  }

  getReferences(): Observable<any> {
    const headers = AccountService.getAuthHeaders();
    
    return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/administration/references`, { headers })
      .pipe(
        map(response => response.datas),
      );
  }

  createReference(referenceName: string, typeName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      reference: {
        name: referenceName,
        type: {
          name: typeName
        }
      }
    };

    return this.http.put<void>(`${environment.API_BASE_URL}/administration/references`, body, { headers });
  }

  deleteReference(referenceName: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      reference: { name: referenceName }
    };

    return this.http.request<void>('delete', `${environment.API_BASE_URL}/administration/references`, { headers, body });
  }

  getEquipments(): Observable<any> {
    const headers = AccountService.getAuthHeaders();
    
    return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/administration/equipments`, { headers })
      .pipe(
        map(response => response.datas),
      );
  }

  createEquipment(code: string, referenceName: string, stockageRoomName: string, endOfLifeDate?: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      equipment: {
        code,
        reference: {
          name: referenceName
        },
        stockage_room: {
          name: stockageRoomName
        },
        end_of_life_date: endOfLifeDate
      }
    };

    return this.http.put<void>(`${environment.API_BASE_URL}/administration/equipments`, body, { headers });
  }

  deleteEquipment(equipmentCode: string): Observable<void> {
    const headers = AccountService.getAuthHeaders();
    
    const body = {
      equipment: { code: equipmentCode }
    };

    return this.http.request<void>('delete', `${environment.API_BASE_URL}/administration/equipments`, { headers, body });
  }
}
