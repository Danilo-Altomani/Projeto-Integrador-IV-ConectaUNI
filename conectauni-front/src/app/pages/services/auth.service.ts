import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthRequest, AuthResponse } from '../../models/interfaces'; 

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/auth';
  
  constructor(private http: HttpClient) {}

  login(creds: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, creds)
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(data: AuthRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/register`, data);
  }

  getToken() { return localStorage.getItem('token'); }
  
  logout() { localStorage.removeItem('token'); }
}