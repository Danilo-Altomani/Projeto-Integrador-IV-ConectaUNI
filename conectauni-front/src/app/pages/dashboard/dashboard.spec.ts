import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
@Component({ selector: 'app-dashboard', templateUrl: './dashboard.component.html' })
export class DashboardComponent implements OnInit {
  events: any[] = [];
  constructor(private srv: EventService) {}
  ngOnInit() { this.srv.list().subscribe((res: any) => this.events = res.content || res); }
}