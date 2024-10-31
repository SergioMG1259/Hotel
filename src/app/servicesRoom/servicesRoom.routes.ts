import { Routes } from "@angular/router";
import { ServicesRoomListComponent } from "./pages/services-room-list/services-room-list.component";

export const servicesroomRoutes: Routes = [
    {
      path: '',
      component: ServicesRoomListComponent,
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