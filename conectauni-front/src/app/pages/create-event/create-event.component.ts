import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.css'],
  standalone: false
})
export class CreateEventComponent {
  event = {
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    location: '',
    budget: 0
  };

  constructor(private srv: EventService, private router: Router) {}

  save() {
    if(!this.event.title || !this.event.startAt) { 
      alert('Preencha os campos obrigatórios!'); 
      return; 
    }
    const payload = {
      ...this.event,
      startAt: new Date(this.event.startAt).toISOString(),
      endAt: this.event.endAt ? new Date(this.event.endAt).toISOString() : ''
    };
    this.srv.create(payload).subscribe({
      next: () => { 
        alert('Evento criado!'); 
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => alert('Erro: ' + JSON.stringify(err.error))
    });
  }
}