import { EMPTY } from "rxjs/internal/observable/empty";
import { catchError } from "rxjs/internal/operators/catchError";
import { MatSnackBar } from '@angular/material/snack-bar';
import { throwError } from "rxjs/internal/observable/throwError";
import { inject, NgZone } from "@angular/core";
import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Router } from "@angular/router";

export function errorInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
  const snackBar = inject(MatSnackBar);
  const router = inject(Router);
  const zone = inject(NgZone);

  return next(request).pipe(catchError(err => {
    if ([401, 403].includes(err.status)) {
      zone.run(() => {
        snackBar.open("Произошла ошибка при авторизации", "", { duration: 5000, horizontalPosition: 'right', panelClass: ['notification-warning'] });
      });
      router.navigate(['/login']);
      return EMPTY;
    };

    let errorMessage = 'Произошла непредвиденная ошибка при запросе ' + err.url;
    if (Array.isArray(err.error?.errors)) errorMessage = err.error.errors.join(', ');

    zone.run(() => {
      snackBar.open(errorMessage, "", { duration: 5000, horizontalPosition: 'right', panelClass: ['notification-warning'] });
    });

    return throwError(() => err);
  }));
}
