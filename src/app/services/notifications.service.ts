import { Injectable, EventEmitter, inject, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);
  private readonly zone = inject(NgZone);
  notificationEmitter: EventEmitter<any> = new EventEmitter<any>();

  emitNotification(message: any) {
    this.zone.run(() => {
      this.snackBar.open(message, "", { duration: 5000, horizontalPosition: 'right', panelClass: ['notification-warning'] });
    });
  }
}
