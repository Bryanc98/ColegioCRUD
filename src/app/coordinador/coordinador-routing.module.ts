import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './estudiante/add/add.component';
import { ListComponent } from './estudiante/list/list.component';
import { AuthGuard } from '../guard/auth.guard';

const routes: Routes = [
  {
    path: 'estudiante/add',
     component: AddComponent,
      canActivate: [AuthGuard],
    data: { roles: ['Coordinador'] }
  },
  {
    path: 'estudiante/edit/:id',
     component: AddComponent,
     canActivate: [AuthGuard],
    data: { roles: ['Coordinador'] }
    },
  {path: 'estudiante/list',
     component: ListComponent,
      canActivate: [AuthGuard],
    data: { roles: ['Coordinador', 'Profesor'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoordinadorRoutingModule { }
