import { Routes } from "@angular/router";

export const authRoutes: Routes = [
    // {
    //   path: 'auth',
    //   component: AuthComponent,
    //   children: [
    //     {
    //       path: 'login', // Ruta hija para login
    //       loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    //     },
    //     {
    //       path: 'register', // Ruta hija para registro
    //       loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),
    //     },
    //   ],
    // },
    {
      path: 'login', // Ruta hija para login
      loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    },
    {
      path: 'register', // Ruta hija para registro
      loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent),     
    }
];