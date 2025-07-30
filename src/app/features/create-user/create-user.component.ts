import { Component } from '@angular/core';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent {
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
  }
}
