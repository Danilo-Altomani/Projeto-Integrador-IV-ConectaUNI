import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { AuthService } from './auth.service';
import { ConectaEvent } from '../../models/interfaces';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly API_URL = 'http://localhost:8080/events';
  
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders() {

    return { 
      headers: new HttpHeaders({ 
        'Authorization': `Bearer ${this.auth.getToken()}`,
        'Content-Type': 'application/json' 
      }) 
    };
  }
  
  list(): Observable<ConectaEvent[]> { 
    return this.http.get<ConectaEvent[]>(this.API_URL, this.getHeaders()); 
  }
  
  create(ev: ConectaEvent): Observable<ConectaEvent> { 
    return this.http.post<ConectaEvent>(this.API_URL, ev, this.getHeaders()); 
  }
}