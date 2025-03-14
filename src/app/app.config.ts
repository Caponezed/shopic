import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from './interceptors/error.interceptor';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const FILES_API_ENDPOINT = new InjectionToken<string>('FILES_API_ENDPOINT');

const JWT_KEY_NAME = 'SHOPIC_JWT_KEY';
const LOGGED_IN_USER_KEY_NAME = 'LOGGED_IN_USER';
const CART_PRODUCTS_KEY_NAME = 'CART_PRODUCTS';
export const JWT_KEY_NAME_TOKEN = new InjectionToken<string>(JWT_KEY_NAME);
export const LOGGED_IN_USER_TOKEN = new InjectionToken<string>(LOGGED_IN_USER_KEY_NAME);
export const CART_PRODUCTS_TOKEN = new InjectionToken<string>(CART_PRODUCTS_KEY_NAME);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: FILES_API_ENDPOINT, useValue: 'http://localhost:8080/api/files/' },
    { provide: JWT_KEY_NAME_TOKEN, useValue: JWT_KEY_NAME },
    { provide: LOGGED_IN_USER_TOKEN, useValue: LOGGED_IN_USER_KEY_NAME },
    { provide: CART_PRODUCTS_TOKEN, useValue: CART_PRODUCTS_KEY_NAME },
    provideAnimationsAsync(),
  ]
};
