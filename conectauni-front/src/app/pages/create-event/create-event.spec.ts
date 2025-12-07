import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../services/event.service';
import { ConectaEvent } from '../../models/interfaces';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.html',
  styleUrls: ['./create-event.css'],
  standalone: false
})
export class CreateEventComponent implements OnInit {

  event: Partial<ConectaEvent> = {
    title: '',
    description: '',
    startAt: '',
    endAt: '',
    location: '',
    budget: 0
  };

  isEditing = false;
  eventId: number | null = null;

  constructor(
    private srv: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Verifica se a URL tem um ID (ex: /edit-event/1)
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.eventId = Number(id);
      this.loadEvent(this.eventId);
    }
  }

  loadEvent(id: number) {
    this.srv.getById(id).subscribe({
      next: (res) => {
        this.event = res;
        if(this.event.startAt) this.event.startAt = this.event.startAt.substring(0, 16);
        if(this.event.endAt) this.event.endAt = this.event.endAt.substring(0, 16);
      },
      error: () => {
        alert('Erro ao carregar o evento.');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  save() {
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

      if (this.isEditing && this.eventId) {
        // Atualização (PUT)
        this.srv.update(this.eventId, payload as ConectaEvent).subscribe({
          next: () => {
            alert('Evento atualizado com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => alert('Erro ao atualizar: ' + (err.error?.message || 'Erro desconhecido'))
        });
      } else {
        this.srv.create(payload as ConectaEvent).subscribe({
          next: () => {
            alert('Evento criado com sucesso!');
            this.router.navigate(['/dashboard']);
          },
          error: (err) => alert('Erro ao criar evento: ' + (err.error?.message || 'Erro desconhecido'))
        });
      }

    } catch (e) {
      alert('Erro nas datas. Verifique se foram preenchidas corretamente.');
    }
  }
}