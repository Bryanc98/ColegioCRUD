import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'https://localhost:7238/api';
  private token: string = '';
  private authStatus = new BehaviorSubject<boolean>(false);
  usserLogged: any;
  constructor(private http: HttpClient, private router: Router, private usuarioService: UsuarioService) {

   }

   login(data: any): Observable<any>{
     return this.http.post(`${this.baseUrl}/Auth/Login`,data).pipe(
      tap((response: any) => {
        this.usuarioService.setUserLogged(response);
        this.token = response.token;
        localStorage.setItem('token', this.token);
        localStorage.setItem('role', response.role.roleName);
        this.authStatus.next(true);
   })
  );
   }

   logOut(): void{
    this.usuarioService.resetUserLogged();
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authStatus.next(false);
    this.router.navigate(['/login']);
   }

   isAuthenticated(): boolean{
    return !!localStorage.getItem('token');
   }

   getToken(): string | null {
     return this.token || localStorage.getItem('token');
   }

   getUserRole(): string | null {
      return localStorage.getItem('role');
    }
}
