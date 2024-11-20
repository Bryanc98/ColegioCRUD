import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  isCoordinador: boolean = false;
  user: any = {};
  students: any[] = [];
  filteredStudents: any[] = [];
  courses: any[] = [];
  niveles: any[] = [];
  searchName: string = '';
  selectedCourse: string = '';
  selectedGender: string = '';
  selectedLevel: string = '';
  parameter: any;

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private coordinadorService: CoordinadorService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadIdentity();
    this.loadStudents();
    if(this.isCoordinador) this.loadCourses();
  }

  loadIdentity(): void {
    this.user = this.usuarioService.getUserLogged();
    this.isCoordinador = this.user.role.roleId === 1;
    this.parameter = this.isCoordinador?this.user.nivel.nivelId: this.user.curso.cursoId;
  }

  loadStudents(): void {
    if(this.isCoordinador){
      this.coordinadorService.getStudentsByLevel(this.parameter).subscribe((students: any[]) => {
        this.students = students;
        this.applyFilters();
      });
    }else{
      this.coordinadorService.getStudentsByCourse(this.parameter).subscribe((students: any[]) => {
        this.students = students;
        this.applyFilters();
      });
    }
    
  }

  loadCourses(): void {
    this.coordinadorService.getCoursesByLevel(this.parameter).subscribe((courses: any[]) => {
      this.courses = courses;
    });
  }

  calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  applyFilters(): void {
    this.filteredStudents = this.students.filter(student => {
      return (
        (this.searchName === '' || student.nombre.toLowerCase().includes(this.searchName.toLowerCase())) &&
        (this.selectedCourse === '' || student.curso.cursoId.toString() === this.selectedCourse) &&
        (this.selectedGender === '' || student.sexo === this.selectedGender)
      );
    });
    this.totalItems = this.filteredStudents.length;
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
  }

  addStudent(): void {
    this.router.navigate(['/coordinador/estudiante/add']);
  }

  editStudent(id: string): void {
    this.router.navigate(['/coordinador/estudiante/edit', id]);
  }

  deleteStudent(id: string): void {
    this.alertService.showConfirmation('¿Estás seguro que deseas eliminar este estudiante?', 'Esta acción no se puede deshacer. Se perderan los registros de calificaciones y asistencia', () => {
      this.coordinadorService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    });
    
  }

}