import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { CoordinadorService } from './coordinador.service';
import { AsistenciaService } from './asistencia.service';
import { CalificacionService } from './calificacion.service';
import { AsignaturaService } from './asignatura.service';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private baseUrl = 'https://localhost:7238/api';
  constructor(
    private http: HttpClient,
    private coordinadorService: CoordinadorService,
    private asistenciaService: AsistenciaService,
    private calificacionService: CalificacionService,
    private asignaturaService: AsignaturaService
  ) { }

  getAttendanceRecords(request: any): any {
    return this.asistenciaService.getAttendanceRecords(request);
  }

  getCourseById(id: string): any {
    return this.http.get(`${this.baseUrl}/Curso/${id}`).pipe(
      catchError((error) => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getStudentByCourse(cursoId: string): any {
    return this.coordinadorService.getStudentsByCourse(cursoId);
  }

  //Asitencias
  postAttendance(attendance: any): any {
    return this.asistenciaService.postAttendance(attendance);
  }

  putAttendance(attendance: any): any {
    return this.asistenciaService.putAttendance(attendance);
  }

  getAttendanceByRecordId(recordId: any): any {
    return this.asistenciaService.getAttendanceByRecordId(recordId);
  }

  deleteAttendance(recordId: any): any {
    return this.asistenciaService.deleteAttendance(recordId);
  }

  //Calificaciones
  getCalificaciones(request: any): any {
    return this.calificacionService.getCalificaciones(request);
  }

  getCalificacionByCursoPaginated(request: any): any {
    return this.calificacionService.getCalificacionByCursoPaginated(request);
  }

  postCalificacion(calificacion: any): any {
    return this.calificacionService.postCalificacion(calificacion);
  }

  //Asignaturas
  getAsignaturas(): any{
    return this.asignaturaService.getAsignaturas();
  }
  
}
