import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    loadComponent: () => import('./components/form-selector/form-selector').then(m => m.FormSelector) 
  },
  { 
    path: 'reactive-signals', 
    loadComponent: () => import('./components/reactive-form-signals/reactive-form-signals').then(m => m.ReactiveFormSignals) 
  },
  { 
    path: 'reactive-classic', 
    loadComponent: () => import('./components/reactive-form-classic/reactive-form-classic').then(m => m.ReactiveFormClassic) 
  },
  { 
    path: 'template-driven', 
    loadComponent: () => import('./components/template-driven-form/template-driven-form').then(m => m.TemplateDrivenForm) 
  },
  { 
    path: 'template-driven-signals', 
    loadComponent: () => import('./components/template-driven-form-signals/template-driven-form-signals').then(m => m.TemplateDrivenFormSignals) 
  }
];
