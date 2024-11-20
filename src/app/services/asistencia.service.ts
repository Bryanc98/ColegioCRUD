import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  private baseUrl = 'https://localhost:7238/api';
  constructor(private http: HttpClient, private alertService: AlertService) { }

  postAttendance(attendance: any): any {
    return this.http.post(`${this.baseUrl}/Asistencia`, attendance).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        this.alertService.showAlert('Error!' , error.error, 'error');
        return throwError(() => error);
      })
    );
  }

  putAttendance(attendance: any): any {
    return this.http.put(`${this.baseUrl}/Asistencia`, attendance).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }


  getAttendanceRecords(request: any): any {
    let params = new HttpParams();
    if (request.cursoId) {
      params = params.append('cursoId', request.cursoId);
    }
    if (request.nivelId) {
      params = params.append('nivelId', request.nivelId);
    }
    if (request.recordId) {
      params = params.append('recordId', request.recordId);
    }

    return this.http.get(`${this.baseUrl}/Asistencia/Record`, { params }).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getAttendanceByRecordId(recordId: any): any {
    return this.http.get(`${this.baseUrl}/Asistencia/${recordId}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  deleteAttendance(recordId: any): any {
    return this.http.delete(`${this.baseUrl}/Asistencia/${recordId}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
