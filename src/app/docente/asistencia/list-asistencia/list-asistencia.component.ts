import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { DocenteService } from 'src/app/services/docente.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-asistencia',
  templateUrl: './list-asistencia.component.html',
  styleUrls: ['./list-asistencia.component.css'],
})
export class ListAsistenciaComponent implements OnInit {
  isCoordinador: boolean = false;
  user: any;
  records: any[] = [];
  request: any = {
    cursoId: null,
    nivelId: null,
    recordId: null,
  };
  constructor(
    private docenteService: DocenteService,
    private usuarioService: UsuarioService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadIdentity();
    this.loadRecords(this.request);
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

  loadRecords(request: any): void {
    console.log(request);
    this.docenteService
      .getAttendanceRecords(request)
      .subscribe((records: any[]) => {
        console.log(records);
        this.records = records;
      });
  }

  deleteAttendance(recordId: any): void {
    this.alertService.showConfirmation(
      '¿Está seguro de eliminar el registro de asistencia?',
      'Una vez eliminados no podras recuperarlos',
      () => {
        this.docenteService.deleteAttendance(recordId).subscribe(() => {
          this.loadRecords(this.request);
        });
      }
    );
  }
}
