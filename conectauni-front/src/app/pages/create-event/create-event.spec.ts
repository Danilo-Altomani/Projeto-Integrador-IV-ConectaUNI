import { Component } from '@angular/core';
import { EventService } from '../../services/event.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-create-event', templateUrl: './create-event.component.html' })
export class CreateEventComponent {
  event = { title: '', description: '', startAt: '', endAt: '', location: '', budget: 0 };
  constructor(private srv: EventService, private router: Router) {}

  save() {
    if(!this.event.title || !this.event.startAt) { alert('Preencha o título e datas!'); return; }
    try {
      const payload = {
        ...this.event,
        startAt: new Date(this.event.startAt).toISOString(),
        endAt: new Date(this.event.endAt).toISOString()
      };
      this.srv.create(payload).subscribe({
        next: () => { alert('Evento criado!'); this.router.navigate(['/dashboard']); },
        error: (err) => alert('Erro: ' + JSON.stringify(err.error))
      });
    } catch (e) { alert('Verifique as datas!'); }
  }
}