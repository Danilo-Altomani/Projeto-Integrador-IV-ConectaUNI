import { Component } from '@angular/core';
import { Router } from '@angular/router';
// Import corrigido: apenas um '../' pois ambos estão dentro de 'pages'
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'],  
  standalone: false
})
export class LoginComponent {
  email = '';
  password = '';
  fullName = '';
  role = 'PARTICIPANTE';
  isRegistering = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.isRegistering) {
      this.auth.register({
        email: this.email,
        password: this.password,
        fullName: this.fullName,
        role: this.role
      }).subscribe({
        next: () => {
          alert('Conta criada com sucesso! Faça login.');
          this.isRegistering = false;
        },
        error: (err) => alert('Erro: ' + (err.error?.message || 'Falha no cadastro.'))
      });
    } else {
      this.auth.login({ email: this.email, password: this.password }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => alert('Login inválido!')
      });
    }
  }
}