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
export const JWT_KEY_NAME_TOKEN = new InjectionToken<string>(JWT_KEY_NAME);

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, errorInterceptor])),
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: FILES_API_ENDPOINT, useValue: 'http://localhost:8080/api/files/' },
    { provide: JWT_KEY_NAME_TOKEN, useValue: JWT_KEY_NAME }, provideAnimationsAsync(),
  ]
};
