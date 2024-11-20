import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAsistenciaComponent } from './asistencia/add-asistencia/add-asistencia.component';
import { ListAsistenciaComponent } from './asistencia/list-asistencia/list-asistencia.component';
import { AddCalificacionComponent } from './registro/add-calificacion/add-calificacion.component';
import { ListCalificacionComponent } from './registro/list-calificacion/list-calificacion.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'asistencia/add', 
    component: AddAsistenciaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Profesor'] }
  },
  {
    path: 'asistencia/edit/:id',
     component: AddAsistenciaComponent,
     canActivate: [AuthGuard],
    data: { roles: ['Profesor'] }
    },
    {
      path: 'asistencia/view/:id',
        component: AddAsistenciaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['Profesor','Coordinador'] }
    },
  {path: 'asistencia/list', component: ListAsistenciaComponent},
  {
    path: 'calificacion/add',
     component: AddCalificacionComponent,
     canActivate: [AuthGuard],
    data: { roles: ['Profesor'] }
    },
  {path: 'calificacion/list', component: ListCalificacionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocenteRoutingModule { }
