import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import environment from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export default class AccountService {
  constructor(private http: HttpClient) {}

  changePassword(
    email_address: string,
    old_password: string,
    new_password: string,
  ): Observable<void> {
    const body = {
      user: { email_address, old_password, password: new_password },
    };

    return this.http.post<void>(
      `${environment.API_BASE_URL}/account/password`,
      body,
    );
  }

  login(email: string, password: string): Observable<any> {
    const body = { user: { email_address: email, password } };

    return this.http
      .post<{
      datas: { value: string; expiration: string; user: any };
    }>(`${environment.API_BASE_URL}/account/token`, body)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.datas.value);
          localStorage.setItem('tokenExpiration', response.datas.expiration);
          return response.datas.user;
        }),
      );
  }

  logout(): Observable<void> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .delete<void>(`${environment.API_BASE_URL}/account/token`, { headers })
      .pipe(
        map(() => {
          AccountService.clearLocalToken();
        }),
      );
  }

  getUser(): Observable<any> {
    const headers = AccountService.getAuthHeaders();

    return this.http
      .get<{
      datas: any;
    }>(`${environment.API_BASE_URL}/account/user`, { headers })
      .pipe(map((response) => response.datas));
  }

  static getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  static isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');

    return !!token && !!expiration && new Date(expiration) > new Date();
  }

  static clearLocalToken(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }
}
