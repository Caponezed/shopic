import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../models/user.model';
import { JoinPipe } from '../../../pipes/join.pipe';

@Component({
  selector: 'app-users-management-table',
  imports: [JoinPipe],
  templateUrl: './users-management-table.component.html',
  styleUrl: './users-management-table.component.css'
})
export class UsersManagementTableComponent {
  @Input({ required: true }) users: User[] = [];

  @Output() openAddNewUserDialogEmitter = new EventEmitter<void>();
  @Output() openUpdateUserDialogEmitter = new EventEmitter<User>();
  @Output() deleteUserByIdEmitter = new EventEmitter<User>();

  openAddNewUserDialog() {
    this.openAddNewUserDialogEmitter.emit();
  }
  openUpdateUserDialog(user: User) {
    this.openUpdateUserDialogEmitter.emit(user);
  }
  deleteUserById(user: User) {
    this.deleteUserByIdEmitter.emit(user);
  }
}
