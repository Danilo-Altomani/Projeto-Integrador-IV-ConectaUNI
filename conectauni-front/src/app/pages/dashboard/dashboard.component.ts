import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  standalone: false
})
export class DashboardComponent implements OnInit {
  events: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.list().subscribe({
      next: (res: any) => this.events = res.content || res,
      error: (err) => console.error('Erro ao carregar eventos', err)
    });
  }
}