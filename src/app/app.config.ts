import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';

 export const appConfig: ApplicationConfig = {
   providers: [provideRouter(routes), 
 provideClientHydration(),provideHttpClient((
   withInterceptors([authInterceptor])
 ))]
 };
