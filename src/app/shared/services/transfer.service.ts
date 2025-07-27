import { Injectable } from '@angular/core';
import { TransactionsService } from './transactions.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class TransferService {
  constructor(
    private transactionsService: TransactionsService,
    private usersService: UsersService
  ) {}

  transfer(senderId: string, receiverId: string, amount: number): void {

  }

  private checkBalance(senderId: string, amount: number): boolean {
    // Logic to check if the user has enough balance
    return true; // Placeholder return value
  }
}
