import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  currentUser$: Observable<User | null>;
  ocultarSaldo: boolean = false;
  agencia: string = '0001';
  conta: string = '56789-0';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }
  toggleOcultarSaldo() {
    this.ocultarSaldo = !this.ocultarSaldo;
  }
  verExtrato() {
    this.router.navigate(['/extrato']);
  }
  transferir() {
    this.router.navigate(['/transfer']);
  }
}
