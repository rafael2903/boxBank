import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service'; 
import { Location } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() headerTitle: string | null = '';

  constructor(
    private location: Location,
    private authService: AuthService,
    private router: Router
  ) {}

   onGoBack(): void {
    this.location.back();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

