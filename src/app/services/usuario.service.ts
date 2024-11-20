import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private userLogged: any;
  private baseUrl = 'https://localhost:7238/api';

  constructor(){
    const storedUser = localStorage.getItem('user');
    if(storedUser){
      this.userLogged = JSON.parse(storedUser);
    }
  }

  setUserLogged(user: any): void{
    this.userLogged = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserLogged(): any{
    return this.userLogged;
  }
  
  resetUserLogged(): void{
    this.userLogged = null;
    localStorage.removeItem('user');
  }
}
