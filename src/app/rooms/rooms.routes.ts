import { Routes } from "@angular/router";
import { RoomsListComponent } from "./pages/rooms-list/rooms-list.component";

export const roomsRoutes: Routes = [
    {
      path: '',
      component: RoomsListComponent,
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
    },
];