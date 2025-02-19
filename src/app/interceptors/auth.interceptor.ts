import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { JWT_KEY_NAME } from "../app.config";

export const authInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const jwtKeyName = inject(JWT_KEY_NAME);
  const authToken = localStorage.getItem(jwtKeyName);

  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  console.log(request);

  return next(request);
};
