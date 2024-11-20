import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: string | null = '';
  userData: any;
  isCoordinator = false;

  constructor(private usuarioService: UsuarioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userData = this.usuarioService.getUserLogged();
    this.role = this.userData.role.roleName;
    if (this.role === 'Coordinador') {
      this.isCoordinator = true;
    }
  }

  logOut(): void {
    this.authService.logOut();
  }
}
