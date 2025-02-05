import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/pins', pathMatch: 'full' },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: 'pins',
    loadChildren: () => import('./pins/pins.module').then((m) => m.PinsModule),
  },
  { path: '**', redirectTo: '/pins' }, // Redirect unknown routes
];
