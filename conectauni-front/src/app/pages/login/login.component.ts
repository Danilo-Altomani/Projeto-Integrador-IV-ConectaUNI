import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-login', templateUrl: './login.component.html' })
export class LoginComponent {
  email = ''; password = ''; fullName = ''; role = 'PARTICIPANTE';
  isRegistering = false;

  constructor(private auth: AuthService, private router: Router) {}

  submit() {
    if (this.isRegistering) {
      this.auth.register({ email: this.email, password: this.password, fullName: this.fullName, role: this.role }).subscribe({
        next: () => { alert('Conta criada! Faça login.'); this.isRegistering = false; },
        error: (err) => alert('Erro ao criar conta: ' + (err.error?.message || 'Tente novamente.'))
      });
    } else {
      this.auth.login({ email: this.email, password: this.password }).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: () => alert('Login inválido! Verifique o e-mail e senha.')
      });
    }
  }
}