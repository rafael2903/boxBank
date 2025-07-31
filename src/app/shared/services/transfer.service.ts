import { Injectable } from '@angular/core';
import { concat, forkJoin, map, Observable, switchMap } from 'rxjs';
import { User } from '../models/user.model';
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

  transfer(
    senderId: string,
    receiverId: string,
    amount: number
  ): Observable<void> {
    return forkJoin([
      this.getUserByCpf(senderId),
      this.getUserByCpf(receiverId),
    ]).pipe(
      map(([sender, receiver]) => {
        this.validateTransfer(sender, receiver, amount);
        return { sender, receiver };
      }),
    switchMap(({ sender, receiver }) =>
        this.createTransaction(sender, receiver, amount).pipe(
          map(() => {
            sender.amount -= amount;
            receiver.amount += amount;
            return { sender, receiver };
          })
        )
      ),
    switchMap(({ sender, receiver }) =>
        concat(
          this.usersService.update(sender),
          this.usersService.update(receiver)
        ).pipe(
          map(() => undefined)
        )
      )
    );
  }

  private getUserByCpf(cpf: string): Observable<User> {
    return this.usersService.getByAttribute('cpf', cpf).pipe(
      map((users) => {
        if (users.length === 0) {
          throw new Error(`Usuário com CPF ${cpf} não encontrado.`);
        }
        return users[0];
      })
    );
  }
  private createTransaction(sender: User, receiver: User, amount: number) {
    return this.transactionsService.create({
      senderId: sender.id,
      receiverId: receiver.id,
      value: amount,
      date: new Date(),
    });
  }

  private hasNotEnoughBalance(sender: User, amount: number): boolean {
    return sender.amount < amount;
  }

  private validateTransfer(sender: User, receiver: User, amount: number): void {
    if (this.hasNotEnoughBalance(sender, amount)) {
      throw new Error('Saldo insuficiente para realizar a transferência.');
    }

    if (sender.cpf === receiver.cpf) {
      throw new Error('Não é possível transferir para si mesmo.');
    }
  }
}
