import { RenderMode, ServerRoute } from '@angular/ssr';
import { routesIDs } from './shared/mocks/routes-ids';

export const serverRoutes: ServerRoute[] = [
  {
   path: 'details/:id',
   renderMode: RenderMode.Prerender,
   async getPrerenderParams() {
      const ids = routesIDs;
      return ids.map(id => ({ id }));
  },
 },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
