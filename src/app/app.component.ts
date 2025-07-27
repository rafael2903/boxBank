import { Component } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { TransactionService } from './shared/services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private userService: UserService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(users => {
      console.log('Usuários:', users);
    });

    this.transactionService.getAll().subscribe(transactions => {
      console.log('Transações:', transactions);
    });
  }
}
