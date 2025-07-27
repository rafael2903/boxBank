import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private readonly API_URL = `${environment.apiUrl}/transactions`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.API_URL);
  }

  getById(id: number): Observable<Transaction> {
    return this.http.get<Transaction>(`${this.API_URL}/${id}`);
  }

  add(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.API_URL, transaction);
  }

  update(transaction: Transaction): Observable<Transaction> {
    return this.http.put<Transaction>(
      `${this.API_URL}/${transaction.id}`,
      transaction
    );
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
