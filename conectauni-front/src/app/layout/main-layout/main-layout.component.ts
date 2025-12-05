import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthService } from '../../pages/services/auth.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.html',
  styleUrls: ['./main-layout.css'],
  standalone: false
})
export class MainLayoutComponent {
  
  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}