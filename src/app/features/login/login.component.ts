import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  templateUrl: './login.component.html',
  selector: 'app-login',
  standalone: false,
  styleUrls: ['./login.component.scss', '../create-user/create-user.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  login() {
    this.authService.login(this.email, this.password).subscribe(user => {
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        this.snackBar.open('Login inválido. Verifique suas credenciais.', 'Fechar', {
          duration: 3000,
        });
      }
    });
  }
}