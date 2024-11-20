import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { DatepickerFormatOptions } from 'ngx-bootstrap/datepicker/models';
import { AlertService } from 'src/app/services/alert.service';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-add-asistencia',
  templateUrl: './add-asistencia.component.html',
  styleUrls: ['./add-asistencia.component.css']
})
export class AddAsistenciaComponent implements OnInit {
  editMode = false;
  recordId: string | null = null;
  user: any
  course: any = {
    nivel: { nombreNivel: '' },
    nombreCurso: ''
  };
  datePickerConfig: Partial<BsDatepickerConfig>;
  fechaRegistro: Date = new Date();
  students: any[] = [];
  constructor(
    private router: Router,
    private docenteService: DocenteService,
     private alertService: AlertService,
     private usuarioService: UsuarioService,
    private route: ActivatedRoute) {
      this.datePickerConfig = Object.assign({}, {
        dateInputFormat: 'DD/MM/YYYY',
        containerClass: 'theme-default'
      });

    }

  ngOnInit(): void {
    this.loadIdentity();
    this.getCourseData();
    this.route.paramMap.subscribe(params => {
      this.recordId = params.get('id');
      if (this.recordId) {
        this.editMode = true;
        this.getAttendanceByRecordId();
      }else{
        this.getStudentsByCourse();
      }
    });
  }

  loadIdentity(): void {
    this.user = this.usuarioService.getUserLogged();
  }

  getCourseData(): void {
    console.log(this.user.curso.cursoId);
    this.docenteService.getCourseById(this.user.curso.cursoId).subscribe((course: any[]) => {
      this.course = course;
      console.log(this.course);
    });
  }

  getStudentsByCourse(): void {
    this.docenteService.getStudentByCourse(this.user.curso.cursoId).subscribe((students: any[]) => {
      this.students = students;
      console.log(this.students);
    });
  }

  getAttendanceByRecordId(): void {
    this.docenteService.getAttendanceByRecordId(this.recordId).subscribe((attendance: any) => {
      console.log(attendance);
      this.course = {
        cursoId: attendance.record.curso.cursoId,
        nivel: { nombreNivel: attendance.record.nivel.nombreNivel },
        nombreCurso: attendance.record.curso.nombreCurso
      }
      this.fechaRegistro = attendance.record.fechaRegistro;
      this.students = attendance.asistencias;
      
    });
  }

  onSubmit(): void {
    if (this.editMode) {
      this.updateAttendance();
    } else {
      this.saveAttendance();
    }
  }

  saveAttendance() {
    const attendance = this.students.map(student => ({
      asistenciaId: 0,
      estudianteId: student.estudianteId,
      fecha: this.fechaRegistro,
      presente: student.presente !== undefined ? student.presente : false,
    }));

    const request = {
      recordId: 0,
      fechaRegistro: this.fechaRegistro,
      cursoId: this.course.cursoId,
      usuarioRegistro: this.user.usuarioId,
      asistencias: attendance
    }

    console.log(request);
    this.docenteService.postAttendance(request).subscribe(() => {
      this.alertService.showAlert('Éxito!', 'Asistencia guardada correctamente');
      this.router.navigate(['/docente/asistencia/list']);
    });
  }

  updateAttendance() {
    const attendance = this.students.map(student => ({
      asistenciaId: student.asistenciaId,
      estudianteId: student.estudianteId,
      fecha: this.fechaRegistro,
      presente: student.presente !== undefined ? student.presente : false,
    }));

    const request = {
      recordId: this.recordId,
      fechaRegistro: this.fechaRegistro,
      cursoId: this.course.cursoId,
      usuarioRegistro: this.user.usuarioId,
      asistencias: attendance
    }

    console.log(request);
    this.docenteService.putAttendance(request).subscribe(() => {
      this.alertService.showAlert('Éxito!', 'Asistencia actualizada correctamente');
      this.router.navigate(['/docente/asistencia/list']);
    });
  }

  confirmReturn(){
    this.alertService.showConfirmation('¿Estás seguro de que quieres cancelar la asistencia?','Todos los cambios se perderan', () => {
      this.cancelAttendance();
    });
  }

  cancelAttendance() {
    this.router.navigate(['/docente/asistencia/list']);
  }
}
