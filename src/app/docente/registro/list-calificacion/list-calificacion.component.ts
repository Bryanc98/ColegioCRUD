import { Component, OnInit } from '@angular/core';
import { AsignaturaService } from 'src/app/services/asignatura.service';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-calificacion',
  templateUrl: './list-calificacion.component.html',
  styleUrls: ['./list-calificacion.component.css']
})
export class ListCalificacionComponent implements OnInit {
  user: any;
  calificaciones: any[] = [];
  calificacionesFiltered: any[] = [];
  request: any = {};

  asignaturas: any[] = [];
  courses: any[] = [];
  isCoordinador: boolean = false;
  searchName: string = '';
  selectedCourse: string = '';
  selectedAsignatura: string = '';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(private docenteService: DocenteService,
     private usuarioService: UsuarioService,
      private coordinadorService: CoordinadorService,
    private asignaturaService: AsignaturaService ) { }

  ngOnInit(): void {
    this.loadIdentity();
    this.getCalificaciones();
    this.loadAsignaturas();
    if(this.isCoordinador) this.loadCourses();

  }

  loadIdentity(): void {
    this.user = this.usuarioService.getUserLogged();
    this.isCoordinador = this.user.role.roleId === 1;
    if (this.user.curso) {
      this.request.cursoId = this.user.curso.cursoId;
    } else {
      this.request.nivelId = this.user.nivel.nivelId;
    }
  }

  loadAsignaturas(): void {
    this.asignaturaService.getAsignaturas().subscribe((asignaturas: any[]) => {
      this.asignaturas = asignaturas;
    });
  }

  loadCourses(): void {
    this.coordinadorService.getCoursesByLevel(this.request.nivelId).subscribe((courses: any[]) => {
      this.courses = courses;
    });
  }

  getCalificaciones(): void{
    this.docenteService.getCalificaciones(this.request).subscribe(
      (data: any) => {
        console.log(data);
        this.calificaciones = data;
        this.applyFilters();
      }
    );
  }

  applyFilters(): void {
    this.calificacionesFiltered = this.calificaciones.filter(calificaciones => {
      console.log(calificaciones);
      return (
        (this.searchName === '' || calificaciones.estudiante.nombre.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (this.selectedCourse === '' || calificaciones.curso.cursoId.toString() === this.selectedCourse) &&
        (this.selectedAsignatura === '' || calificaciones.asignatura.asignaturaId.toString() === this.selectedAsignatura)
      );
    });
    this.totalItems = this.calificacionesFiltered.length;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }

}
