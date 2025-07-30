import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { User } from '../../shared/models/user.model';
import { Observable } from 'rxjs';
import { Location } from '@angular/common'; 
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
    private location: Location
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }
  toggleOcultarSaldo() {
    this.ocultarSaldo = !this.ocultarSaldo;
  }
  verExtrato() {
    console.log('vendo extrato');
    this.router.navigate(['/extrato']);
  }

  transferir() {
    console.log('transferir');
    this.router.navigate(['/transfer']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  goBack(): void {
    this.location.back();
  }
}
