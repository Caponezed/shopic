import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationService } from './services/notifications.service';
import { JWT_KEY_NAME_TOKEN, LOGGED_IN_USER_TOKEN } from './app.config';
import { LocalStorageService } from './services/local-storage.service';
import { UsersService } from './services/users.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header appTitle="Shopic" [jwtToken]="jwtToken" />
    <div class="container my-5">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private readonly localStorageService = inject(LocalStorageService);
  private readonly jwtKeyName = inject(JWT_KEY_NAME_TOKEN);
  private readonly loggedInUserKeyName = inject(LOGGED_IN_USER_TOKEN);
  private readonly notificationsService = inject(NotificationService);
  private readonly usersService = inject(UsersService);

  title = 'shopic.frontend';
  jwtToken = this.localStorageService.getItem<string | null>(this.jwtKeyName);

  ngOnInit(): void {
    const loggedInUser: User | null = this.localStorageService.getItem(this.loggedInUserKeyName);
    this.usersService.loggedInUser$.next(loggedInUser);
    this.notificationsService.notificationEmitter.subscribe(() => {
      this.jwtToken = this.localStorageService.getItem<string | null>(this.jwtKeyName);
    });
  }

}
