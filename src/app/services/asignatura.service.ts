import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsignaturaService {

  private baseUrl = 'https://localhost:7238/api';
  constructor(private http: HttpClient) { }

  getAsignaturas(): any {
    return this.http.get(`${this.baseUrl}/Asignatura`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
