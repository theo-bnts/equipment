import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{ datas: { value: string, expiration: string, user: any } }>(`${environment.API_BASE_URL}/account/token`, { user: { email_address: email, password } })
      .pipe(
        map(response => {
          localStorage.setItem('token', response.datas.value);
          localStorage.setItem('tokenExpiration', response.datas.expiration);
          return true;
        }),
        catchError(error => {
          console.error(error);
          return of(false);
        })
      );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.delete(`${environment.API_BASE_URL}/account/token`, { headers }).subscribe(
        () => {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiration');
        },
        error => console.error(error)
      );
    }
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('tokenExpiration');
    
    return !!token && !!expiration && new Date(expiration) > new Date();
  }

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<{ datas: any }>(`${environment.API_BASE_URL}/account/user`, { headers })
        .pipe(
          map(response => response.datas),
          catchError(error => {
            console.error(error);
            return of(null);
          })
        );
    } else {
      return of(null);
    }
  }
}