import { DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, EventEmitter, Inject } from '@angular/core';
import { User } from '../../../../../models/user.model';
import { UtilsService } from '../../../../../services/utils.service';
import { FormsModule } from '@angular/forms';
import { Role } from '../../../../../models/role.model';

@Component({
  selector: 'app-users-dialog',
  imports: [FormsModule],
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.css'
})
export class UsersDialogComponent {
  constructor(@Inject(DIALOG_DATA) public user: User, public readonly utilsService: UtilsService) {
    if (!user) this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      roles: []
    };
  }

  registerEmitter = new EventEmitter<User>();
  updateUserEmitter = new EventEmitter<User>();

  get userIsValid(): boolean {
    return this.user.email.length > 3 &&
      this.user.email.includes('@') &&
      this.user.firstName.length > 3 &&
      this.user.lastName.length > 3 &&
      this.user.roles.length > 0 &&
      this.user.password.length > 5;
  }

  addRoleToUser(input: HTMLInputElement, user: User) {
    if (input.value.length === 0) return;
    const userRole: Role = {
      name: input.value,
    }
    const hasRole = Boolean(user.roles.find(user => user.name === userRole.name));
    !hasRole && user.roles.push(userRole);
    input.value = '';
  }

  deleteUserRole(user: User, role: Role) {
    user.roles = user.roles.filter(userRole => userRole.name !== role.name);
  }

  register() {
    this.registerEmitter.emit(this.user);
  }

  updateUser() {
    this.updateUserEmitter.emit(this.user);
  }
}
