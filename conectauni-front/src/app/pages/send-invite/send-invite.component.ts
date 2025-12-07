import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { ConectaEvent } from '../../models/interfaces';

@Component({
  selector: 'app-send-invite',
  template: `
    <div style="background: white; padding: 40px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
      <h2 style="margin-top: 0; color: #333; margin-bottom: 25px;">📤 Enviar Convite</h2>
      
      <div *ngIf="loading">Carregando eventos...</div>

      <div *ngIf="!loading && events.length === 0" style="text-align: center; color: #777;">
        <p>Você precisa criar um evento antes de convidar alguém.</p>
        <button routerLink="/create-event" style="padding: 10px 20px; background: #1E88E5; color: white; border: none; border-radius: 6px; cursor: pointer;">
          Criar Evento Agora
        </button>
      </div>

      <form *ngIf="events.length > 0" (ngSubmit)="sendInvite()" style="display: flex; flex-direction: column; gap: 20px;">
        
        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">Selecione o Evento</label>
          <select [(ngModel)]="selectedEventId" name="eventSelect" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
            <option [ngValue]="null" disabled selected>-- Escolha um evento --</option>
            <option *ngFor="let ev of events" [value]="ev.id">
              {{ ev.title }} ({{ ev.startAt | date:'dd/MM' }})
            </option>
          </select>
        </div>

        <div>
          <label style="display: block; margin-bottom: 5px; font-weight: 500;">E-mail do Participante</label>
          <input [(ngModel)]="inviteEmail" name="email" type="email" placeholder="exemplo@gmail.com" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 8px;">
        </div>

        <div style="display: flex; gap: 15px; margin-top: 10px;">
          <button type="submit" style="flex: 1; padding: 12px; background: #4CAF50; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">
            Enviar Convite
          </button>
          
          <button type="button" routerLink="/dashboard" style="padding: 12px 30px; background: #e0e0e0; color: #333; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">
            Voltar
          </button>
        </div>

      </form>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule] 
})
export class SendInviteComponent implements OnInit {
  events: ConectaEvent[] = [];
  selectedEventId: number | null = null;
  inviteEmail = '';
  loading = true;

  constructor(
    private srv: EventService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.auth.isOrganizer()) {
      alert('Acesso negado.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.srv.list().subscribe({
      next: (res: any) => {
        this.events = res.content || res;
        this.loading = false;
      },
      error: () => {
        alert('Erro ao carregar eventos.');
        this.loading = false;
      }
    });
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  sendInvite() {
    if (!this.selectedEventId) {
      alert('Por favor, selecione um evento.');
      return;
    }
    if (!this.isValidEmail(this.inviteEmail)) {
      alert('E-mail inválido! Verifique o formato (ex: @gmail.com).');
      return;
    }

    const eventName = this.events.find(e => e.id == this.selectedEventId)?.title;

    alert(`✅ Sucesso!\n\nConvite para o evento "${eventName}" enviado para: ${this.inviteEmail}`);
    this.inviteEmail = '';
  }
}