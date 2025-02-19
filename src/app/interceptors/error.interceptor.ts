import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { EMPTY } from "rxjs/internal/observable/empty";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";


export const errorInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const router = inject(Router);

  return next(request).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        router.navigate(['/login']);
        return EMPTY;
      }

      return throwError(() => new Error("Ошибка при попытке аутентификации или авторизации"));
    })
  );
};
