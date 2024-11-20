import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  private baseUrl = 'https://localhost:7238/api';
  constructor(private http: HttpClient) { }

  getCursos(): any {
    return this.http.get(`${this.baseUrl}/Curso`);
  }
}
