import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-calificacion',
  templateUrl: './add-calificacion.component.html',
  styleUrls: ['./add-calificacion.component.css']
})
export class AddCalificacionComponent implements OnInit {
  user: any;
  cursoId: any;
  request: any = {}; 
  datosCalificacion: any[] = [];
  calificaciones: any[] = [];
  pageNumber: number = 1;
  pageSize: number = 2;
  totalItems: number = 0;

  asignaturas: any[] = [];

  constructor(private usuarioService: UsuarioService, private docenteService: DocenteService, private calificacionService: CalificacionService) { }

  async ngOnInit() {
    this.loadIdentity();
    await this.getAsignaturas(); 
    this.getStudents(); 
  }
  
  getAsignaturas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.docenteService.getAsignaturas().subscribe(
        (data: any) => {
          this.asignaturas = data;
          console.log('Asignaturas:', this.asignaturas);
          resolve();
        },
        (error: any) => reject(error)
      );
    });
  }
  

  loadIdentity(): void {
    this.user = this.usuarioService.getUserLogged();
    if (this.user.curso) {
      this.cursoId = this.user.curso.cursoId;
      this.request = {
        cursoId: this.cursoId,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      };
    } 
  }

 

  getStudents() {
    this.docenteService.getCalificacionByCursoPaginated(this.request).subscribe(
      (data: any) => {
        
  
        this.datosCalificacion = data.map((student: any) => {
          const calificacionesExistentes = student.calificaciones || [];
          student.calificaciones = this.asignaturas.map(asignatura => {
            const calificacionExistente = calificacionesExistentes.find(
              (calificacion: any) =>
                calificacion.asignatura.asignaturaId === asignatura.asignaturaId
            );
            if (calificacionExistente) {
              return {
                calificacionId: calificacionExistente.calificacionId,
                asignaturaId: asignatura.asignaturaId,
                nombreAsignatura: asignatura.nombreAsignatura,
                nota: calificacionExistente.nota,
                literal: calificacionExistente.literal,
                fechaRegistro: calificacionExistente.fechaRegistro
              };
            }
            return {
              calificacionId: 0,
              asignaturaId: asignatura.asignaturaId,
              nombreAsignatura: asignatura.nombreAsignatura,
              nota: null,
              literal: '',
              fechaRegistro: new Date()
            };
          });
  
          return student;
        });

        this.totalItems = data[0].totalCount; 
      },
      (error: any) => {
        console.error('Error al cargar los estudiantes:', error);
      }
    );
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.request.pageNumber = this.pageNumber;
    this.getStudents();
  }
  
  
  


  updateLiteral(student: any, subject: any): void {
    const grade = subject.nota;
    if (grade >= 90) {
      subject.literal = 'A';
    } else if (grade >= 80) {
      subject.literal = 'B';
    } else if (grade >= 70) {
      subject.literal = 'C';
    } else {
      subject.literal = 'F';
    }
  }

  saveGrade(calificacion: any, datos: any): void {
    // Lógica para guardar la calificación
  }

  saveAllGrades(student: any): void {
    // Lógica para guardar todas las calificaciones del estudiante
    this.docenteService.postCalificacion(student).subscribe(
      (data: any) => {
        this.getStudents();
      });
  }
}