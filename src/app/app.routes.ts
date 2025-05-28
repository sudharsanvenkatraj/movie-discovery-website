import { Routes } from '@angular/router';
import { LandingComponent } from './component/landing/landing.component';
import { DetailComponent } from './component/detail/detail.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent
    },
      {
        path: 'details/:id',
        component: DetailComponent
    },
      {
        path: '**',
        component: LandingComponent
    },
];
