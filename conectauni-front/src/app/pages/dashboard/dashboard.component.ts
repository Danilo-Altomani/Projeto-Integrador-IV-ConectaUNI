import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { ConectaEvent } from '../../models/interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  events: ConectaEvent[] = [];
  isOrganizer = false;
  showInviteModal = false;
  selectedEventTitle = '';
  qrCodeUrl = '';

  constructor(private eventService: EventService, private authService: AuthService) {}

  ngOnInit() {
    this.isOrganizer = this.authService.isOrganizer();
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.list().subscribe({
      next: (res: any) => {
        this.events = res.content || res;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos', err);
      }
    });
  }
  deleteEvent(ev: ConectaEvent) {
    if (!confirm(`Tem certeza que deseja excluir o evento "${ev.title}"?`)) {
      return;
    }

    if (ev.id) {
      this.eventService.delete(ev.id).subscribe({
        next: () => {
          alert('Evento excluído com sucesso!');

          this.events = this.events.filter(e => e.id !== ev.id);
        },
        error: () => alert('Erro ao excluir evento.')
      });
    }
  }

  openInvite(ev: ConectaEvent) {
    this.selectedEventTitle = ev.title;
    const data = `CONVITE: ${ev.title} - Local: ${ev.location}`;
    this.qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    this.showInviteModal = true;
  }

  closeModal() {
    this.showInviteModal = false;
  }
}