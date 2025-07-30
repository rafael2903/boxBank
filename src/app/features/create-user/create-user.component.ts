import { Component } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { AuthService } from '../../core/auth/auth.service';
import { Router } from '@angular/router';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private router: Router,
  ) {}

  nome: string = '';
  email: string = '';
  cpf: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  cadastrarUsuario() {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mensagemErro = 'Todos os campos são obrigatórios.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'A senha e a confirmação de senha não coincidem.';
      return;
    }

    const novoUsuario: User = {
      cpf: this.cpf,
      email: this.email,
      name: this.nome,
      password: this.senha,
      amount: 1000,
      id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    };

    this.usersService.create(novoUsuario).subscribe({
      next: () => {
        this.authService.login(this.email, this.senha).subscribe((user) => {
          if (user) {
            this.mensagemSucesso = 'Usuário cadastrado e logado com sucesso!';
            this.router.navigate(['/dashboard']);
          } else {
            this.mensagemErro = 'Erro ao realizar login automático.';
          }
        });
      },
      error: (error) => {
        this.mensagemErro = 'Erro ao cadastrar usuário: ' + error.message;
      }
    });
  }
}
