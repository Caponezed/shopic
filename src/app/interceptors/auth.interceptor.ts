import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { JWT_KEY_NAME_TOKEN } from "../app.config";

export const authInterceptor = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const jwtKeyName = inject(JWT_KEY_NAME_TOKEN);
  const authToken = localStorage.getItem(jwtKeyName);

  if (authToken) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`
      }
    });
  }

  return next(request);
};
