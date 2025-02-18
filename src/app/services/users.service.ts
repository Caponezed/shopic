import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.config';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(@Inject(BASE_URL) private baseUrl: string, private readonly httpClient: HttpClient) { }

  getAllUsers() {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/users`);
  }

  addNewUser(user: User) {
    return this.httpClient.post<User>(`${this.baseUrl}/api/users`, user);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(`${this.baseUrl}/api/users`, user);
  }

  deleteUserById(userId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/users/${userId}`);
  }
}
