import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL, JWT_KEY_NAME_TOKEN, LOGGED_IN_USER_TOKEN } from '../app.config';
import { User } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { LoginResponseDto } from '../models/login-response-dto.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly httpClient = inject(HttpClient);
  private readonly baseUrl = inject(BASE_URL);
  private readonly jwtKeyName = inject(JWT_KEY_NAME_TOKEN);
  private readonly loggedInUserKeyName = inject(LOGGED_IN_USER_TOKEN);
  private readonly localStorageService = inject(LocalStorageService);

  public readonly loggedInUser$ = new BehaviorSubject<User | null>(null);

  getAllUsers() {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/users`);
  }

  register(user: User) {
    return this.httpClient.post<User>(`${this.baseUrl}/api/users/register`, user);
  }

  login(user: User) {
    return this.httpClient.post<LoginResponseDto>(`${this.baseUrl}/api/users/login`, user);
  }

  logout() {
    this.localStorageService.getItem(this.jwtKeyName) && this.localStorageService.removeItem(this.jwtKeyName);
    this.localStorageService.getItem(this.loggedInUserKeyName) && this.localStorageService.removeItem(this.loggedInUserKeyName);
  }

  updateUser(user: User) {
    return this.httpClient.put<User>(`${this.baseUrl}/api/users`, user);
  }

  deleteUserById(userId: number) {
    return this.httpClient.delete<void>(`${this.baseUrl}/api/users/${userId}`);
  }
}
