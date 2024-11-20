import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { CoordinadorService } from 'src/app/services/coordinador.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  studentForm: FormGroup;
  cursos: any[] = [];
  isEditMode = false;
  studentId: string | null = null;
  niveles: any[] = [];
  user: any;
  datePickerConfig: Partial<BsDatepickerConfig>;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private coordinadorService: CoordinadorService,
    private router: Router,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    this.studentForm = this.fb.group({
      estudianteId: [''],
      nombre: ['', [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]],
      sexo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      cursoId: ['', Validators.required]
    });
    this.datePickerConfig = Object.assign({}, {
      dateInputFormat: 'DD/MM/YYYY',
      containerClass: 'theme-default'
    });
  }

  ngOnInit(): void {
    this.loadIdentity();
    this.loadCourses();
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('id');
      if (this.studentId) {
        this.isEditMode = true;
        this.loadStudent(this.studentId);
      }
    });
  }

  loadIdentity(): void {
    this.user = this.usuarioService.getUserLogged();
  }

  loadCourses(): void {
    this.coordinadorService.getCoursesByLevel(this.user.nivel.nivelId).subscribe((courses: any[]) => {
      this.cursos = courses;
    });
  }

  loadStudent(id: string): void {
    this.coordinadorService.getStudentById(id).subscribe((student: any) => {
      console.log(student.fechaNacimiento);
      student.fechaNacimiento = new Date(student.fechaNacimiento);
      this.studentForm.patchValue(student);
    });
  }

  onSubmit(): void {
    if (this.studentForm.valid) {
      if (this.isEditMode) {
        console.log(this.studentForm.value);
        this.coordinadorService.updateStudent(this.studentForm.value).subscribe(() => {
          this.alertService.showAlert('Exito!', 'Estudiante actualizado exitosamente');
          this.router.navigate(['/coordinador/estudiante/list']);
        });
      } else {
        this.studentForm.patchValue({ estudianteId: 0});
        console.log(this.studentForm.value);
        this.coordinadorService.addStudent(this.studentForm.value).subscribe(() => {
          this.alertService.showAlert('Exito!', 'Estudiante registrado exitosamente');
          this.router.navigate(['/coordinador/estudiante/list']);
        });
      }
    }else{
      this.studentForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.router.navigate(['/coordinador/estudiante/list']);
  }
}
