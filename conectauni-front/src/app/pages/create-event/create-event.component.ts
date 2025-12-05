import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Certifica-te que este caminho está correto (../services se ambos estiverem dentro de pages)
import { EventService } from '../services/event.service'; 
import { ConectaEvent } from '../../models/interfaces';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.css'],
  standalone: false
})
export class CreateEventComponent {

  event: Partial<ConectaEvent> = {
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    location: '',
    budget: 0
  };

  constructor(private srv: EventService, private router: Router) {}

  save() {
    // 1. Validação
    if (!this.event.title || !this.event.startAt || !this.event.endAt) {
      alert('Por favor, preencha o título e as datas do evento!');
      return;
    }

    try {

      const payload = {
        ...this.event,
        startAt: new Date(this.event.startAt).toISOString(),
        endAt: new Date(this.event.endAt).toISOString()
      };

      this.srv.create(payload as ConectaEvent).subscribe({
        next: () => {
          alert('Evento criado com sucesso!');
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao criar evento: ' + (err.error?.message || 'Erro desconhecido'));
        }
      });
    } catch (e) {
      alert('Erro nas datas. Verifique se foram preenchidas corretamente.');
    }
  }
}