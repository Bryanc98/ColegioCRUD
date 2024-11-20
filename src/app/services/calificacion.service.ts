import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {
  private baseUrl = 'https://localhost:7238/api';
  constructor(private http: HttpClient) { }

  getCalificaciones(request: any) {
    let params = new HttpParams();
    if (request.cursoId) {
      params = params.append('cursoId', request.cursoId);
    }
    if (request.nivelId) {
      params = params.append('nivelId', request.nivelId);
    }

    return this.http.get(`${this.baseUrl}/Calificacion`, { params }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getCalificacionByCursoPaginated(request: any) {
    let params = new HttpParams();
    if (request.cursoId) {
      params = params.append('cursoId', request.cursoId);
    }
    if (request.pageNumber) {
      params = params.append('pageNumber', request.pageNumber);
    }
    if (request.pageSize) {
      params = params.append('pageSize', request.pageSize);
    }

    return this.http.get(`${this.baseUrl}/Calificacion/Estudiante`, { params }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  postCalificacion(calificacion: any){
    return this.http.post(`${this.baseUrl}/Calificacion`, calificacion).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
