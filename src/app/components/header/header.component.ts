import { Component, inject, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { NotificationService } from '../../services/notifications.service';
import { LOGGED_IN_USER_TOKEN } from '../../app.config';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user.model';
import { JoinPipe } from '../../pipes/join.pipe';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, JoinPipe],
  template: `
    <div class="header">
      <div class="d-flex align-items-center gap-1">
        <img class="logo" src="logo.svg">
        <h4 class="m-0 fw-bold">{{ appTitle }}</h4>
      </div>

      <nav>
        <ul class="list-group list-group-horizontal">
          <li class="list-group-item">
            <a routerLink="/home" routerLinkActive="link-success">Главная</a>
          </li>
          <li class="list-group-item">
            <a routerLink="/catalog" routerLinkActive="link-success">Каталог</a>
          </li>

          @if (loggedInUser && (loggedInUser.roles | join).includes('Администратор')) {
          <li class="list-group-item">
          <a routerLink="/admin" routerLinkActive="link-success">Админка</a>
          </li>
          }

          <li class="list-group-item">
            <a routerLink="/cart" routerLinkActive="link-success">Корзина</a>
          </li>
        </ul>
      </nav>

      <button class="btn btn-outline-light" (click)="jwtToken ? logout() : goToLoginPage()">
        {{ jwtToken ? 'Выйти' : 'Войти' }}
      </button>
    </div>
  `,
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public readonly usersService = inject(UsersService);
  private readonly router = inject(Router);
  private readonly notificationsService = inject(NotificationService);
  private readonly loggedInUserKeyName = inject(LOGGED_IN_USER_TOKEN);
  private readonly localStorageService = inject(LocalStorageService);

  @Input({ required: true }) appTitle: string = 'Shopic';
  @Input({ required: true }) jwtToken: string | null = null;
  public loggedInUser: User | null = null;

  ngOnInit(): void {
    this.loggedInUser = this.localStorageService.getItem(this.loggedInUserKeyName);
  }

  logout() {
    this.usersService.logout();
    this.goToLoginPage();
    this.notificationsService.emitNotification('Вы вышли из учётной записи');
  }

  goToLoginPage() {
    this.router.navigateByUrl('/login');
  }
}
