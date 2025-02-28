import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { take } from 'rxjs/internal/operators/take';
import { LocalStorageService } from '../../services/local-storage.service';
import { JWT_KEY_NAME_TOKEN } from '../../app.config';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notifications.service';
import { Dialog } from '@angular/cdk/dialog';
import { UsersDialogComponent } from '../admin-panel/users-management-table/components/users-dialog/users-dialog.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.container.html',
  styleUrl: './login.container.css'
})
export class LoginContainer {
  jwtKeyName = inject(JWT_KEY_NAME_TOKEN);
  userService = inject(UsersService);
  localStorageService = inject(LocalStorageService);
  private readonly router = inject(Router);
  private readonly notificationsService = inject(NotificationService);
  private readonly usersService = inject(UsersService);
  private readonly dialogService = inject(Dialog);

  loggingUser: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: []
  };

  login() {
    this.localStorageService.removeItem(this.jwtKeyName);
    this.userService.login(this.loggingUser)
      .pipe(take(1))
      .subscribe(loginResponseDto => {
        loginResponseDto.jwtToken.length > 0 && this.localStorageService.setItem(this.jwtKeyName, loginResponseDto.jwtToken);
        this.router.navigateByUrl('/home');
        this.notificationsService.emitNotification('Успешная аутентификация!');
      })
  }

  register(user: User) {
    this.usersService.register(user)
      .pipe(take(1))
      .subscribe(newUser => {
        this.notificationsService.emitNotification(`Пользователь с email "${newUser.email}" был успешно зарегистрирован. Введите данные своей учётной записи, чтобы пройти аутентификацию.`);
      });
  }

  openUserDialog(user?: User) {
    const dialog = this.dialogService.open(UsersDialogComponent, { data: structuredClone(user) });
    dialog.componentInstance?.registerEmitter.subscribe(user => this.register(user));
  }
}
