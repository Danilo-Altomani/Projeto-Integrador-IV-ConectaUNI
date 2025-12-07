import { Component } from '@angular/core';
import { ConectaEvent } from '../../models/interfaces';

@Component({
  selector: 'app-my-invites',
  template: `
    <div style="padding: 20px;">
      <h2 style="color: #333; margin-bottom: 20px;">Meus Convites / Ingressos</h2>
      
      <div style="display: grid; gap: 20px;">
        <div *ngFor="let ev of myInvites" style="background: white; padding: 20px; border-radius: 12px; border-left: 5px solid #4CAF50; box-shadow: 0 2px 10px rgba(0,0,0,0.05);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="margin: 0; color: #1E88E5;">{{ ev.title }}</h3>
              <p style="color: #666; margin: 5px 0;">📍 {{ ev.location }}</p>
              <p style="font-size: 0.9rem; color: #888;">📅 {{ ev.startAt | date:'dd/MM/yyyy HH:mm' }}</p>
            </div>
            
            <button (click)="showQr(ev)" style="padding: 10px 20px; background: #E8F5E9; color: #2E7D32; border: 1px solid #4CAF50; border-radius: 6px; cursor: pointer; font-weight: bold;">
              🎟️ Ver Ingresso
            </button>
          </div>
        </div>

        <div *ngIf="myInvites.length === 0" style="text-align: center; color: #999; margin-top: 40px;">
          <p>Você ainda não está participando de nenhum evento.</p>
        </div>
      </div>
    </div>
  `,
  styles: [],
  standalone: false
})
export class MyInvitesComponent {
  // Dados fictícios para demonstração ("mesmo sem funcionar" com back-end real)
  myInvites: Partial<ConectaEvent>[] = [
    {
      title: 'Workshop de Angular 19',
      location: 'Lab de Informática 3',
      startAt: new Date().toISOString(),
      description: 'Aprenda as novidades do framework.'
    },
    {
      title: 'Semana da Tecnologia',
      location: 'Auditório Principal',
      startAt: '2025-11-20T19:00:00',
      description: 'Palestras sobre IA e Futuro Dev.'
    }
  ];

  showQr(ev: any) {
    const data = `INGRESSO: ${ev.title} - PARTICIPANTE: Eu`;
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(data)}`;
    
    // Abre numa nova aba para simplificar a demo
    window.open(url, '_blank', 'width=300,height=300');
  }
}