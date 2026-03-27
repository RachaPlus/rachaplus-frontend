import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
}

export interface RegisterResponse {
  id: string;
  nome: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);

  login(email: string, senha: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/api/v1/auth/login', { email, senha });
  }

  register(nome: string, email: string, senha: string): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>('/api/v1/users', { nome, email, senha });
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
