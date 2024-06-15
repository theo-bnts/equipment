import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export default class FrontendService {
  static catchError(error: any): Observable<never> {
    const message = error.error?.errors?.[0]?.msg || 'NOT_HANDLED_ERROR';
    alert(message);

    return of();
  }
}
