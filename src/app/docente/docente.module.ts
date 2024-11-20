import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocenteRoutingModule } from './docente-routing.module';
import { AddAsistenciaComponent } from './asistencia/add-asistencia/add-asistencia.component';
import { FormsModule } from '@angular/forms';
import { ListAsistenciaComponent } from './asistencia/list-asistencia/list-asistencia.component';
import { AddCalificacionComponent } from './registro/add-calificacion/add-calificacion.component';
import { ListCalificacionComponent } from './registro/list-calificacion/list-calificacion.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {PaginationModule} from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AddAsistenciaComponent,
    ListAsistenciaComponent,
    AddCalificacionComponent,
    ListCalificacionComponent
  ],
  imports: [
    CommonModule,
    DocenteRoutingModule,
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ]
})
export class DocenteModule { }
