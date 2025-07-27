import { Component } from '@angular/core';
import { TransactionsService } from './shared/services/transactions.service';
import { UsersService } from './shared/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor(
    private usersService: UsersService,
    private transactionsService: TransactionsService
  ) {}

  ngOnInit(): void {
    this.usersService.getAll().subscribe((users) => {
      console.log('Usuários:', users);
    });

    this.transactionsService.getAll().subscribe((transactions) => {
      console.log('Transações:', transactions);
    });
  }
}
