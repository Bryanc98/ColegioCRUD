import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {
  private baseUrl = 'https://localhost:7238/api';

  constructor(private http: HttpClient) { }

  getStudentsByCourse(cursoId: string): any {
    return this.http.get(`${this.baseUrl}/Estudiante/Curso/${cursoId}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getStudentsByLevel(nivelId: string): any {
    return this.http.get(`${this.baseUrl}/Estudiante/Nivel/${nivelId}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getStudentById(id: string): any {
    return this.http.get(`${this.baseUrl}/Estudiante/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getCoursesByLevel(nivelId: string): any {
    return this.http.get(`${this.baseUrl}/Curso/Nivel/${nivelId}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  addStudent(student: any): any {
    return this.http.post(`${this.baseUrl}/Estudiante`, student).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  updateStudent(student: any): any {
    return this.http.put(`${this.baseUrl}/Estudiante`, student).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  deleteStudent(id: string): any {
    return this.http.delete(`${this.baseUrl}/Estudiante/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }
}
