import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  submit() {
    if (this.isRegistering) {
      if (!this.fullName.trim() || !this.email.trim() || !this.password.trim()) {
        alert('Erro: Todos os campos (Nome, E-mail e Senha) são obrigatórios!');
        return;
      }
    } else {
      if (!this.email.trim() || !this.password.trim()) {
        alert('Por favor, preencha E-mail e Senha.');
        return;
      }
    }

    if (!this.isValidEmail(this.email)) {
      alert('E-mail inválido! Certifique-se de incluir o provedor e a extensão (ex: @gmail.com, @outlook.com).');
      return;
    }

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
        error: () => alert('Login inválido! Verifique suas credenciais.')
      });
    }
  }
}