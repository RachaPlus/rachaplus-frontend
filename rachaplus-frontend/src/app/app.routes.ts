import { Routes } from '@angular/router';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) 
  },
  // Rota de exemplo para quando inicializar o Racha+
  { 
    path: 'dashboard', 
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
  }
];