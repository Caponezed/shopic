import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notificationEmitter: EventEmitter<string> = new EventEmitter<string>();

  emitNotification(message: string) {
    this.notificationEmitter.emit(message);
  }
}
