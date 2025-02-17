import { ApplicationConfig, InjectionToken, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const BASE_URL = new InjectionToken<string>('BASE_URL');
export const FILES_API_ENDPOINT = new InjectionToken<string>('FILES_API_ENDPOINT');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    { provide: BASE_URL, useValue: 'http://localhost:8080' },
    { provide: FILES_API_ENDPOINT, useValue: 'http://localhost:8080/api/files/' },
  ]
};
