import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/landing/landing.component').then(({LandingComponent}) => LandingComponent),
    pathMatch: 'full'
  },
  {
    path: '',
    loadComponent: () => import('./layout/main-doc-layout/main-doc-layout.component').then(({MainDocLayoutComponent}) => MainDocLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'installation',
        pathMatch: 'full'
      },
      {
        path: 'installation',
        loadChildren: () => import('./pages/installation/installation.routes').then(m => m.INSTALLATION_ROUTES)
      },
      {
        path: 'forms',
        loadChildren: () => import('./pages/forms/forms.routes').then(m => m.FORMS_ROUTES)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
