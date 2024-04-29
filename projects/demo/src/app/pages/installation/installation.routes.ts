import {Route} from '@angular/router';

export const INSTALLATION_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./installation.component').then(m => m.InstallationComponent)
  }
] as Route[];
