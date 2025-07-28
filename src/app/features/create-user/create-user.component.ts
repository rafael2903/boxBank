import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-user',
  standalone: false,
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.scss',
})
export class CreateUserComponent implements OnInit {
  nome: string = '';
  email: string = '';
  cpf: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor() {}

  ngOnInit(): void {}

  cadastrarUsuario(): void {
    // Limpa mensagens anteriores
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    // Validação básica dos campos
    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      this.mensagemErro = 'Todos os campos são obrigatórios.';
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mensagemErro = 'A senha e a confirmação de senha não coincidem.';
      return;
    }

    console.log('Dados do usuário para cadastro:', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
    });
  }
}
