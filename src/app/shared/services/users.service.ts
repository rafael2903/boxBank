// src/app/services/user.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { CreateUserDto } from '../types/create-user.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private readonly API_URL = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.API_URL);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/${id}`);
  }

  create(userDto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.API_URL, userDto);
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/${user.id}`, user);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
