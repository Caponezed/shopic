import { Component, inject } from '@angular/core';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { take } from 'rxjs/internal/operators/take';
import { LocalStorageService } from '../../services/local-storage.service';
import { JWT_KEY_NAME_TOKEN } from '../../app.config';

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

  user: User = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: []
  };

  login() {
    this.localStorageService.removeItem(this.jwtKeyName);
    this.userService.login(this.user)
      .pipe(take(1))
      .subscribe(jwtToken => {
        jwtToken.length > 0 && this.localStorageService.setItem(this.jwtKeyName, jwtToken);
        alert(`Успешная аутентификация!`);
      })
  }
}
