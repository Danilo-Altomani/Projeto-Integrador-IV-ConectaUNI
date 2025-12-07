import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../../pages/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  standalone: false
})
export class MainLayoutComponent implements OnInit { 
  
  isOrganizer = false; 

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
 
    this.isOrganizer = this.auth.isOrganizer();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}