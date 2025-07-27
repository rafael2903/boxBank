import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction.model';
import { CreateTransactionDto } from '../types/create-transaction.dto';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly API_URL = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  getById(id: string): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_URL}/${id}`);
  }

  create(transactionDto: CreateTransactionDto): Observable<Transaction> {
    return this.http.post<Transaction>(this.API_URL, transactionDto);
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.API_URL}/${transaction.id}`,
      transaction
    );
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
