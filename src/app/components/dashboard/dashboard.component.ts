import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;
  role: string = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.userData = this.usuarioService.getUserLogged();
    this.role = this.userData.role.roleName;
  }
}
